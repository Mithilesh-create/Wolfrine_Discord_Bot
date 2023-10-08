import { CronJob } from "cron";
const job = new CronJob(
  "0 */8 * * *",
  function () {
    console.log("This function will run every 8 hrs");
  },
  null,
  true,
  "America/Los_Angeles"
);
