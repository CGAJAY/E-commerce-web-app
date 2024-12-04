import React, { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddCategory = () => {
	const [categoryName, setCategoryName] = useState("");
	const [message, setMessage] = useState("");
	// To differentiate success and error messages
	const [isSuccess, setIsSuccess] = useState(false);

	const handleAddCategory = async (e) => {
		e.preventDefault();
		try {
			// Send POST request to the server to create a new category
			const response = await fetch(
				`${backendUrl}/api/v1/category/add`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: categoryName,
					}),
				}
			);
			const data = await response.json();

			if (response.ok) {
				setMessage(data.message);
				setIsSuccess(true);
				setCategoryName(""); // Clear input on success
			} else {
				setMessage(
					data.message || "Failed to add category."
				);
				setIsSuccess(false);
			}
		} catch (error) {
			console.error("An error occurred:", error);
			setMessage("Network error. Please try again later.");
		}
	};

	return (
		<div className="flex justify-center items-center bg-white">
			<div className="w-full max-w-md p-8 bg-white rounded-lg  border-y border-gray-200 mt-10 ">
				<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Add Category
				</h2>
				<form onSubmit={handleAddCategory}>
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">
							Category Name
						</label>
						<input
							type="text"
							className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="Category Name"
							value={categoryName}
							onChange={(e) =>
								setCategoryName(e.target.value)
							}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Add Category
					</button>
				</form>
				{message && (
					<p
						className={`mt-4 text-center ${
							isSuccess ? "text-green-500" : "text-red-500"
						}`}
					>
						{message}
					</p>
				)}
			</div>
		</div>
	);
};

export default AddCategory;
