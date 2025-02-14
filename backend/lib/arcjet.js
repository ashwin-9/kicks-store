import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";
import dotenv from 'dotenv';

dotenv.config();

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // To protect api from common attacks like SQL injection, XSS, CSRF, etc.
        shield({mode: "LIVE"}),
        detectBot({
            // Block all bots except search engines
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        // Rate limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 30,
            interval: 5,
            capacity: 20
        })
    ]
});
