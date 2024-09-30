import express from "express";
import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/staff/signup", authController.staffSignup);
router.post("/student/signup", authController.studentSignup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("lecturer"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export { router as userRouter };
