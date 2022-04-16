-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'APROVED', 'FAILED');

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "status" "PurchaseStatus" NOT NULL DEFAULT E'PENDING';
