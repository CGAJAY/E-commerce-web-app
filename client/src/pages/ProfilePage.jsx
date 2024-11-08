import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Profile = () => {
	const { user, logout } = useAuthStore();

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
			<p className="text-lg mb-4">
				Welcome, {user.username}!
			</p>
			<p>Email: {user.email}</p>
			{user.address && (
				<>
					<p>Address:</p>
					<p>Street: {user.address.street}</p>
					<p>City: {user.address.city}</p>
					<p>ZIP: {user.address.zip}</p>
				</>
			)}
			<button
				className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
				onClick={logout}
			>
				Log Out
			</button>
		</div>
	);
};

export default Profile;
