-- AlterTable
ALTER TABLE "users" ADD COLUMN     "githubId" INTEGER,
ALTER COLUMN "email" DROP NOT NULL;
