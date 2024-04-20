import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

// Define the shape of the user object
interface User {
    email: string;
    username: string;
}

// Augment the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const generateNewToken = (user: User): string => {
    return jwt.sign(user, process.env.APP_SECRET as string, { expiresIn: process.env.EXPIRE_IN as string });
};




const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token =
            req.headers &&
            req.headers.authorization &&
            req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        try {
            const decoded: any = jwt.verify(token,  process.env.APP_SECRET as string);

            const user: User = {
                email: decoded.email,
                username: decoded.username,
            };

            req.user = user;

            // Check if the token is about to expire (e.g., within 5 minutes)
            const currentTime = Math.floor(Date.now() / 1000);
            const tokenExpiration = decoded.exp;
            const timeUntilExpiration = tokenExpiration - currentTime;

            if (timeUntilExpiration < 300) {
                // Renew the token
                const newToken = generateNewToken(user);
                res.setHeader("Authorization", `Bearer ${newToken}`);
            }

            return next();
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token has expired" });
            } else {
                return res.status(401).json({ error: "You are not authorized" });
            }
        }
    } catch (error) {
        return res.status(401).json({ error: "You are not authorized" });
    }
};

export default isAuthenticated;
