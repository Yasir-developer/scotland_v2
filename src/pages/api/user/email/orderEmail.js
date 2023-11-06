// import { createToken } from '@/api-lib/db';
// import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
// import { auths, database } from '@/api-lib/middlewares';
// import { ncOpts } from '@/api-lib/nc';
// import { server } from 'config';
import "@shopify/shopify-api/adapters/node";
import axios from "axios";
import connectToDatabase from "../../../../../db";
import { ObjectId } from "mongodb";
import { server } from "../../../../../config";
import { sendMail } from "../../../../../api-lib/mail";
// import nc from 'next-connect';

export default async function orderEmail(req, res) {
  try {
    // const { email } = req.body;

    // console.log(req, "reqqqqqq");
    const db = await connectToDatabase();
    // const collection = db.collection("config");
    // const accessToken = await collection.findOne({});
    // console.log(req, "complete Requestr");
    const { email, name, order_no } = req.query;
    console.log(order_no, "order_number in order Email");

    // console.log(email, name, "Email and Names");
    //   const token = await createToken(req.db, {
    //     creatorId: new ObjectId(id),
    //     type: 'emailVerify',
    //     expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    //   });
    const emailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
          }
          .header {
<!--                 background-color: #007bff; -->
              color: #ffffff;
              padding: 10px;
<!--           width:100px -->
<!--                 text-align: center; -->
          }
          .content {
              padding: 10px;
          }
        .headerText{
        font-size:20px;
<!--           font-style:bold -->
        color:#000000
        }
        .dentText{
        color:#000000
        font-weight: bold;
        }
        .heading{
        color:#d6d3cc;
         font-weight: bold;
        }
        .footer{
          height:20px; background-color:#001323; width:600px; align-items:center; justify-content:center
        }
        .footerText{
          text-align:center; color:#fff; font-size:14px; background-color:#001323        }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
          <img src="${server}/images/logo.png" alt="Sample Image" />
        
            <h1 class="headerText" style="font-size:20px; color:#000000">Hello 
                 <span class="dentText" style="color:#000000">Dear ${name}</span></h1>
                 <span class="dentText" style="color:#000000, font-weight: bold;">Welcome To Scotland</span></h1>

                 <a
                 href="https://scotlandtitlesapp.com/pdfs/${order_no}.pdf"
                 download
                 target="_blank"
                 rel="noreferrer"
               >
               Digital Pack ${order_no} ${name}
               </a>
               
          </div>
          <div class="content">

           
          </div>

          <footer style="height:20px; background-color:#001323; width:600px; align-items:center; justify-content:center">
          <p  class="footerText" style="text-align:center; color:#fff; font-size:14px; background-color:#001323"  >
                  © Copyright 2023 Dentfolio. All Rights Reserved.
                  <p>
            </footer>
      </div>
  </body>
  </html>
    `;

    await sendMail({
      to: email,
      from: "alifr849@gmail.com",
      subject: `Verification Email for ${server}`,
      html: emailTemplate,
    });

    res.json({
      message: "Email Sent!",
    });
  } catch (err) {
    console.log(err, "err");
  }
}

// export default handler;
