import nodemailer from 'nodemailer';
import Queue from "bull";
import { MailInterface } from '../interfaces/mailInterface';

// make singleton class
var SingletonTransporter = (function () {
  var instance:any;
  function createInstance() {
    const obj = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      },
      logger: true
    });
    return obj;
  }

  return {
    getInstance: function () {
      if (!instance) {
          instance = createInstance();
      }
      return instance;
    }
  };
})();

export async function sendMail(options: MailInterface) {

  const transporter = SingletonTransporter.getInstance();

  return await transporter.sendMail({
    from: options.from,
    to: options.to,
    cc: options.cc,
    bcc: options.bcc,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

export function createQueue(queueName: string){
  const emailQueue = new Queue(queueName, {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    }
  });
  return emailQueue;
}

export function processQueue(queueName: any){
  queueName.process(async (job:any, done:any) => {
    try{
      await sendMail(job.data.emailObj)
      done();
    } catch(error){
      throw error;
    }
  });
  
  queueName.on('completed', (job:any) => {
    console.log(`Completed #${job.id} job`);
  });
}