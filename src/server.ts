import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./db/prisma.js";

export const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");

    const server = app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });

    const shutdown = async () => {
      console.log("Shutting down...");
      await prisma.$disconnect();
      server.close(() => {
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};
