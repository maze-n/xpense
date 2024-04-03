import { CosmosClient } from "@azure/cosmos";
import * as dotenv from "dotenv";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
dotenv.config({ path: "./server/.env" });

export const cosmos = new CosmosClient({
  endpoint: process.env.DATABASE_URL,
  key: process.env.DATABASE_KEY,
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
