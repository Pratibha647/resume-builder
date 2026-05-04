const fs=require("fs");
const path=require("path");
const Resume=require("../models/Resume");

// @desc   Create a new resume
// @route  POST/api/resumes
// @access Private
const createResume=async(req, res)=>{
    try {
        const {title}=req.body;

        // Default Template
        const defaultResumeData={
            profileInfo:{
                profileImg: null,
                previewUrl: "",
                fullname: "",
                designation:"",
                summary:"",
            },
            contactInfo:{
                email:"",
                phone:"",
                location:"",
                linkedin:"",
                github:"",
                website:"",
            },
            workExperience:[{
                company:"",
                role:"",
                startDate:"",
                endDate:"",
                description:""
            }],
            education:[{
                degree:"",
                institution:"",
                startDate:"",
                endDate:"",
            }],
            skills:[{
                name:"",
                progress:"",
            }],
            projects:[{
                title:"",
                description:"",
                github:"",
                liveDemo:"",
            }],
            certifications:[{
                title:"",
                issue:"",
                year:"",
            }],
            languages:[{
                name:"",
                progress:"",
            }],
            interests:[""],
        };

        const newResume= await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
        });

        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({message: "Failed to create resume", error: error.message});
    }
};

// @desc   Get all the reumes for loged-in user
// @route  GET/api/resumes
// @access Private
const getUserResumes=async(req,res)=>{
    try {
        const resumes=await Resume.find({userId: req.user._id}).sort({updatedAt: -1});
        res.json(resumes);
    } catch (error) {
        res.status(500).json({message: "Failed to create resume", error: error.message});
    }
};

// @desc   Get single resume
// @route  GET/api/resumes/:id
// @access Private
const getResumeById=async(req, res)=>{
    try {
        const resume=await Resume.findOne({_id: req.params.id, userId: req.user._id});

        if(!resume){
            return res.status(404).json({message: "Resume not Found"});
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({message: "Failed to create resume", error: error.message});
    }
};

// @desc   Update a resume
// @route  PUT/api/resumes/:id
// @access Private
const updateResume=async(req, res)=>{
    try {
        const resume=await Resume.findOne({_id: req.params.id, userId: req.user._id});

        if(!resume){
            return res.status(404). json({message:"Resume not found or unauthorized"});
        }

        // Merge updates from req.body into existing resume
        Object.assign(resume, req.body);

        // Save updated resume
        const savedResume = await resume.save();

        res.json(savedResume);
    } catch (error) {
        res.status(500).json({message: "Failed to create resume", error: error.message});
    }
};

// @desc   Delete a resume
// @route  DELETE/api/resumes/:id
// @access Private
const deleteResume=async(req, res)=>{
    try {
        const resume=await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if(!resume){
            return res.status(404).json({message:"Resume not find or unauthorized"});
        }

        // Delete thumbnailLink and profilePreviewUrl images from upload folder
        const uploadFolder = path.join(__dirname, "..", "uploads");
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        if(resume.thumbnailLink){
            const oldThumbnail=path.join(uploadFolder, path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
        }

        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile=path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }

        const deleted=await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if(!deleted){
            return res.status(404).json({
                message: "Resume not found or unauthorized"
            });
        }

        res.json({message:"Resume successfully deleted"});
    } catch (error) {
        res.status(500).json({message: "Failed to create resume", error: error.message});
    }
};

module.exports={
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume
};