require("dotenv").config();

const { Worker } = require("bullmq");
const transporter = require("../config/mailer");
const redisConnection = require("../config/redis");

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const { to, subject, html } = job.data;

    await transporter.sendMail({
      from: `"Production Auth" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to}`);
  },
  {
    connection: redisConnection,
    concurrency: 5,
  },
);

emailWorker.on("completed", (job) => {
  console.log(`Email job completed: ${job.id}`);
});

emailWorker.on("failed", (job, error) => {
  console.error(`Email job failed: ${job?.id}`, error.message);
});
