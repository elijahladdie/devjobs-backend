import express from "express";
import BlogController from "../controllers/blog.controller";

const router = express.Router();

router.post("/create", BlogController.createBlogPost);
router.post("/createPostAndComments", BlogController.createPostAndComments);
router.get("/getall", BlogController.getBlogPosts);
router.get("/get/:id", BlogController.getBlogPost);
router.put("/update/:id", BlogController.updateBlogPost);
router.delete("/delete/:id", BlogController.deleteBlogPost);
router.delete("/deleteall", BlogController.deleteAllBlogPosts);
router.post("/like", BlogController.likeBlogPost);

export default router;

