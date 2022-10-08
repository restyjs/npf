import "reflect-metadata";
import fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyTypeProvider,
  RawServerDefault,
} from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { Container } from "typedi";
import { randomBytes } from "node:crypto";
import { PrismaService } from "@service/prisma";
import { PingController } from "@controller/PingController";
import { bind, MetadataKeys } from "./core";
import {
  ResolveFastifyRequestType,
  UndefinedToUnknown,
  KeysOf,
  ResolveReplyFromSchemaCompiler,
  ResolveFastifyReplyReturnType,
} from "fastify/types/type-provider";
import { IncomingMessage, ServerResponse } from "node:http";

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
    return "pong";
  });

  bind(server, [PingController]);

  try {
    await server.listen({ port: 8080 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

main();
