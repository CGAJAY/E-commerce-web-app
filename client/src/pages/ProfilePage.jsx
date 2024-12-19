import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { FaCamera } from "react-icons/fa"; // FontAwesome camera icon
import useCartStore from "../store/useCartStore";

const Profile = () => {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();
	const { clearCart } = useCartStore();

	const handleLogout = async (e) => {
		e.preventDefault();

		try {
			// Send login data to the backend
			const response = await fetch(
				import.meta.env.VITE_BACKEND_URL +
					"/api/v1/auth/logout",
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				}
			);

			// Check if the response is successful
			if (!response.ok) {
				throw new Error("Failed to logout");
			}

			await logout();

			clearCart();

			// Redirect to home page and scroll to the top
			navigate("/profile");
			window.scrollTo(0, 0); // Scrolls to the top of the page

			// alert("Login successful");
		} catch (error) {
			console.error("Logout failed:", error.message);
			alert("Logout failed");
		}
	};

	if (!user) {
		// If the user is not logged in, show links to Sign Up and Login pages
		return (
			<div className="container mx-auto p-6 text-center">
				<h2 className="text-3xl font-semibold mb-4">
					Welcome to Your Profile
				</h2>
				<p className="text-lg mb-6">
					You are not logged in.
				</p>
				<div className="space-x-4">
					<Link
						to="/login"
						className="px-4 py-2 bg-blue-500 text-white rounded"
					>
						Login
					</Link>
					<Link
						to="/signup"
						className="px-4 py-2 bg-green-500 text-white rounded"
					>
						Sign Up
					</Link>
				</div>
			</div>
		);
	}

	// Display user profile information if logged in
	return (
		<div className="container mx-auto p-6">
			<h2 className="text-3xl font-semibold mb-4">
				My Profile
			</h2>
			<div className="flex flex-col items-center mb-6">
				{/* Profile photo display */}
				{user.profilePhoto && (
					<div className="relative">
						<div className="w-48 h-48 rounded-full bg-gray-300 border  mb-4 flex items-center justify-center">
							<img
								src={user.profilePhoto}
								alt="Profile"
								className="w-full h-full object-cover rounded-full"
							/>
							{/* Font Awesome Camera Icon */}
							<span className="bg-blue-500 rounded-full  absolute z-6 bottom-5 right-1 p-3">
								<FaCamera size={30} color="white" />
							</span>
						</div>
					</div>
				)}
				{/* if no profile photo */}
				{!user.profilePhoto && (
					<div className="relative">
						<div className="w-48 h-48 rounded-full bg-gray-300 border  mb-4 flex items-center justify-center">
							{/* Font Awesome Camera Icon */}
							<span className="bg-green-500 rounded-full  absolute z-50 bottom-5 right-1 p-3">
								<FaCamera size={30} color="white" />
							</span>
						</div>
					</div>
				)}
			</div>
			<p className="text-lg mb-4">
				Welcome, {user.username}!
			</p>
			<p>Email: {user.email}</p>

			<button
				className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
				onClick={handleLogout}
			>
				Log Out
			</button>
		</div>
	);
};

export default Profile;
