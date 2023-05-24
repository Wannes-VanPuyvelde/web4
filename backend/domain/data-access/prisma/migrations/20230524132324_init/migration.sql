-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Light" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "light_on" BOOLEAN NOT NULL,
    "light_color" TEXT NOT NULL,

    CONSTRAINT "Light_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlantLights" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlantLights_AB_unique" ON "_PlantLights"("A", "B");

-- CreateIndex
CREATE INDEX "_PlantLights_B_index" ON "_PlantLights"("B");

-- AddForeignKey
ALTER TABLE "_PlantLights" ADD CONSTRAINT "_PlantLights_A_fkey" FOREIGN KEY ("A") REFERENCES "Light"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlantLights" ADD CONSTRAINT "_PlantLights_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
