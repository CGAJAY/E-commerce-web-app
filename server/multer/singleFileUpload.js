// Import multer configuration
import upload from "./multerConfig.js";
import User from "../db/models/User.js";

// Single File Upload Controller
export const singleFileUpload = async (req, res) => {
	// Use multer middleware
	upload.single("file")(req, res, async (err) => {
		console.log(req.user);
		if (err) {
			// Handle multer-specific errors
			if (err.code === "LIMIT_FILE_SIZE") {
				return res
					.status(400)
					.json({ error: "File size exceeds 4MB!" });
			}
			// Handle other multer errors
			return res.status(400).json({ error: err.message });
		}

		// File uploaded successfully
		if (!req.file) {
			return res
				.status(400)
				.json({ error: "No file uploaded!" });
		}

		try {
			const photoUrl = `http://localhost:3000/uploads/${req.file.filename}`; // Correct file path

			// Assuming the user ID is in req.user (from auth middleware), update the user's profile
			const updatedUser = await User.findByIdAndUpdate(
				req.user._id, // User ID from the authenticated session
				{ profilePhoto: photoUrl },
				{ new: true }
			);

			if (!updatedUser) {
				return res
					.status(404)
					.json({ error: "User not found" });
			}

			res.status(200).json({
				message: "File uploaded successfully!",
				photo: photoUrl,
			});
		} catch (error) {
			console.error("Database error:", error);
			res
				.status(500)
				.json({ error: "Database update failed!" });
		}
	});
};
