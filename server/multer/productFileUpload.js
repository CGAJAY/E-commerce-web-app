import upload from "./multerConfig.js";

// Single File Upload Controller
export const productFileUpload = async (req, res) => {
	//Make sure the key name of the file is image
	upload.single("image")(req, res, async (err) => {
		console.log(req.user);
		if (err) {
			// Handle multer-specific errors
			if (err.code === "LIMIT_FILE_SIZE") {
				return res
					.status(400)
					.json({ error: "File is too large!" });
			}
			// Handle other multer errors
			return res
				.status(400)
				.json({ error: "There's an error" });
		}

		// File uploaded successfully
		if (!req.file) {
			return res
				.status(400)
				.json({ error: "No file uploaded!" });
		}

		try {
			const server = process.env.BACKEND_URL;
			const photoUrl = `${server}/uploads/${req.file.filename}`;
			res.status(200).json({
				message: "File uploaded successfully!",
				photo: photoUrl,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error });
		}
	});
};
