import { PrismaClient } from "@prisma/client";

// Since Prisma ORM doesn't support trigram-based indexes yet, this migration is written manually.
// Prisma also doesn't provide any functionality to simply apply custom migrations with defining
// database resources created by them in order to make database state and prisma schema in sync again

const prisma = new PrismaClient();

async function main() {
    await prisma.$executeRaw`CREATE EXTENSION pg_trgm;`;
    await prisma.$executeRaw`CREATE INDEX "Movie_title_gin_idx" ON "Movie" USING GIN ("title" gin_trgm_ops);`;
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
