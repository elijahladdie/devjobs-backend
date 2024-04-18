import jwt from "jsonwebtoken";

interface userData {
    email: string;
    username: string;
}

export const signToken = (userData: userData): string => {
    const { email, username } = userData;
    const token = jwt.sign(
        {
            email,
            username,
        },
        "secret",
        { expiresIn: process.env.EXPIRE_IN as string }
    );
    return token;
};

export const verify = (token: string): userData | null => {
    try {
        const decoded = jwt.verify(token, "secret") as userData;
        return decoded;
    } catch (err) {
        console.error("Error verifying token:", err);
        return null;
    }
};