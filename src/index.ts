import fastify from "fastify";
import * as dotenv from "dotenv";

const ENVIRONMENT = process.env.ENVIRONMENT;

console.log(`Environment: ${ENVIRONMENT}`);

// Load environment variables from .env file
switch (ENVIRONMENT) {
  case "development":
    dotenv.config({ path: ".env.development" });
    break;
  case "production":
    dotenv.config();
    break;
  default:
    dotenv.config();
}
