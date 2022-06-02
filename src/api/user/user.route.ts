import { Router } from "express";
import userController from "./user.controller";
import passport from "passport";

const router = Router()

const jwt_auth = passport.authenticate("jwt", { session: false });


router.post("/user", userController.post);
router.get("/user/:id",jwt_auth,userController.getById)

module.exports = router;