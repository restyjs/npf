import { PrismaClient } from "@prisma/client";
import { Container, Service } from "typedi";

@Service()
class PrismaService {
  client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async connect() {
    await this.client.$connect();
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}

export { PrismaService };
