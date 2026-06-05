const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

const emailQueue = new Queue("email-queue", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});

const addEmailJob = async ({ to, subject, html }) => {
  await emailQueue.add("send-email", {
    to,
    subject,
    html,
  });
};

module.exports = {
  emailQueue,
  addEmailJob,
};
