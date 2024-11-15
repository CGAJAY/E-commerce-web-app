import nodemailer from "nodemailer";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
// Email transport configuration

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.MY_EMAIL,
		pass: process.env.MY_EMAIL_PASSWORD,
	},
});

// function to send the email
export const sendVerificationEmail = async (
	email,
	verificationCode
) => {
	const mailOptions = {
		from: process.env.MY_EMAIL,
		to: email,
		subject: "Email Confirmation Code",
		html: `
      <div
			style="
				font-family: Arial, sans-serif;
				background-color: #f4f4f4;
				padding: 20px;
				border-radius: 10px;
			"
		>
			<div
				style="
					background-color: #000000;
					color: white;
					padding: 10px 0;
					text-align: center;
					font-size: 24px;
					border-radius: 10px 10px 0 0;
				"
			>
				<h2>Email Confirmation</h2>
			</div>
			<div
				style="
					background-color: white;
					padding: 20px;
					text-align: center;
					border-radius: 0 0 10px 10px;
				"
			>
				<p style="font-size: 18px; color: #333">Hello,</p>
				<p style="font-size: 18px; color: #333">
					Thank you for registering with us!
				</p>
				<p style="font-size: 18px; color: #333">
					Your confirmation code is:
					<strong style="color: #003366"
						>${verificationCode}</strong
					>
				</p>
				<p style="font-size: 16px; color: #666">
					Please enter this code on the website to confirm
					your email address.
				</p>
				<p style="font-size: 16px; color: #666">
					If you did not register, please ignore this email.
				</p>
			</div>
			<div
				style="
					background-color: #000000;
					color: white;
					text-align: center;
					padding: 10px;
					border-radius: 0 0 10px 10px;
				"
			>
				<p style="font-size: 14px">
					&copy; 2024 Your Company Name
				</p>
			</div>
		</div>`,
	};

	try {
		// Send the email
		await transporter.sendMail(mailOptions);
		console.log("verification email sent");
	} catch (error) {
		console.error("Error sending the email", error);
		res.status(500).json({
			message: "Failed to send verification email",
		});
	}
};
