import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number
    },
    experienceLevel: {
        type: Number
    },
    location: {
        type: String,
        default: ""
    },
    jobType: {
        type: String,
        default: ""
    },
    position: {
        type: Number
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
