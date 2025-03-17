
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendOTP } from "../utils/sendOtp.js";


// Define an asynchronous function to handle Google Login

//This function is an asynchronous function that registers a user
const registerUser = async (req, res) => {
    try {
        // Destructure the email and password from the request body
        const {username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        // Check if the email is valid
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format', success: false });
        }

        // Check if the password meets the minimum length (6 characters in this example)
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long', success: false });
        }


        // Check if the email already exists in the database
        const user = await User.findOne({ email });

        if (user) {
            // If a user is found, return a 409 status code with a message
            return res.status(409).json({ message: "Email already in use", success:false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a random 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit otp between 1000 and 9999
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // otp expires in 5 minutes

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            otp: otp,
            otpExpires: otpExpires,
        });

        // Send the OTP email
        await sendOTP(email, otp);

        // Return a success response
        return res.status(201).json({ 
            message: "User registered successfully. Please verify your email with the OTP sent.", 
            success: true
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

const verifyOtp = async (req, res) => {
    try {
        // Destructure the email and otp from the request body
        const { email, otp } = req.body;

        // Check if the email and otp are present
        if (!email || !otp) {
            // If not, return a 400 status code with an error message
            return res.status(400).json({ message: "Email and OTP are required", success: false });
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format', success: false });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            // If not, return a 404 status code with an error message
            return res.status(404).json({ message: "User not found", success: false });
        }

        if(user.otpExpires < Date.now()){
            return res.status(400).json({ message: "OTP has been expired", success: false });
        }

        // Check if the otp is valid
        if (user.otp !== otp ) {
            // If not, return a 400 status code with an error message
            return res.status(400).json({ message: "OTp is not correct", success: false });
        }
        // If the otp is valid, update the user's verified field to true
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        // Save the user
        await user.save();

        // Return a success response
        return res.status(200).json({ message: "OTP verified successfully", success: true });

    }catch(err){
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

const resendOtp = async(req,res) => {
    try {
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format', success: false });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            // If not, return a 404 status code with an error message
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Generate a new random 4-digit OTP
        const token = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit token between 1000 and 9999
        const tokenExpires = new Date(Date.now() + 5 * 60 * 1000); // Token expires in 5 minutes

        // Update the user's otp and otpExpires fields
        user.otp = token;
        user.otpExpires = tokenExpires;

        // Save the user
        await user.save();

      await sendOTP(user.email, token);

      return res.status(200).json({ message: "OTP sent successfully", success: true });


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

const logIn = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required", success: false });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            // If not, return a 404 status code with an error message
            return res.status(404).json({ message: "User not found", success: false });
        }

        if(user.isSuspended) {
            return res.status(401).json({ message: "User is suspended", success: false });
        }

        if (user.authType === 'google') {
            return res.status(400).json({
                message: "This email is registered through Google. Please use Google login.", success: false
            });
        }


        // check if the user is verified
        if (!user.isVerified) {
            // If not, return a 401 status code with an error message
            return res.status(401).json({ message: "User is not verified", success: false });
        }

         // Check if the password is correct
         
         const isPasswordValid = bcrypt.compare(password, user.password);


         if (!isPasswordValid) {
            // If not, return a 401 status code with an error message
            return res.status(401).json({ message: "Password is not correct", success: false });
         }

         // If the password is correct, return a success response

         
         const { _id } = user;
         const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
             expiresIn: process.env.JWT_TIMEOUT,
         });
     
         return res.status(200).json({
             message: "Login Successful",
             token,
             user,
             user_id: _id,
             success: true
         });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const otp = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit token between 1000 and 9999

        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // Token expires in 5 minutes

        await user.save();
    //    await sendOTP(email,otp)
        
        return res.status(200).json({ message: "OTP sent successfully", success: true });

    }catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, password, confirmpassword, otp } = req.body;
      

        if (!email || !password || !otp || !confirmpassword) {
            return res.status(400).json({ message: "Email, password and otp are required", success: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.otp !== otp) {
        return res.status(400).json({ message: "OTP is not correct", success: false });
    }
    if(Date.now() > user.otpExpires){
        return res.status(400).json({ message: "OTP has been expired", success: false });
    }

    if(password !== confirmpassword){
        return res.status(400).json({ message: "Passwords do not match", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully", success: true });


}catch{
    return res.status(500).json({ message: "Internal server error", success: false });
}
}




export { registerUser, verifyOtp, resendOtp, logIn, forgotPassword, resetPassword}