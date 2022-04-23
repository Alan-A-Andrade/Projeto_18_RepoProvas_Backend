import dotenv from "dotenv";
import pkg from "@prisma/client"; // tem que instalar!
dotenv.config();
var PrismaClient = pkg.PrismaClient;
export var client = new PrismaClient();
