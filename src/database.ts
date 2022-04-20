import dotenv from "dotenv";
import pkg from "@prisma/client"; // tem que instalar!
dotenv.config();


const { PrismaClient } = pkg;

export const client = new PrismaClient();