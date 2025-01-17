import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js'
import cors from 'cors';

import { server, app } from './lib/socket.js';

import path from 'path';

dotenv.config();
// const app = express();
const PORT = process.env.PORT || 7000;
const __dirname = path.resolve();

app.use(express.json());//extract the json data outof body
app.use(cookieParser());//parse the cookie data
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
};


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});
