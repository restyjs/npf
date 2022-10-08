import fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { randomBytes } from "node:crypto";

const main = async () => {
  const server = fastify({
    genReqId: () => randomBytes(8).toString("hex"),
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  // middleware
  server.register(helmet);
  server.register(cors);

  try {
    await server.listen({ port: 8080 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

main();
