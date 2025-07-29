/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "slug" TEXT;

-- CreateTable
CREATE TABLE "ExperienceTool" (
    "experienceId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "ExperienceTool_pkey" PRIMARY KEY ("experienceId","skillId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_slug_key" ON "Profile"("slug");

-- AddForeignKey
ALTER TABLE "ExperienceTool" ADD CONSTRAINT "ExperienceTool_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceTool" ADD CONSTRAINT "ExperienceTool_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
