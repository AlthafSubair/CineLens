import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from './utils/connectDB.js';
import authRoutes from './routes/authRouter.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Get the local IP address (manually replace it)
const LOCAL_IP = "192.168.1.4"; // Change to your actual local IP

app.use(cors({
    origin: [`http://localhost:5173`], // Allow local and network access
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

// Connect to the database first, then start the server
connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`✅ Server is running at http://${LOCAL_IP}:${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to DB", err);
});
