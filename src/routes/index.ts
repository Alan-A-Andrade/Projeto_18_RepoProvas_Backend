import { Router } from "express";
import authRouter from "./authRouter.js";
import termRouter from "./termRouter.js";
import teacherRouter from "./teacherRouter.js";
import categoryRouter from "./categoryRouter.js";
import testRouter from "./testRouter.js";
import disciplineRouter from "./disciplineRouter.js";

const router: Router = Router();

router.use("/auth", authRouter)
router.use("/term", termRouter)
router.use("/category", categoryRouter)
router.use("/teacher", teacherRouter)
router.use("/test", testRouter)
router.use("/discipline", disciplineRouter)

export default router