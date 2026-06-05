const verificationEmailTemplate = ({ name, verifyUrl }) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;">
      <h2>Welcome, ${name}</h2>
      <p>Your account has been created successfully.</p>
      <p>Please verify your email address by clicking the button below:</p>
      <a href="${verifyUrl}" 
         style="display:inline-block;background:#2563eb;color:white;padding:12px 18px;border-radius:8px;text-decoration:none;">
        Verify Email
      </a>
      <p>This link will expire in 15 minutes.</p>
    </div>
  `;
};

const welcomeEmailTemplate = ({ name }) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;">
      <h2>Welcome, ${name}</h2>
      <p>Your email has been verified successfully.</p>
      <p>You can now login and use your account.</p>
    </div>
  `;
};

const resetPasswordTemplate = ({ name, resetUrl }) => {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;">
      <h2>Password Reset Request</h2>
      <p>Hello ${name},</p>
      <p>Click below to reset your password:</p>
      <a href="${resetUrl}" 
         style="display:inline-block;background:#dc2626;color:white;padding:12px 18px;border-radius:8px;text-decoration:none;">
        Reset Password
      </a>
      <p>This link will expire in 10 minutes.</p>
      <p>If you did not request this, you can ignore this email.</p>
    </div>
  `;
};

module.exports = {
  verificationEmailTemplate,
  welcomeEmailTemplate,
  resetPasswordTemplate,
};
