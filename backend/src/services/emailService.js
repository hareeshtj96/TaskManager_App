import nodemailer from 'nodemailer';

export const sentOtpEmail = async (recipientEmail, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: "Your OTP Code",
            text: `Your OTP Code is: ${otp}`
        };

        await transporter.sendMail(mailOptions)

        return { status: true, message: "Email sent successfully" }

    } catch (error) {
        console.error("Error sending OTP email:", email);
        return { status: false, message: "Failed to send email" }
    }

}