const Resume = require("../models/Resume");
const upload = require("../middlewares/uploadMiddleware");

/**
 * uploadResumeImages
 * Converts uploaded files to base64 data URLs and stores them in MongoDB.
 * This approach works on Vercel serverless (no disk writes needed).
 */
const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(
      req,
      res,
      async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "File upload failed", error: err.message });
        }

        const resumeId = req.params.id;
        const resume = await Resume.findOne({
          _id: resumeId,
          userId: req.user.id,
        });

        if (!resume) {
          return res
            .status(404)
            .json({ message: "Resume not found or unauthorized" });
        }

        const newThumbnail = req.files?.thumbnail?.[0];
        const newProfileImage = req.files?.profileImage?.[0];

        // Convert buffer → base64 data URL and store in MongoDB
        if (newThumbnail) {
          const base64 = newThumbnail.buffer.toString("base64");
          const mimeType = newThumbnail.mimetype;
          resume.thumbnailLink = `data:${mimeType};base64,${base64}`;
        }

        if (newProfileImage) {
          const base64 = newProfileImage.buffer.toString("base64");
          const mimeType = newProfileImage.mimetype;
          resume.profileInfo.profilePreviewUrl = `data:${mimeType};base64,${base64}`;
        }

        await resume.save();

        res.status(200).json({
          message: "Image uploaded successfully",
          thumbnailLink: resume.thumbnailLink,
          profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
        });
      }
    );
  } catch (error) {
    console.error("Error uploading Images:", error);
    res
      .status(500)
      .json({ message: "Failed to upload images", error: error.message });
  }
};

module.exports = { uploadResumeImages };