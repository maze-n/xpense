import { CosmosClient } from "@azure/cosmos";
import * as dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });

export const cosmos = new CosmosClient({
  endpoint: process.env.DATABASE_URL,
  key: "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
});

async function initializeDB() {
  const { database } = await cosmos.databases.createIfNotExists({
    id: "xpense",
    throughput: 400,
  });

  const { container: expenseContainer } =
    await database.containers.createIfNotExists({
      id: "expenses",
      partitionKey: {
        paths: ["/id"],
      },
    });

  return {
    database,
    expenseContainer,
  };
}

export { initializeDB };
