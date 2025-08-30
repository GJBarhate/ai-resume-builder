import mongoose from "mongoose";
import educationSchema from "./education.model.js";
const resumeSchema = new mongoose.Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, default: "" },
  title: { type: String, required: true },
  summary: { type: String, default: "" },
  jobTitle: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  competitiveProgrammingPlatform: { type: String, default: "" },
  competitiveProgrammingLink: { type: String, default: "" },
  otherProfilePlatform: { type: String, default: "" },
  otherLink: { type: String, default: "" },
  // Section customization settings
  sectionSettings: {
    summary: {
      title: { type: String, default: "Summary" },
      visible: { type: Boolean, default: true }
    },
    experience: {
      title: { type: String, default: "Experience" },
      visible: { type: Boolean, default: true }
    },
    education: {
      title: { type: String, default: "Education" },
      visible: { type: Boolean, default: true }
    },
    skills: {
      title: { type: String, default: "Skills" },
      visible: { type: Boolean, default: true }
    },
    projects: {
      title: { type: String, default: "Projects" },
      visible: { type: Boolean, default: true }
    },
    customSections: [{
      id: { type: String },
      title: { type: String },
      content: { type: String },
      visible: { type: Boolean, default: true },
      order: { type: Number, default: 0 }
    }]
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  experience: [
    {
      title: { type: String },
      companyName: { type: String },
      city: { type: String },
      state: { type: String },
      workMode: { type: String, enum: ["hybrid", "remote", "onsite"], default: "onsite" },
      startDate: { type: String },
      endDate: { type: String },
      currentlyWorking: { type: String },
      workSummary: { type: String },
    },
  ],
  education: [
    {
      type: educationSchema,
    },
  ],
  skills: [
    {
      name: { type: String },
      rating: { type: Number },
    },
  ],
  projects: [
    {
      projectName: { type: String },
      techStack: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      projectSummary: { type: String },
    },
  ],
  themeColor: { type: String, required: true },
  selectedTemplate: { type: String, default: "default" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
