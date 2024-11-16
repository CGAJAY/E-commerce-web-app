import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

// Get the directory name for the current module
const __dirname = path.dirname(
	new URL(import.meta.url).pathname
);

// Set up storage configuration for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../uploads"));
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, Date.now() + ext); // Use current timestamp as the file name
	},
});

// File filter
const fileFilter = (req, file, cb) => {
	const filetypes = /jpeg|jpg|png/; // Allowed file types
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		cb(null, true); // Accept file
	} else {
		cb(new Error("Error: Images Only!")); // Reject file
	}
};

// Set up multer
const upload = multer({
	storage,
	limits: { fileSize: 100 * 1024 * 1024 }, // 4MB limit
	fileFilter,
});

export default upload;
