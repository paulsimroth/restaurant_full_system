export function getJwtSecretKey(): string {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY

    if(!secret || secret.length === 0) {
        throw new Error("JWT secret key is not valid")
    }

    return secret;
};