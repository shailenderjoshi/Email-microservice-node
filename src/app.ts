import { config } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { createQueue, processQueue } from './services/mailService';

config();
const app: Application = express();
app.use(express.json());

//Initialize Queue and push all incomming request data in the queue
const emailQueue = createQueue('emailQueue');
// Attach process Handler to proces all the queue request 
processQueue(emailQueue);

//use cors middleware
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Pragma, Cache-Control');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, HEAD, DELETE');
  next();
});

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  let obj =  {
    "from": "'John Space' <john@example.net>",
    "to": "lili003@gmail.com",
    "subject": "Welcom Lili",
    "text": "Account activated",
    "html": "<strong>Congrats your account is activated now</strong>"
  }
  res.json(obj);
});

app.post('/sendEmail', async (req: Request, res: Response, next: NextFunction) => {
  const emailObj = req.body;

  // add emailObject into Queue comming from the api
  emailQueue.add({emailObj}).then(() => {
    res.json({message: 'Email has been added to queue it will be delivered shortly...'});
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});