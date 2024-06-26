import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import router from "./routes/index";
import { responseError } from "./utils/response.util";
import cors from "cors";
import bodyParser from "body-parser";
export const prisma = new PrismaClient();

const app = express();
const port = 8080;

const main = async () => {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // Register API routes
    app.use(cors());
    app.use(router);
    // Catch unregistered routes
    app.all("*", (req: Request, res: Response) => {
      return  responseError(res, 404, `Route ${req.originalUrl} not found`);
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
