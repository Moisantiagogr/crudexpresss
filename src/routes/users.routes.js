import { Router } from "express"
import { methods as userController } from "./../controllers/users.controller"
import verifyToken from "../middleware/auth"
const router = Router()

router.get("/", verifyToken,userController.getUsers)
router.get("/:id",verifyToken, userController.getUser)
router.post("/",verifyToken, userController.addUser)
router.put("/:id",verifyToken, userController.updateUser)
router.delete("/:id",verifyToken, userController.deleteUser)
router.patch("/:id",verifyToken, userController.patchUser)

export default router;