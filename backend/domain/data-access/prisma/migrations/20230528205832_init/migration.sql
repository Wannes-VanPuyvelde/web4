-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "locationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
