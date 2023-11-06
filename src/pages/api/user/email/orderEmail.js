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

    const { email, name, order_no } = req.query;
    console.log(order_no, "order_number in order Email");

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
                < !-- background-color: #007bff;
                -->color: #ffffff;
                padding: 10px;
                < !-- width: 100px --> < !-- text-align: center;
                -->
            }
   
            .content {
                padding-top: 10px;
            }
   
            .headerText {
                font-size: 20px;
                < !-- font-style: bold --> color:#000000
            }
   
            .welcomeText {
                font-weight: bold
            }
   
            .dentText {
                color: #000000 font-weight: bold;
                font-size: 16px;
   
            }
   
            .heading {
                color: #d6d3cc;
                font-weight: bold;
            }
   
            .staticUrls a {
                display: flex;
                flex-direction: column;
                padding-top: 20px
            }
                    .footerTexts a {
                display: flex;
                flex-direction: column;
                padding-top: 15px
            }
   
            .rowClass {
                display: flex;
                flex-direction: row;
            }
   
   
            .footer {
                justify-content: center
            }
   
            .footerText {
                font-size: 14px;
            }
   
            .left {
                padding-left: 3px
            }
            .logo{
              width:100px;
              height:100px
            }
        </style>
    </head>
   
    <body>
        <div class="container">
            <div class="header">
   
               
                    <span class="dentText" style="color:#000000">Dear Ali ra</span>
   
   
   
   
            </div>
            <p class="welcomeText">
                Welcome To Scotland!</span></p>
            <div class="content">
                <p class="footerText" style="font-size:16px;">
                    Thank you for your order. We are pleased to provide you with the following link to download your Digital Pack;
   
   
                <p>
                    <a href="https://scotlandtitlesapp.com/pdfs/${order_no}.pdf" download target="_blank" rel="noreferrer">
                    Digital Pack ${order_no} ${name}
                    </a>
   
                <p style="font-size:16px">Here is a link to our Scotland Titles Booklet with lots of information about your new land and title, and some Scottish traditions to help our new Lairds, plus links to download the map and tree planting certificate;</p>
                <br/>

                <div>
                    <a href="https://scotlandtitlesapp.com/pdfs/BookletMay2021.pdf" download target="_blank" rel="noreferrer" style="padding-top: 20px">
                    Scotland Titles Booklet
                    </a>
                    <br/>
                    <br/>
                    <a href="https://scotlandtitlesapp.com/pdfs/ScotlandTitlesMap.pdf" download target="_blank" rel="noreferrer" style="padding-top: 20px">
                    Scotland Titles Heritage Map
                    </a>
                    <br/>
                    
                    <br/>

                    <a href="https://scotlandtitlesapp.com/pdfs/TreePlantingCertificate.pdf" download target="_blank" rel="noreferrer" style="padding-top: 20px">
                    Certificate of Tree Planting
                    </a>
   
                    <br/>

   
                </div>
   
                <p style="font-size:16px">If your order included a Printed Pack, then it will be dispatched shortly. Please note that during the current busy period it is possible that shipping may take longer than usual due to carrier circumstances out with our control.
   
                </p>
   
                <p style="font-size:16px">We ask that you check your documents carefully, and if there are any issues with the details contained within then please let us know by replying to this email and we will swiftly emend accordingly and re-issue to you.
   
   
   
                </p>
                <div>
                    <p style="font-size:16px,   display:flex;
                  flex-direction:row;" class="rowClass">If you require any further assistance, then please email us at <a style="padding-left:3px" class="left" href="https://scotlandtitlesapp.com/pdfs/${order_no}.pdf" download target="_blank" rel="noreferrer"> info@scotlandtitles.com</a>
   
                    </p>
   
                </div>
   
                <p style="font-size:16px">
                    Thank you once again for your order.
   
                </p>
                <p style="font-size:16px">
                    Kind regards
   
                </p>
                <p style="font-size:16px">
                    Scotland Titles
   
                </p>

                <img src="${server}/images/scotland_log.png" alt="Scotland Logo" width="130px" height: "130px" class="logo" style="width: 100px; height: 100px;"/>
   
            </div>
   
            <footer>
                <div class="rowClass footerTexts">
                    <p>Website:</p><a  style="padding-left:3px" class="left" href="www.ScotlandTitles.com" target="_blank">www.ScotlandTitles.com</a>
                </div>
              
              <div class="rowClass footerTexts">
                    <p>Facebook:</p><a style="padding-left:3px" class="left" href="www.ScotlandTitles.com" target="_blank">fb.me/ScotlandTitles</a>
                </div>
              
              <div class="rowClass footerTexts">
                    <p>Email:</p><a style="padding-left:3px" class="left" href="www.ScotlandTitles.com" target="_blank">info@ScotlandTitles.com</a>
                </div>
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
