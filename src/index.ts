import "reflect-metadata";
import fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { Container } from "typedi";
import { randomBytes } from "node:crypto";
import { PrismaService } from "@service/prisma";

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

  // connect to database
  const prismaService = Container.get(PrismaService);
  await prismaService.connect();

  server.get("/", async () => {
    return { hello: "world" };
  });

  server.register(
    function (app, _, done) {
      app.get("/users", () => {});

      done();
    },
    { prefix: "/v1" }
  ); // global route prefix

  try {
    await server.listen({ port: 8080 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

main();
