# Email-microservice-node build in Node(Express) + Typescript

For sending Emails we are using nodeMailer package of node we need a transport service also to send proper email

**We can choose any one of these Email servicer (Transporter) like Gmail/Outlook/mailtrap etc\
 I have used https://mailtrap.io/  for Email Services with Gmail account we can easily create account on this**

open .env file and update these details
<pre> 
  SMTP_HOST=
  SMTP_PORT=
  SMTP_EMAIL=
  SMTP_PASSWORD=
  REDIS_HOST=
  REDIS_PORT=
</pre>

# How to Run

step - 1) for installing dependencies run below command\
   **npm install**
   
step - 2) for starting nodeExpress server use below command\
 **npm run dev**
 
step - 3) we need redis-server to properly run the app 
  install redis-server on your machine\
  I have used docker and run below command in command prompt for running the redis-server container
  ##### docker run -d  --name redis_srv -p 6379:6379 redis
  
  Now server is started we can consume APi through below URL\
  there are 2 Api Endpoint -
  1) http://localhost:3000/   (GET)\
  this will give us the parameter object which we will send in final APi

2) http://localhost:3000/sendEmail   (POST)\
    we have to send the below object in body and it will trigger Email
  
      {\
        "from": "'John Space' <<john@example.net>>",\
        "to": "lili003@gmail.com",\
        "subject": "Welcom Lili",\
        "text": "Account activated",\
        "html": "<strong>Congrats your account is activated now</strong>"\
      }
  


