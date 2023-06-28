import { jwtVerify } from "jose";

interface UserJwtPayload {
    jti: string
    iat: number
};

export function getJwtSecretKey(): string {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY

    if(!secret || secret.length === 0) {
        throw new Error("JWT secret key is not valid")
    }

    return secret;
};

export const verifyAuth = async(token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload as UserJwtPayload
    } catch (error) {
        throw new Error("Invalid or Expired Token")
    }
}