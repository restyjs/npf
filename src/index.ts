import fastify from "fastify";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const ENVIRONMENT = process.env.ENVIRONMENT;

console.log(`Environment: ${ENVIRONMENT}`);
