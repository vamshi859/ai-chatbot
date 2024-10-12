import { Configuration } from "openai"

export const configureOpenApi = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPEN_AI_ORGANIZATION
    });
    return config;
} 