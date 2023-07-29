import express from "express";
import { authUser , logoutUser , registerUser } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/auth', authUser);
router.post('/',registerUser);
router.post('/logout',logoutUser);
router.route('/withdraw')
.get(protect)
    

export default router;
