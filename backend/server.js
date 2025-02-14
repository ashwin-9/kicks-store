import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";

import productRoutes from './routes/productRoutes.js';
import { sql } from './config/db.js';
import { aj } from './lib/arcjet.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// middleware
app.use(express.json()); // middleware to parse the incoming request with JSON payloads
app.use(cors()); // middleware to enable CORS with various options
app.use(
    helmet({
      contentSecurityPolicy: false,
    })
); // security middleware to help protext the app by setting various headers
app.use(morgan('dev')); // middleware to log all the requests made to the server

// Apply arcjet rate-limit middleware
app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1 // Each request consumes 1 token
        })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({error: 'Too many requests. Please try again later.'});
            } else if(decision.reason.isBot()) {
                res.status(403).json({error: 'Bot access denied.'});
            } else {
                res.status(403).json({error: 'Forbidden'});
            }
            return;
        }

        // Check for spoofed bots
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({error: 'Spoofed bot detected.'});
            return;
        }

        next();
    } catch (error) {
        console.log(`Arcjet error: ${error}`);
        next(error)
    }
})

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

const initDB = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
})
