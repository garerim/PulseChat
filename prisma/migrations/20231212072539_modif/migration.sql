/*
  Warnings:

  - Added the required column `timelimit` to the `Sondage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sondage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "choice1" TEXT NOT NULL,
    "nbVote1" INTEGER NOT NULL DEFAULT 0,
    "choice2" TEXT NOT NULL,
    "nbVote2" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "timelimit" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Sondage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sondage" ("choice1", "choice2", "createdAt", "description", "id", "nbVote1", "nbVote2", "title", "updatedAt", "userId") SELECT "choice1", "choice2", "createdAt", "description", "id", "nbVote1", "nbVote2", "title", "updatedAt", "userId" FROM "Sondage";
DROP TABLE "Sondage";
ALTER TABLE "new_Sondage" RENAME TO "Sondage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
