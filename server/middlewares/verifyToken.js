import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Get the token from the headers, query, or cookies
  const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token data (e.g., user info) to the request
    next(); // Pass the control to the next middleware
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Handle expired token
      return res.status(401).json({ success: false, message: "Token has expired. Please log in again." });
    }

    // Handle other errors (e.g., invalid token)
    res.status(403).json({ success: false, message: "Invalid token." });
  }
};



export default verifyToken;

