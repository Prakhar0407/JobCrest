import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !companyId) {
            return res.status(400).json({
                message: "Title and Company are required.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description: description || "",
            requirements: requirements ? requirements.split(",") : [],
            salary: salary ? Number(salary) : undefined,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while creating job.",
            success: false
        });
    }
};


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;

        const existingJob = await Job.findById(jobId);
        if (!existingJob) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        existingJob.title = title || existingJob.title;
        existingJob.description = description || existingJob.description;
        existingJob.requirements = requirements ? requirements.split(",") : existingJob.requirements;
        existingJob.salary = salary || existingJob.salary;
        existingJob.location = location || existingJob.location;
        existingJob.jobType = jobType || existingJob.jobType;
        existingJob.experienceLevel = experience || existingJob.experienceLevel;
        existingJob.position = position || existingJob.position;
        existingJob.company = companyId || existingJob.company;

        await existingJob.save();

        return res.status(200).json({
            message: "Job updated successfully.",
            job: existingJob,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while updating job.",
            success: false
        });
    }
};
export const saveJob = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({ success: false, message: "Job ID is required" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure savedJobs is an array
        if (!Array.isArray(user.savedJobs)) {
            user.savedJobs = [];
        }

        if (user.savedJobs.includes(jobId)) {
            return res.status(400).json({ success: false, message: "Job already saved" });
        }

        user.savedJobs.push(jobId);
        await user.save();

        return res.status(200).json({ success: true, message: "Job saved successfully" });
    } catch (error) {
        console.error("Save Job Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
  
  export const getSavedJobs = async (req, res) => {
    try {
      const user = await User.findById(req.id).populate("savedJobs");
      res.status(200).json({ success: true, savedJobs: user.savedJobs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch saved jobs." });
    }
  };

  export const unsaveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.jobId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.savedJobs = user.savedJobs.filter(
      (id) => id.toString() !== jobId
    );

    await user.save();
    res.status(200).json({ message: "Job unsaved successfully" });
  } catch (error) {
    console.error("Error unsaving job:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
  
  
  
  