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
    "time_on" INTEGER NOT NULL,
    "light_color" TEXT NOT NULL,

    CONSTRAINT "Light_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantLights" (
    "plantId" INTEGER NOT NULL,
    "lightId" INTEGER NOT NULL,

    CONSTRAINT "PlantLights_pkey" PRIMARY KEY ("plantId","lightId")
);

-- AddForeignKey
ALTER TABLE "PlantLights" ADD CONSTRAINT "PlantLights_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantLights" ADD CONSTRAINT "PlantLights_lightId_fkey" FOREIGN KEY ("lightId") REFERENCES "Light"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
