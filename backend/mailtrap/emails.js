import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully", response);
        
    } catch (error) {
        console.log("Error sending verification email", error);
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async(email, name) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "a7635f96-0da5-4e69-aba0-101c78189cd9",
            template_variables:{
                "company_info_name": "Auth Company",
                "name": name
            }
        });
        console.log("Welcome email sent successfully:", response);
        
    } catch (error) {
        console.log("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`)
    }
}

export const sendPasswordResetEmail = async(email, restURL) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", restURL),
            category: "Password Reset"
        })        
    } catch (error) {
        console.log("Error sending password reset email", error);
        throw new Error(`Error sending password reset email: ${error}`)
    }
}

export const sendResetSuccessEmail = async(email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
        console.log("Password reset email sent successfully", response);
        
    } catch (error) {
        console.error("Error sending password reset success enmail", error)
        throw new Error(`Error sending password reset success enmail: ${error}`)
    }
}