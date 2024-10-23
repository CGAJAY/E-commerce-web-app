import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true, // Ensure category slug are unique
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt fields
	}
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
