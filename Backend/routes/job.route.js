import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob, saveJob, getSavedJobs, unsaveJob} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.put("/update/:id", isAuthenticated, updateJob);
router.post('/save', isAuthenticated, saveJob);
router.get('/saved', isAuthenticated, getSavedJobs);
router.delete('/saved/:jobId', isAuthenticated, unsaveJob);


export default router;

