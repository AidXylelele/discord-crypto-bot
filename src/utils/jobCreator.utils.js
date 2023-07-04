const cron = require("node-cron");

class JobCreator {
  constructor(cronExpression, task) {
    this.cronExpression = cronExpression;
    this.task = task;
    this.job = null;
  }

  start() {
    this.job = cron.schedule(
      this.cronExpression,
       () => {
       this.task();
      }
    );

    this.job.start();
    
    console.log('start Job!')
  }

  stop() {
    if (this.job) {
      this.job.stop();
    }
  }
}

module.exports = { JobCreator };
