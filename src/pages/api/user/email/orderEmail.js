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
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-50 {
        width: 300px !important;
      }
    
      .u-row .u-col-100 {
        width: 600px !important;
      }
    
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 31% !important; } #u_content_heading_1 .v-font-size { font-size: 22px !important; } #u_content_text_2 .v-container-padding-padding { padding: 0px 10px 10px !important; } #u_content_button_1 .v-container-padding-padding { padding: 10px 10px 40px !important; } #u_content_button_1 .v-size-width { width: 65% !important; } #u_column_5 .v-col-border { border-top: 1px solid #CCC !important;border-left: 1px solid #CCC !important;border-right: 1px solid #CCC !important;border-bottom: 0px solid transparent !important; } #u_content_text_1 .v-container-padding-padding { padding: 40px 10px 0px !important; } #u_content_text_1 .v-text-align { text-align: center !important; } #u_column_6 .v-col-border { border-top: 0px solid transparent !important;border-left: 1px solid #CCC !important;border-right: 1px solid #CCC !important;border-bottom: 1px solid #CCC !important; } #u_content_image_3 .v-container-padding-padding { padding: 10px 10px 0px !important; } #u_column_7 .v-col-border { border-top: 1px solid #CCC !important;border-left: 1px solid #CCC !important;border-right: 1px solid #CCC !important;border-bottom: 0px solid transparent !important; } #u_column_8 .v-col-border { border-top: 0px solid transparent !important;border-left: 1px solid #CCC !important;border-right: 1px solid #CCC !important;border-bottom: 1px solid #CCC !important; } #u_content_text_4 .v-container-padding-padding { padding: 20px 10px 0px !important; } #u_content_text_4 .v-text-align { text-align: center !important; } #u_content_text_5 .v-container-padding-padding { padding: 10px 10px 40px !important; } #u_content_text_5 .v-text-align { text-align: center !important; } #u_content_social_1 .v-container-padding-padding { padding: 40px 10px 10px !important; } #u_content_text_6 .v-container-padding-padding { padding: 10px 10px 20px !important; } #u_content_image_5 .v-container-padding-padding { padding: 20px 10px 40px !important; } }
        </style>
      
      
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f4f5f5;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f4f5f5;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f4f5f5;"><![endif]-->
        
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_image_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 15px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="${server}/images/scotland_log.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 23%;max-width: 133.4px;" width="133.4" class="v-src-width v-src-max-width"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 26px; font-weight: 400;"><div><span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiWGN2ekhNbGxLZWpqS2twMTFKM0xkQSIsInBhc3RlSUQiOjIxOTE0MzI0NiwiZGF0YVR5cGUiOiJzY2VuZSJ9Cg==(/figmeta)--&gt;"></span><span data-buffer="&lt;!--(figma)ZmlnLWtpd2koAAAANUAAALW9e5xkSVXgH3Ezsx79nveT4SkqIs6LYUBE8nGrMrvzNXkzq6dHnSSr8lZX0lmZZd6s6mnWdRERcUREREREHFlERBYRURERERURERERURERkXVZ1nVd12X5+fP3+56IuI+s7mH3n+XDdJw4ceJExIkTJ06ciLz1iNcIo2hwPuxe2guVuuZ0q9bsB91ip6v4X7NV8fvlarG57gdkdS/wO5m8Z6j9ZgU4F9TWm8U6UD7onqv7AAUD9ANfeC0ZWsO5H5yptfsdv94qSs3lZqtbWzvXD6qtXr3S77XXO8WK1F9xYL/Sakp+Nc53/LWOH1RBHQnKftPvg25X+/f1/M45kEezyI7frgvyWKW2tkZ6vFyv+c1uv9Sh9XIxkL6dyPTtdKvXYRy+9Oxk0O34xYYtIX/K5e2Ir6o1u36nWO7WNhhkvUbHrGgou7r40ChCQPcDK2leF7e2EDQoOFT6rabplDKZs51aVyrp5nQYtncGUQhZmaKu6QVEjdaGAfXZ0WQ4mpzv7I+FptlqPuB3WhSoVsWUCwc7k0+i0AelKq1yr8GIAXW52NwoBkDeeqfVawPk1jrFhtDlS61W3S82+602g+rWWk2QhQ2/3G11gJZEBqTL9Zphu+LX67V2IOBqByLGbeb8SMdf79WLnX67VT+3bpgcpalmxa8wFSndsa5/v3TpOIIrC+JEcK5Raon+nKw1aaxpsEi8Vj4joroqqBbbfv9srVvtu7pXl1vNJjxNB68pi66W6q3yGXLXnq1V1o3eXQevhoz0+oZfqRUBbqjW1qt1/pPiGwMY2MHe5MA+wu7Ui9LozWeLQbXW79IyuVs2ip1asWT6f2vXAY8xQL+MPMjdFpM4rX8swzO6/LhiENQCJrQP51ZPyh5/uf74dd9N1RMSRtKbDoUgnxjsDPbCs6P5Tjd8aG7n+bbgvl6x41Oq6IKbEs1IGy2jpV4XPiJ0FhbZXJKttM7KqPNXmp1Cu9gp1uusUBZRo99xwlpaRNf9NcEu+831fqWIHIqm8RXJsxZ7klmVzFrNcD1i4Fa94suEHe2yPv0HWjXp5bF2x6/4a+hWpd/utMp+IFp6HOH7dSk/EWtxP6i5Pp5MUI1evVtrG+SpRrHZK9b7tWbbyPiqqn9/0arh1eWqv9Ex4DVtqjn0tS2GbUFRFenZ9e16T5q/odjptM7Gw7zR5mJZ3BT0Gg360j/dazKFhsHNRhNvCdq+X672S70S8wfiVjPRGBUMSatTNAbiMaVxOBk2WK7SHZSj360yE+ti1DC7nYYxpbpS7JzxhbXnBilamZM1yBIrYanI5suteivJFYxmmzpLAUbEQGbVUqPSYlWQX7FV4uyq6Bh6CXgkaK11+4YHuaPVYgeNdTljQv2Ob5fmcf/+MnKyIz9RNbN9Mih2e4n1OGVaAbiq3kNUraDWlSaubg9GE6e9K0ELxQep0KhKjWmhNekqGJ2gJDXywGwBCgpNFTMDLpfgIHJKn681rJgLmM7TNYClDZaQWMrl2i67XbA1GIdW+mxXHb9bNoJfq8k4NfpqWutavc3529vhlutxvobN6bBZFVlAFKpKp9VOs3qthQVkJpsVjFFPOuiViuUzi6icrN+yMfRLLTSqhnKAVr02xpdU11tnDUAXurYPARpR75eLbdHMfJpjQXXKZnMoCNNKuDWdDeaj6YQ68RZAy8wvcgXWDLd2xk+1zauHA9lTurPRLrm4Drz7Vd/NvG7u726Gs95kNI/g2ynKUFW7dr9fDwA0vWbLFUqvPJ1E81k6w8vMPHgl5WZIulGUXdGjH07suaDMhguQX4NjpW9rFFzGUC8F89n0Qlgcj85PqJAwU+wVTCyAxqg60LPE5cEeGhmPh+Ea1dCJvfTsgha5yCByNuvf16vV2XkxdCDzTqfEhFmfoID4UD4MaIJaym4oy+mW0b+D/Eomfyf51Uz+LvJHMvm7yR/N5J9O/lgmfw/54+Vap5xt/YQd7enpSCTTwJXogFUlf8OXEeh44F5pOh2Hg0lrL4wVJN9r2pWKGKkm+x+wDnolbLOBvfvNAjb6aoRfnc5GL5hO5oMx1Z1lzMwtumyk4J3usXOv1UwP09ob4Ww+YukJrtWmKFO11Op2Ww0grzHdj8Ly/iyazpAP20IR20eBKndaASut1gHW/jlflh6qR87D8TJNtYsMBVtYRsXJ57H0JAWScq0OtNQQiypVlpli3FmglWT+THZ1g8U+nTVGs5l0IFlFZtZJtQGwQFhGdrSuqLBXGUQ71p54ZXZhUCpVcG1sjl0P+XZzHZQ63fYl1cGGJF67Is5pzn9obzqbH15DORwdTDqbn1soKkbg5pj2dYxIlqxXH1ya7s/XZ6OhZZK3yyoj8bSDnl1lubROezCfh7MJRVDV2maFYKONrdZmPvfn004YjV4A60REpjtGMkk/dAJ5Uq07259sOfXzKrVAXBzhqfCp2U0BdDC/NA6D0I2dqesELWcfu3jfJLqMdlld4SCAq9Esy8aS6/qNNhusOQTkYzYIcx4mkrxsvwHU8W6B4RhsXbDTmIypioF+AOmaHmg2SjxSA1tqo9c0d5l0rUi9EkomJgY4ZyqUp/t0aObqLT1aPcTuJidX7HVl58pnWBUMq9P70Xy0fYnso3JpF8u4lRu+PW/kbL7kd89axwApwSews2gMLkgOHEHtAb/fbWFljIAWECgdk1xrtPHcyUkJNFYa7Wk0ksllPwHlOq6KJcTes2ccQ3Z2JraZvYazT7ENWrnUFmdF5KYP6pjb4TFoSCYsWZq1k7wSTx2mwPpdco4lr3sdM3ElNmTSXLneMh5rHme9Hzvc5Au9Nv6s3zcnhn6n1+zWzBlpiVVWqYl3YxRguUbXZoNMy6c4PbD8DXdVXKP1vlRlayKvGy3Oz7imwJ6FbUGOWlVxwYDztgBnQsgKNmc89yWo8JKNY8yR2YxwpYI7SbpK2Rn/XFztCNmNlj1XHQW246iauTyW5Flx5I/bJmLFOWGznAQ3pPbJ7mwwsVNqR3gzGy7HhG6fHYKtV2QBmWIlM8Wmil7jiE7q2SPNWqeVnBRyGVS8U+QzOLsnFDKYZFNYaveCqsU5ZsspJua1kqIsq9UUkXA6Iodpi3OcjqaYmNOxFGU5IaYYkXA6YTvKJEIUMzu5gIz5nVrAWpZXLeASrleblhzWMb0mi4t5XptFWpbXZVEJx+sxb7VyX8rI3YDvSJyj2MTqmSV5I8eEFt5kirnJH0SsYDvjJwiNlHulWpkCJazjjMalz2Q9MU3WI6eGLLGkKC90C5iCrbuAW7JWPckvB+2O3RJW1lFPttwEsepIE8QRC5kFwlq2q+PoIrJ7VszHsUPIKkck0MeDrdl0PK6MZtaS0Gm3xr7CBoCEjYG2dTFDc7EG4RAjNg8p9+9vsxdam1qGgzhVJqfXe+xC2osICdEY8LLS4ymekQG98nSM66HzM7Wq9Hn+8Tb5Jzfgn7z1Tqj8EDl9iX+8DiioU8RF/snt8E/ecArm0z0qbAmsnqf0nrPSEHiNwXw2ekjppd3bbyevd2+/g8Tbvf1OktzuHYLM794hyMLuHYJcag9mWOTaZBhSzzu/PxqqBzNMjyrPHhcoPBiM90Pq6H1zdLhVeWtIqTnYDZXObQ92R+NL0OtI9moADybzaGs22puTywntxmA2GlBlfzecjbbWRuf3Z4iW3dkdkRVqx3wCaCILJuIIbJpZrBrsDbZQ6oW6hBpwGMSImbwmhuFOlVdgsCaTKwPMcsCQEjwwMP4U6mzmN1u7PNiLUOa0CuvPHC81ST/OeG2fo550PQein+TERSdKKWABFINdB1zK8G/Hcs92Cxeef/Hk8Z4ATH8CI2QmJ6GqodNmqekg3IXVaOtsODq/M18gIignQ0pIavj+o60FkpQPhwuzUayFg7mZqL/VbU6SFKnynW1D4kbjlduB4HMyKlIzUNKCi2guEegRl3i51ak0SVeKax0pX600jVE70uw1ZGhHcdwlqneMfVdEc7xi0xPi0ZOe5OAr6ali0Rwirirb9GpOUZJeE9j8tZ0NEz+5ThY46fXBWRNhvqEcnJX0RiZZ8DeVyyaceHNgvbNbqoT1SG91ftBjWp2m9O82EQrpY9knRX6Pq3TNWfnxa/WijOMJjfWOuAlPDNBZ0idxKpH2v2oNJ5r0yVWbfnXVtvs1XZv/2vts+pS2Tb9OTlqkT62vlST/9a22SZ/W6Zr0G9q2/u3tM02R0x11zBDpnaTSz7s63brk7yaV/NOLpc4G6T3F0obkn0Eq/b53w/J55gYdIn1WqX5W5ucbSYXu2aRC903FM1UZx3PKp80J8pvLa2ZBPbfcNvliudcRuhIug+TLGElJK2uWv08QUPqzRnon6TrpXaRVmpX2aqTC/3TVjofW1qU/9WrrtOgNnrDxc5o1HBLS1un2M+4lbZ9u3yt87jvdfubtpJ3T7dvvJg3qpxtSr0vkWOh77I4yLxviJJGeJZV+3N840xD8uWbduHcPNHtnuqTfwkYi/fpW0oD02zYQOOmD7aAr+D6p4J/XOdOR/KDTrkq62emVZN63Ahxp0mHX9iPsNs0ZZ5tpkvk7v0FIjXRnw5aPNuy4n79xxujLhY1Ot0M6Jr2TdDcIsOBKTUglPyW9i3SP9G7Sbyd9OumM9B7SiPQZpHNSkdM+6TNJD4IA26/URVLh9xCp8LtEKvxeQCr8/g2p8PsOUuH3b0mF33eSCr9/Ryr8XqiD4E5h+F26vGF6+CIBhOV3CyA8XyyAMP0eAYTrSwQQtt8rgPB9qQDC+PsEEM4PA5iufr8AwvllAgjnHxBAOL9cAOH8gwII51cIIJx/SADh/EoBhPMPCyCcXwVg+vwjAgjnVwsgnH9UAOH8GgGE848JIJxfK4Bw/nEBhPPrBBDOPyGAcH49wF3C+ScFEM6PCCCcf0oA4fwGAYTzvxdAOL9RAOH80wII5zcJIJx/RgDh/GaAu4XzzwognN8igHD+OQGE81sFEM7/QQDh/DYBhPPPCyCc3y6AcP4FAYTzOwCeLpx/UQDh/E4BhPMvCSCcf1kA4fwrAgjndwkgnH9VAOH8bgGE868JIJzfA3CPcP51AYTzewUQzr8hgHB+nwDC+TcFEM7vF0A4/5YAwvm3BRDOvyOAcP4AwDOE8+8KIJw/KIBw/j0BhPOHBBDOvy+AcP6wAML5DwQQzh8RQDj/oQDC+aMA9wrnPxJAOH9MAOH8xwII548LIJz/RADh/AkBhPOfCiCcPymAcP4zAYTznwMYE/UXAgjnTwkgnP9SAOH8aQGE818JIJw/I4Bw/msBhPNnBRDOfyOAcP6cPhxfwkWbs12ru5WOXTVPfNPGYG9PnCXtbc+mu+Lezaf865XG002l9ealeRipnLaBLeXluLTckfxEPDv8uOFgPjC0yyq3MRqGU+V5MU10V282FqK10Zjzc1m80uLw+cQylF6ZS6fwF6OdwXB6MQL0dnBJiATs4D/ikQ7D+WA0BsqHjCUSJwPP9IBIQUjECnhpHu6aEKctWj4YbXKG3RJ4xdw82GbdtbfyjvzfbXILz2s2YGyranVzJjwntEzuiOmM8q43E3BK6S0RhHqe8qbiqc7Fkc8djKLRJl6bVnkSd2F0QhUiPPpIbesleE+i7elsV+2o5ZGZjZdqtWKg7g5u+ES6Dmp1MAHJ4aQmRYI5ZTG4jni2TNuyuop89m7kanXEYnam++NhWfrXGExA0J/rZ1NOOVSmm0cjqQJwbNvI1lC6KX2ZVsf3ZKRrpghLrE6Eu9Pnj8q00CZojYyX9ckDoyQPa3U1AebzowknIWn57Gg4Z2DqmgVs1Xqpy+raLWkJR1g9nFfXiZPbYK4qKJ/yChfCS2qi9DbY+mgSV2J2BVMZnQ/pXY5TCDnrGr9A5SXjfOACNxDkYD6y4/RyAy71u4PzNKwFbIrU0ON45Zg4t238mq2dgRwXwlkEhU5ypqFaRYbsRQK3DsIZ4dawO2B+1SOezo1NDNaE5DaZdS6JxvQ+YsvQhfPjS3s7EXuFXhomFz0RO4Ve3uT4eOHb96eyMN+o9SnLZoMOQEKPV7YZTCKdV2q9uj0YjzeJtq1REKmJPrKDIs5o7EJp+hBcXqv1UXJAL8npY/MkcMvpduZOfwV13OHDYSLfE+PpeQnyG5LutByPvbW9HYVzLIta1Sd3R3FkL6l31S45+NvWX6f11UOOXQfhsG468dKcvqZiEamcj9lhOmnpBWl5qbRYwgvSYjEtSKuwTV+ywlm6XBbLbqTwWJDAisNnJLD6fyCBI4dHe3RoB1c3/We0x6qZPigvv0lUdBipIYdpaz/dyTu3E9NxICgQQUwYswjSSlHaaSIM2JIYzo2iDY50kHDQt3XPsHSWVaHkxKm8FeyePWUi5YtmUbKQpOwcQE6AZPR5yRWjLViRW8ZMTmdhPXPJiFXcHs2ieSIXaYsOZfNL6zJ5ylvemu7uDhhCye4maZhhU9kVxKAZg0yg0QLav5z5YHjg7PHS5bZnuZIoB7vUjFgK8tLIK2Yuu57TFozAgbvDKmF1kJlBNwYzJslJOtstG6wxWiU1JdMM5xenkLvxIJxdpP8Cokb8k4zqcrsg2zK3MshEy8RH6kGtg0u7m9OxYx+ZDO2yW1s4ZsIa8LRHCEY2ioC+h2uIhs2GqYvZopVmx/c8NAEOe+BwJjnmI6v1cCLbGxJybU2znPV+FK4x5+viUjCOSxMTaNG4AaPt7dZkfKmD1A8GY0Odq1g9r+3u7s9ldGb3sXy9Rb5knPXyihErpxNuQ3MB5cSmxoUshICdiNan+3s1xB+vCz2I67xDCw1SrT16sRFY7VHLzTZAZxHv/4aiRcdkCLXh/44yCOePzi5Af0WW0i1wISE3FNhb3R6NwzNWApEphAWOGY2KNKoDfCwiZ8KyzQy6WY1w+TF6zmsrjEf4J7NLMvXdabC/KRG3TcgEwSFML7Ho9qYTFrBtaXl/sj2WC0G518myXBlFvbgoZDGoVdvtcly/MYhYgnZyc1sx1nLVe/ub41G0AzNpWLrbnXbDwW497Z404h1uJFfDfZX1HIs6mMuwU60UVq3t4CI9Rc8csSgzPtZCFxb17cp8N+78P+KMiRiMg8yMxFUsa/uEBENqvL1rpSd4LsbbM5sCCz83w0Tui2uYT92+Akni9i1Fe7NwMIRiOdqZXkTWOKylEAkOZZVCvtIVf9AYyNpkW7xu096G0sN9u4Cp7LXx3aZSUAkPRlvxxXQc75ZAhrk812VCSybY5hkcIXAJlZJnDUvFTuwCYiVc5XL5bN8cXvShRtjAJMPZCsV1lo7RMPTakPkYbY8w1WgutSzPj7AdtZAhO3zb2fyuMFAryS2n4tYjviLRAiclnuTii5IccXrGEVPmXTYhLjhETL9kH5EBLbsOlHCTzmNfZNNEnzGe9IZWklHLRSK3DvbyTy5g3FMUfRkDO4akJkGqWqUfP5S6nLyIorGRiZZ53maCNlw+gShTVDlWqOaAo4mRoaFShWZxgxipCScr7oDcSy8dnDWBWU/SPrFrQ5Bzl0HmqjXvc96R4yKcmU4xPVDE7+4gUEFn3QSaCea1Ydtv39XfuBuEZ2sGHJBY3hGnrGh/e5t7Bpb9SFx40zVW1hYe2Vz2jTnxIJWLDs6LsTCeNfNPlrOoqPZnWArkWvtz8S7EAVRaYaeYDnZx2WPIL0OxNp1tsXDlSQzG50IEeoX9qbgZTcf789Dt0liqreyoPqXVEdfljXXXpPJqa/2m77sLnGL9bPFcAKDrxueUVxLY47kM5B5lDgTKwxAnSzc32d8NWPRMRKTwy9xC5+gYWWwgywCX5Pw+pm3mcjg89It5XNkTizebqHvV6jrmHAUwBxAa0QmreO/ItTFMEFzEFCBw8z54RWFkFpwn61pgnvBMAgG70nm5m7DKKG+KSLjI6LTOCMZzL21z/tqafRyUJ1zb6ghUcK9BljBDmHzDL7NR2basmY33arc7xXubEDBHDFLmnN5HgnFVIuYiXvfkPZkmW+Su27B7KDqiAmF0VuaGIdzvV/pnqz5rsVqrV/qttb4t5uaE+1v72JkRsk7PuRKp6BVnW0kvcJQRYnFyHikSGMAAZ7LeaIIz1Iltdc7a/DruN3X3ZyN6qIejaG88uGTU+Ki4QSZrtJb+t8f7nGVda3smgySphovEQZIKF+xA26asE44HnDB2bIX8nkHaCruEElhMgCwkM9WA+POVcBxyIEEJ84398XwkrYeztVE4Hm7YqWCCtlgKyB5l0Nl7SC4fGaC4h42BRDhU+p7CvcAQU0viOXuas+YTKB9b0EJiW5ekTn/hCnU5acCfDPfEC0cMoQNlH6MbeEN78eRvchtpe/JlFlVSGYBVPm5LLUaTIbdrkWqQWFqRfAAk5Vx51ioVbpPpF1bP6DK3BjHKvoqI35TYqo2R7RzNRCCFywu97CpMqFEDjA9ajFj8eql11toOFlTRiYZNtWMf86e17DL0km3H3CqiqkC6OJm4HRFbxTlvfslS3+AWq/C2i1VzIWTuo73kyVWO25B+jM5LJikqNIr3J0XsePenRcuWZVK6UuZOy+/0uZCo9WSxrCbm4IgYCMRob12Pmhx3ges0lJ3yY2tA/bVio2aeIR03WXdhdsJkzsaNn2Sh+mlfTtX9LprETX+xzAoGcxWTxh6bIq62iHax4l6QXWMRDfvo51qbM71y29Z1Lalsrt2uv1y+ytNzEfFLmeK0lLkfDzZDOXjrPUs5wrd7mIOV81cb04PQOV3T8fCMWcIco7Bva4ntytJWR0TxZpdqBA+pEk332biM+g9F/W2+fMhfxZcKx9K4GAVWOPp2AZswsdVobzttakyZs0A5gXsmapA/OxqeDzGt6DOL3+MAaurSpD8cESCQAeTnI0zLfLC7V4um997DdQ2s2UVnEApnBiXE4bAoUbjcFl5pnMlLQazSuYovPwtCzupslQvtUqvYEdXX5umLqJLHBnDBERfr7apcbckrE9ECIG1ejrsfg3gBq4WpCJgRbC+ejrNLpR6WnpQ76gyBHYqOTEa9jtlsMlTiAhMspvfleOs0p2kb1Xv63s4gCtWS8gxgkffssVnFzx2er3KZrCV4xly6f0QZ/9ai7p1YuRcktahnjqK2Pe/I0Q/L/DbN2YCD1570GNr3euNUN0zfX+5hZjJIpzDqFZ7+MbdF/IbdZrGYy+oOB9r2wlEUTLfnbicIpIhG364JW04nvb0hE+Y68gvg1kbjcUzzE+StAxVjfgpM68AeZyQVmxiXfcn2oMvY1d9p7qpMtrIwtN+IHQDgn9NI4Aq7/xc1Z71MUepKfEFzT3XIHXifN30+B51gn6XApM9Cs3GYDU44/Rl2+qAxnU7GI2K/40txC59i894h/CDBaDteJPcgwUKHzgzbFLwhLkhGbNA/E6Ody5gUvDkpMMe9tOBn4wLxGlP0W2J0pj84sLYblP+qjgxyCFJIuF9TH7YCNzhLGJf8QaZEOiy4j2RwtlOC/cMMVnokuI9mjhftAdYh4o5U/6a+Yg9LCSm9fD/qEbDKbAgGnfhruh1n29ZWXtoQ36Y1G6II6oU5/ffxXBvvKZ3s92n1ArgZ7OJ6+TdASYVsEOI7sgUb8Lcq8p0WnVjQjK69X3NtGxn6RUV9hd6PIw1wzzbyRu4RsMe9Ryn+XBzMQEyy8D8R5800/6k44rYXZ8yy/SQSK9/JoP4spgsTx+woF4D2tqO8WOlfUi4i1Eq4HanPevphHLkMGlFG6Ln+fs8NUAb8Fq2+Pc1aAyFTIXG4IMGrRzz9b6cHZp1zJrcFZgA/uNh0EW/x/ERixZH6jKdfxkGe66jiLCztbzJZ4nf+QhL/CCSIwtWs/pJeQBFX+YDWXzbm15xe3qzVNM7YLu7FFeqy7amC+k1zd+NOStfFsCWuYZgH52eDvR2xzThrq+r6QyhLeDrBxk/CVtUNh3GW9MycZVTkJjD7u4evUY+7AtpW6CYlGyi9hInVU9TjL0Na4p7gy2w06nr1hBi2RRuSzcSlb1RPXMRYsrPs63HgnY6lOVv8rSKhJlsQ92BfG8O26NsMO5n0V2v1lDhjyx50mtF1WBaL+o9G8iZyOSEgsLs7ndQlyrBPCIfp/ncLpXgWD833BxyKUooXsoASksqIVRfKONjaslTflaWy+53IK0vyoiwJBkVuBUF/dxYd4KGwpB4IZ1OKXpwtau7bx3z2IeGe+p4rFDodUDP1kiuUEq82Xoaaq+/NFpflod8BN6sZXLJlPaS+T7MTY4Fi5mP105YyWfcfgmLAeOwtyc3q/VyZT7AD59sc/5CnYaTVH8XoOvIh/8ccjx6qM/USZfgrdj7TO9aYc3s+s4gyrsXrPfU3nsxSD6eubuIZcT+W1e9z2X+ew+6wNWl13Us+jLbWf5AUENZfKPmITi6h1Bty6q+0GAfh9qac+niqOoKK1Ku0frFpvDQajtJmf9TguvY2TVDPVq9hqFF1MOx0613KGOwbMwGWJQdarX0WEdgLxvYsW8iivzG9TV9xoC14NjWTyOpqkrGF3xRhVzhCHpXUor6ZMFVy1c51qMvYwucOUTgMF/M74XLveCZrCYq7+Ln07ZSkFlURsBa1bEiLsqsXEJZoTXDGuXqtp349s0W37FgY1jWXIW3VdWxFNlLBZXmatyTVyDgQ7sZ7Vd2czVuSpkUZ86Uepx6TyVqC+ywG7VdPULclGVvYsXnz47QnqcemOVscbONVpM7Gk9OsLX/AVrAoofjqLMLSfEto3JpIfVDrr3OwLemngim7oNqdh1CWcFvaXQ+nu+Ec9/rzWt+VRVia87blGClUdy+iLN2OXCCyPlHL6V493MYcplJHxD+kswQdEfQhilemFKXpfD7dvQKXHz5McyVGr0qJ0pKRbIV7KDsLFJ37kcM03Sl7PqUpyavNeRc/lzUZYdwZNeI3K+1H5VBY3DwUWn2RtzkV74LxVY0nAe4nHc72NkE/4tAyxAT5Uw5pxpRg3+CwTC4uOoouS+ZNDklTVmkZ9s84nG0qQb/ZoaWpBPmzDmmaSrBvcdjAzK9FYzezQvk5b4etyW79iUzm6jZ165XwVjXakfy4SYyMKilst8vYwuebvIwLy04fLmTzlmRsUO3BUPYISHazeUtCg6DKzASmxyxStaYeMsjT+/bHYlV1yeRtaUV9VJtsNem2Y0gDf2SLMNHGa0kLPmYLCCXgt51Wf2yz1vUg/3Gbb7ONsb8HoxdIrdPqbxfQpv0awY+ILn3eFmU7bosq6j+6op3ReOiqrs+m8guHv7MlrltmCsH+pwWsVQLQX7Bow8bwD8LxNsL5osXHGzVVVF39AOcjkB3czlkUPiBT/xCT/oMWbX691lS/ZXOuz26maOm3vd3RhEGH6tV59TuyOceZDyzUML1ARzhNzFVb/Sn3nMEE3V4f7LKWBjNZYJ/0UCB3oScnXOONf78sSHu3FkisOil4WVpQop3zqZ3D9P2ATlkZH+BDWv1YBtelFheFr82gKumd4Y/rcJD8Juh+9boMVRsfIJwdhIEJy9PpX+K0YCKbFBr6DufLFCU/wjuqfiXtK0EtuSD8qFbv0iyW+H6tS5Hqql/LNNUlLDXdl1l+T5ayMSDDf8Ym/bomE5dkRvBeibcQ1zd5dlmmdjyQW6P3ZRoIzEu3ACWbF83rODEyf5h2tZayjtQrc/qzaZGZCiRkImvqdTn1v7QN1RsX+p+0/rDLS+gOH8fG8/9Z67+IZSPneXhw0FP/mOJ8zthg/nuKqTNScxRXL/ZgnOBNbbZe9uH/kWKpb3H/nOLKaB2TZboaqX/V+v9Ny8TRSgLeL/LU/5cpYpjqJZ76H94giYtG6mWe/m8eh+1DXyY5pv6bNtge2uFMw6r6n8yCOVxc4fnH2zVdedTiDZYi7akvafUxb4LKH3qU8jat/oGuDkMuu7Yu1NnS9uVq5Mue+m5vjF+Kmh6MwouG9q059WrbZedu4sVqPCznKJcRD4sySvaeH8frHIbTNgqzycJiL1JvlbW8u2fYvSWn/kNcl2a4FDAL7L159Y/eRRNulTcxHLURWcjuon4ogy7bH7ovq1c6ZMVKINjfnM/C+Hfwb/bUD7vy8mCLs00RhhFzol7l8X9bUpvs7c+Te7F/8NRPuALZ1LkFYtm93mGq0wNsllGiN3nq32N7zhp8gKW/IHJn1D+NiGQ5IAbXDS5aLZmpDsnfOXaNcD4Yiij+0UNBLM4/EBmqv/f09zpMGz+CveRSI5zsW/P+JU9/n2fmuTO9GNvgSL3HU++0aKzX/u5koeSXbAkVrFZFRAPVL1ukJT8r+5JB/woBP7diMVBjGch0sj0yl8wyEf/9svI2a2i0Ndrj8BYT/RMXeBIc2KWMIdWGmNr/TBBcTk2d6XRO9gsuG3cUSX8xrlU3JXIla9bFJzxE4oocQ7O9fNJT/zXG2yrtwX6ESftzj6k03eSk60/2d9dYicy9+hdP/T/W2FEgnY0L/tVT30VUiF0GtTpiAOsePGdgfrU/YUkxeSfSnC0uiXLbXcOfiDjFnp68DGmJy6EJfiJPs1Za9gr+qsuxltyPsE41DMnMPEDDFNy4iLFk9d0R46mPSCC5icTlbHFjLuaF+bqApYXglmzekrQ2UfaF71w8WT3pMM6S3o8SM9lZTw0P7qsux1ryc5y7hwStzYchaE89TT31EMoSPs8KIeC8Dy5Sn9b66xdRlg5rQGDITEIkLsKz1NMWMZZsc2zUQQK1RPy0/oZM3lJs2aeFogPqTVrdnmZt+XAbpZJo+wUiL2YOmaroMqQlxuqYtqdrzIFWcsSPs5bgwI6lhNStXsT1ob4oETys6ee0flgjOaObogWUvVxHxkVIf2T7gPpJTLYcO4JdFtIOomFSH3F0RBki7lc3GZJtsSvCiYKNdQFg+POOkIlinrbMPQcyVd+q3gHbBEfvYfKL3I09RDxYHMBZOKmMxKTLk6N3Oi6J4fx7rd6tB+49wD9o9VvxpmQjooKumxnYcFtSgfDmhLoEqciaVf7nWv2OiXeODz1f+pgm7OkKxBMQwxMT0MvfjctS6dZEioxECD6uOeZeRlFMHwl9UqvfMwQoh7kIfFD9iZHFAKdhxn2JyNFd98jhpjjBQZQJkA3wU9YXLsOTJpGbzMdp9ZcpA7lxEQ6PwuDT+kJ4iejV+fNI9pGc+ow+mOLa+bITtHdmhDeR999o6ansXURIdkrh9nSGC0hwTAb4oP7PLjJfZ8+OcIT0f9FzpluCXSJ59aKc+q9MCB3daRG3Z53SUdyEKXaRyB8wHfketvxonvrkL/XC3c1waBi8OcfNGnG8nUaIuTWoL+W4VEMpmGeZZbrnNAnr/yNeNNrdG3N0it/7tQeTcCzDfZ032GIkJghV7Tbqsjxek1dv8yTW1cHiqNfm1c9niOruBvnt3oGQgDHNP5xX70gwZazO/i4jE792D2bqF5MyOS6WLgXst5S802M3jEsERyHeWF6/K4vlYPBerX41QXVCTuvoslHGf8mpdycl0hVzSxOpl+fVryX4LrM8aWIq6PinE2ywNd2D8pV5/ddsNcT0L6EiD6l3eerz3iZKhNw3YlJ6MZRe/K/DJaBfmMdFEys63d4OkPl+ZMaWV//Jw32bDAfx4hD0b3vqdx069jgE/SFPfZBDFzunEFou6nV59Xu4NZlLUGbsQx5zzoaLd/ZqT/0+PedwhFuyLdc2b8irP/GsZjH/Rgnp4Ls0W/aWWI2Ojc6m5utNeTbnmcXaTfyo+gtvON0iUEw8OMv7jXn1l/DmGgOxZW/vEaGnP+tF4nsUYXsQdnfC3bA+2jzD6j2qPmeUqTifz0abBFki9ba8+lszCjMDZii/nFf/Bf9zF58l+Qn3d6h/TlDuJ9vfqf6nt0EzqR/r5QbsNXtkkY3eheugPpVvBSgP99tILNcQrPSMAatVeeXHTbtqF3uB3L3rbmtdvoYk+H6M9Br2Yy+5XtNBeUcm2X6CLZgPga61Omfts4Alky8Vy2ccYtkgzKOjFZw6XEjjeFq/1VtCsgQlRvgZEhvEeIlBShHZH1LhaK0l1CgkI8uDCzJVLLYwilq2ms0v2XYrbgdYcMo9JMzC5jgp9+9YSWM3Ab3MqytRUE+jDzN5L/JWT+vFQp+SS7C6YKY7fQMWr5GKU/KUx9vhcajUpwgmOTkX2Vtw+nOQoREbk6xdS/EOT+U2FjDq1kYtCOwjGnX40Y+Wjz+ud+SbqunbGy9F1poV+7omFz8fit/w5O0LnLRWwSLci534Xa58YjSDtY/MlheR8QOzlUV08gJtdaMW1Ep1US77NKlS7MqTkqPxW6Zjycui48kHL6Up04n+4TGfWKQxrV9GdDIlsv24Mq9Tl5Fdmd1VpVanAkIaTER4tUO6mgn+Goc3LSbYax3WNpCgrzOfOGp2+/LZC7/TrZkXONdbUZZbPXmyl5mlGxq19PHYjfJCLM7cJCWJIG+WoiR3S6xSsh0le1WqvL+cUd4siU85GpzoKFhWFZtGosZCDepB5ZWB7H5DxQzvd8N7ocynQJiy2Oa4GbvqVXnh51ZYV7hyjMRQc2jM7jMpy/fC8lHpfIiE/WhIr9IHi5exFqcE8gzb91/G1tH4EKQsI5BYL69otry2awCyDKsPwOqycp/ClM2eK5CeWdIap2/jAcgjKvNMTsWfznXMsvtr2tiHk8Yy5T6FaWOCVB/x4pZiOsz1ZGB8CPu67oNQcP7DtDaZMTOvuTnhPU6E7Ggf9VT+YDq329vHPFXY3Y/YxyT3cU8tWdbdhNzTc4Hr4eQ8AWlMnyXYiDl4+KFzPCvsc1raSFhix6fs4BXpXESn5l24NSJIvUr2QJ6c4UVq9ulZ134+SDu67IFeJy/MsvJ3hJahO+ELO5ioc2ZBosKZtxadcFt5hQkysjaa7g/DbfrKOnjBdHdzFK4N7O84m1a8ua1s9WZS8dOINPsyuFC+Mp3KpzZUZW2olt8OdGoVzHw/MB9r7tMNOl9rVv1OrduXF6n2LagtyC20kD4aQd7xENxi/BzKsEBckVGvWOlN7LgIgSDEwXgjrpFjC84GXPJ7Rviuek3qFuYyW59HY7IjX96byXsjXH3DKyKKpVYWmjd4tlMJG1gYOySnEJt5tbYP720OxV2o3JU25Vcm5vsjRoQkOv6NB+LC4jbLfl9+eAFisXb7UN/QTZaeuMwme1TrkTuGyK+QHPYLnvZqGfQiE3jMpU9f9JSczxDVVyDuCiWz0Wq0UXGzoSv6i9smn7CV/mrrEflyqGMvtx+Mc1+eU+YHMKRaht33K6iFfVHtFbvsM1W/goZAIl/aC/r2e+lSjNPQYxeSlnpZvHuuuhjZVDn3uUCWX69ZLnZ9QG2+kOzejXq2Wmp8Ft7ZW3iDMyuaY1AuQNm0qpY7a3IyHYSCknClFc1ysdy1v4JSgS/uT9dMazq/FXZXJ46cQfYDv87eb0qdIwxUoKsiKedgZhvjaooTxnQm51tU28ORNQBdn6OROI+AbojZetJJ5a3uOZQbTbbOCAozjH9i/Yy2DM+85R5xYNCFyDQdDlsGRykrp2sffbAGlrnd3ga5gslh4+JGcbrL9sWUaLUqO+9i7F2d6p5r+0G5UzOf+FHltkyadl++8cqBmLvc6eJGMaHJyzmatHA6MDJeMs7lfYJabp/rVg1yZV3M5Wpg0EeCszXjPx4905Jnw0DHOr1AMMdLRfMNpxOcTuRbkGYhnqyJk05Uys+EUjFu9gVxXFhBa+JCdhcSYx2LxHrkG5WP+riRydpzSORkzZusWq+L9agTkxDGysuPAdE8uG3ujzFMZlJenGOG2DvwXkT68as3eb0dNvcJYMzI5UtpBZU3jp5ZKarXTDM68cbZWvp1+6mlnO3DxB4IvNUxoGHzcE5hVS5rl11R3qAn510OkYzqZTm1OlxEvTyncosoESPW4RU5lR9OL07Y8fDK5NSGWS6oAooXIYBwsnUpxS6JTJDtbN6ygb+CWpaXybPIdLq1XaccRVup2LPY4mj0YgekT1pKzQBVwWgAMlBORrFMdCK1GOMZR+i+XstYlVzVL1IMlA+uJA0Vf51V1c1nmHTHfM2MbX6RzLPFyhbjLmSLnbQwyw37UVVIlH9/Aqe/pRTKOBboFUayx2lmi8qvQndsQaRem9OLPwKKmFi8S/l0xy7EzvIh4ELC2TdcvOVR2kIXNBewqEaCWrhpRVeTgsxFa449ppvGAPHjLgsBFgjNogFSQVwtPCHqLe1KpKFKlBkU+eWkbxvuBNA1/iJzzcDfzY5cnk6Ig8BkMC6aXsh2OXAQQuBE7gjM8TfhVzQkyrs57Yb4P6xHxJniupByI+6lmOwoF+7D8ymN9N4OKDPKwFykHbpXlp8vysUq5YZNR378F2PsLfmKhDvGV4wUr14ecT6SNsimzrUrd1omtE1jR21/17julHK1qo+xfmYDS+BW3KY6PjcyjiVuRHJiEbchNk39a06dNBPmhPlGT52CnWu+Q+tzG2uKe8zdEHZx0puNa5NmeJHTD6irF1mrV+fUNYsos7qZvWtNY8GF0V53KiJGvtclqNKl4q5x7lfV9YjQznlENX1Dkk115DU5feOhrlopZPp60yGCWqzqB2HirkkI+OZEqQL6LXc7bXNxTijG7b4EZTMvzNPfqeFmuFVS4WJ6K8RInfHPxb+QwZqfaeJEcC5vEk6p140N0veXWvf38cuAvXZwN0mO7a9brsqZnlz+TLr2TEhJNuVIFTRqbbCurddjLap02r7Y9Lx989sg8xabCfcajI4+WotHU9lvsLfa5/qVntim2O+yxGI7pLLetflw2EMDa0P4egmqdClB5raJi54x7mg+sg29McdBLya1hDVkeVJMg8PGDCx+2WdTtFF977gbQzTb6hnIm4/mqBQtzeMPIdmC/EW5H0ZXCjs2VortCYVRF4lQvpzQ13axmNVBJL9aXdlmvaFNWZy4WgdouVwjHeEC8PwINZN9ifxRBJ+Z+GOmhQ1reY0AjqMx7gGBl9s3owIrJ1W0KHCBRUFxAoAwHTuoXJ15Y40nLxq8lX0zNh0PWtyQuGu5xa7krzi+whXGt7RIedbJ7bCAYimubNAduR7CwdkaTA4GkdzAhO5hIFvGHjdwY9dtFo9n8pVQFpqJ0tpK61YL8w35OwBsc1s22vpUpW25YVqfbg3MeDaVl0EHbHqsUvv5m+FhjpZT1Tzr6GAQqb7MQZjg+AWO69Bwut4z6xeuwSGbYB6dwMVdFyYm0+sy8SwtnOYDFpTE0s33IoBcu3pnOo/2pnOX9SJOXQ6ObUBS2c5mYWpzjuorMWCerQGqxSZqOnFleVethMHe4xA5rw3lVxaFpM0gtbNFU9G2bn5PiPe7hlOILnane7tTXLMtIt+ikfQHW5ex0eBQuEWc4YTqzdx9U4yXKB4OMVEGlHMaiGNS5vrnvK3gFSyXJlRwpaVR1EYO9EL0JckEolJgcsyoHPplRyBeo/MDMwx5Imo24khWDrOKn4MVR0DDQFrE4m3iibgRVaQdJ/BIvSuHs54Y/8RRwwqmFxWq4xMLMXcdGukYh1l6tkkYxo4GazhlwzeNvRdXdBJeTDLeZdNSkWnJAcUTCIbpG0VVS1mbNMOLh4bAPA6Tzr0vx0EtPtPPRc5ytypcl2spOhY1Yo4kZ1rRh5uNuxcs8KF3Ucwng86bX0qqD2G5xe6VzQLDnkWL69CtXKeX5qG/TLHLm4NJENdAdFEMU5t5HeLJfcX6kg/iOh0zxE3MHFihas3K3AwPiB8R5Nt2dVA0hlEOx2NCsDXBLCUYjrQGs7w4p20zVJWTL8zW2PyMJhSJtVuQCECjUevajLdYlX3OvLZAMnuGCwKTp4PnmVN5qs1eFSsrZjCQySGwKj8vYzVGpmOxxPV4EM1jpbPc1ftRqsvRAWy4CP0wp7Ms+zxqj/1K+Oc2F/UwXgo1ToTyfTAvMvSJvcvFQ7O/ImW6Lm9aenSFjgZJjxxT14lIfZQjy0InjRkmpJuaeW7mYm5rIkvLknWwRKVEXpH6SE4vU0bwx34cgegXioDJQeDsPGwqXZv3NuRkksaI5Lgg3nc4LBPfQAOoUg3x6jbDwZwpZf37EgQz8SxV4tYkyekeOzONSoe82yJaps+IcxnNj5nSU885hcRoJWjyPJa4bKDW1y/Irmh2z7exmnfpZ6jenlPpYlAP6pXpJg0dME6M3eowZMcOm5bnEWwB5sFsZpF6R04ftSKON7BIvTMnn/Fzpr9lJ5kLmZw+TlMzentUnTBzFtNUrSFgJZxcwLevsOVQ/UE5ATiSmH1FJItJvWqPXKo0kfpYTl+9lZmlj+P5HyzMxydy6lqW/dkZQStkd518lHMN/ztgtlEira7PmKTYtEXqt3P6hjkT7EzRB3LqRskGiRQ/mFM3JZNSNFtHwETdvM29fdSadCF2dbW6ZSeZ/0/m1K3J8IJ0oysarhXp8btz+jEHoytsa+/J6dsSWTECuez3x6F4tZaKVZ7MgR5MppNLMv+9GGVcDyBMHQaD00dk+bKNBkw6wajB3s59++HsUhojXXTam13iH9zrcWVq/tSNPlQPMxCx9Yrr2aQtWuLgsofFYf1vxjw/jSWRUtvnKJkpT2+OUUwTIXNmAsW3QsTNYsyInVO70XXrporU3d3NCru6vQfB9szBd8Jda6ztFQyqhlMN3mRzcyCRyrLK01BJzg8FHDm5vlkmhoSedlgISHkYgO1CzcB290zl5QhUT74rhj/fSO9/MC1pF6ggGgkRjUsFIJbsV+bMXh3Mp3t46bBIvI1Zc7rLkcCO31swC6OoLKpLKE9qEJtwNWyHFmknKZcvYDpZ4pCWZtPBcItOcbO2QL21KPfPUWNOX2fq80zfXtyO+iKhmb14IbezaHvZpv4OK9SAMbJQ3uOESvQm25THejaAeXfgtEI94mmjzHH+z3O6MBLe0qErKv+ncupxRoPUS7ReEqg0iDAudv+5Te6NBmNn5pYHW1t0QeXVSiShwwBn0ZasxvmudPU56kicL7P705hBP1cdNZ/koNsFdcyATmOJfZjsWnIsPWEbbg8ujRE1iJPRwqKRC9HP5PSpzOCTJfHZnLpqG04b9sDHMK423GsoGquM/eVSa38eiSgmW2NMNKEZ2dTQhWsMYRuxswU9qK5FUwgnYQDH7IXj3mQo5mXrgvqHnL7eoDphBnXDZqwXkfp7Ah2zcMvauiD89v0QjXOB5GV1k2mnNEMNd/CnOYCv0WE79JtNmU/khBi4yO01nrplTw4BlyZbReYREwTZrcmv17ndC83xRL5L+Rgc0/kleZJXs3d2dbrECB5bGW1vl3f2JeRwNCM19jJt3aKl5GNJTYpRJbZK4/kZUeQt7Oa7YHO1qMb0SsyeFpa2hHtUND8DRKbdHaQnKJpY3iQCJuJHF6oj1HG2tXOJJvTK3uW41SsRx+M7sndl/FEZX6wu3HczhHiEsLRGUlScMTo5ROofcXwkW5L2hCy/KVDbtNBc5FDYuxJ2qRO/ZTQzpTz3h3wqfRJj7FX8xy91QloRJfUIzABX7WFfz+JCw+efsRvxHifUBqlW5FrTLzZhptbqraJsLzroyp/UAfKK9Zr5+8L24gtAvhfW8QP3Z0ILDXNtt5S9Pl6OG+mE9qSYNrb0lRtL2rBcC1muSzHX4sTezrDPPMpt7lHlbTNjLof7TUx+EEmAOW/cNIt/niqED+3NMD3ovkW9OI+b5u5g1Uvz7C7uzaDFvIurirgXtWELPhYW10he56LS6XMXMjTIfZHNZmjeo5V8Tc+1nMRv1VXy9im5iXR/stFmNRKXv8Zl/6aZvQYyt6Pu78dWaqIQQHn/vl6xLhNWaLa4qZUcmSXuZuUP0hrJLyeZPleZMcnKekf+PnXHFJBfzeazhEfsnz85ambqGK2QHLdzWFuT3pygVtP+zb6T9Nd8tqlfb7XOmMvmU+nQkVaYZBI5vCiv5HW4Qxdn5/dlYzGx30R9G/EkmZAoE46cJftwPlVxaJRn8azRfPpISdQR78iUSNRbD0EY/fwyK4R2F5X2X9hk46oBN9CsVWqPxHzpiTVcOBULDxcSemGyIe1wj5E8uXnFob5YAp9SnDZvF/4oPMwPMjQLIzPvRGUi5HUG4Vtf5ts8SzDBZXtNyOF18RmaZx57pe+6cutmkeWFizz0EJrCWqfY8E2W3FJg/kK3yy2bBlxmhQlvmY+UmVtiNpH54KE2Vxrb8iiL+3ZfviKpUJWO/XvQetSSBjx7DT0Yb2DOcUDdBLFXa7knlvfWqh5fwBU73Vq5Lo1o+Uumdil4zeIGSa7oPsiZr8ofVChU7+Tfpepd/LtcvZt/V6ryRxRWq/fw75GqnOtktEeT279jay0uBAU6zrpjfQWAJ4TmZFWwp7ByJFctXB5ebV6AXNOTf69t+M0e6XV1+asy11cEd0Oly783VmTEN63V1nuGx81A5WLbDeCWBo476a0sWpLHyEuc2/wG/z5WhGos4eOCBtMC8Hjp1RO4NBQ+T7yPf55UWZPaX1UslaSbT3Z371/dkZa/piMD+Fr3vucp8qcKSb9O/pI66VNZjSRfH9i/n/60MyXp5zdgakhuD4yA7pDB3CmIu2Rwd7s/nvP0kvnbOfeUKjIzzwjaxkbca7rwzLMmeVa7Vu7aAX9j0Op1zBe+nl1ryHi+iZO2jPA59WLJ/BHbb47/nvdzS71u18ilaB9VAJWk/+7yFvXuxpNXAbYy9EUXixgo4LVWr2t5rXNlgtUyM1ltQCPdkr9ZW6/Y79+ervvr9vHKGbGjHXnQr54Xq1vTXsPcXWzbuxDb1G2lovx9aKAy4aB23WfaaVpkXnGrrdZcEwa+G+Sam+B1NFU+02r5VAk1WKgW+MWO+VNTp7PvTY6n6v5YNsJeo5no6hM5+XHYc5yeVKnJy9OW6cOTK+nHW786FtRTpSb2GPDr7QQ8zYnzdknRJunnHfgU0os7seHS6tPR+Ow3gZ/RMX8A+16SmPEzgYW36dWzuvLmB+A5XXb1ktGtYjKdulz1y2e43QL25MuiZd9odK5uX8nk6XTP9aQQw5k6SzFODJiIdzmZ/ZV4nm2bqzHFkaDc4WLNYo+aL9IJdCJo15pJv07Sa5KrSFBio4xXizbZVq/pdnxfWgW+lvkutSz+OhkB6fUiP4u6QTpIeqOkts2bTE9iYd1ME0IOeIuwJb1VUsfqMSI1dnDAUpHbQKE7U2/JbNUbxc59PVOjYR9QAaFnDTOelqGu1IqWuJ1A91nFst07Zq8RgU4tmLDHpZbo8W5KnlBh5TncV/mNdhXbKi1+zZpvQp9fi/2yC/spLB+/Y/6s29fVmgHdsLW+IV5td4k+mxc+ZO4JYnv2jdgYJse+CHo2loZYe5z9JmqKuL9Zxkf63NjJ7YimocXmr24HceZOMt04cxeZXpy5m8xGnHk6GaOqkrmHzP2SMX08l1j+B2QPsVP3LekO862yft3SJvttMo1+38nqQXbRdWNM+o1Dv0/x9DAaluVXieabaebjhCaCYj2RkA1etv9H2P6zRT54Nn7zhXfZ9rcFz2nOxH8bU44SI+ITh896ubJ4sm33YxTutux3m1X63WYyukIETLynReIcZrBo/sDyFT73TM4rX/HHMYSKrIVU5nF6N/3DpdoAgpESEF4R85r8xCX12AsLHnvmHSRO0yGffTRxcIGwkCEszmYDx+ioLiy0IC6Scdbk09/JCQP1Y/YBdHzW8GpmSnO2JH4glL+MF37YXNi9BV/0wLT4ZvyvBTLzq6Z0Vt/OrF5W7lPI1HqDGMkwHb+3wq966EdSMXmsCTvZcvV67/IamQ68gw74HO+Nc2hjTjqM81SQGPK7sjQGB1Fk0ndni+iDGf57GP54YH/h5iWlXSlSS7XmBpu02Adcz6DbZ4s1Zk/3sAukXrveWzcbYS44F1iTmsdqd/vFtvgShcDqVRuPW55jSI9zRB7G27WhOqk4z+3u4VDKiekkAS+Xa1qPO/f/A00PAAB9WAlcVlUWv+/dj09AwQ3XXMjUrCbTpplUeOeZ2mSaGUOZlo2RIa5YaIsbuYC4jJqpqZXlMlqWWS6VCzCapoZLipSlVi5hmWVaU+qoOf//ecB8s/YLz/975757z37OfY7jGmuqvHT2171OXJ4xc/G3L75n3ydHdu42eHDX9IEDuw56rHXrLr+969HbTE2TYJxa5irT0IRCjjGuCTlRnYb2fWJIeuZwE3ainzHGxJgqJPhPSTVT4BrjGD3HXG1CbtQ9aRnpia3/3/qahFWdp/CiE8UXHbwYF5XaPy1rQGZGYuoTffumDxuWmDp8aNaA9GGmVg6WJ2LzFrnGPOtelzo0K810GDr4UUN0o6Lrnf/1dggqT8cO7aMcx0wYmXDazTN1p9mBD814P5TTe0aHShOMORNlwnXwvwOducSaEN4weJodPe4+SOlOMGPvi+Q44ewfi7tBbTfHbEqJ5Ljh7G2JrYxjyTkZybHhMYvrv2WckJtrNl0fyQmFx9QP9TAwRu6/nRNVdk4YHLM8khMOZ/dL6mOcSu5E8/C/SF0pPHp0wko4BZy9cZGc6DJ9osEZ2yaSExPOzvK6GCcGnE1pkZzYcPavJW0CzpFJkZzKZZxYcMzbkZwq4ezTo33jVAbnzIFITlw4O3ZFg4Az9mIkJ76MUwn+mVQ1klO1Qp880752JKdamT5VwJl3QySnenjM2IH5xokDp3/bSE4NntOb/skzrbpHcmpW+CfPvNY7kpNQ5p9YcHpmRHJqVWiaZ+4ZFcmpzXMamBjHYZQG8WrcZxBxNuGWZoO2dBh3ed57r9RtXXRl6cXOMzbuDJmo87GmCoKUGREylUy0MXFO/DPIxKp1DAMQAZWCv5MMHwYKQ4LOp5thzjYT4bqJcBLdQcPj2UUak2ajgWgKKk31qAhFNs84Yx1nnGPGIzsck+OYXMdMdEyeYyY5ZrJjlkKgIsfsdEK7HbMHK1wz13XCDuRjGseYyuUJFiQ6fl3SXJ9kzK64IOHr83dDt5FpbJo72A+/+MTyH9QYx1xrGph4p944/L7KNDO/MS2dXKxyZh/cGuPSHqYJS8udmcPTszLTBid2zxw8IrFjWuaTacNMuFyQ4Pxg6+DcikIzHaeG44+EjHNz9Ar5aumL+bbJ21kK7o+/UZa92CnZ1vlsj9er7S2ee0Oe127tDs++99Pl5JgVDYS0w8Pp4j40o4MQWIJ2azvLxFMp8kFiK7El3R6Re6bVkTaTx8m1raPFTjw1U/7w7k8ejyO14+dsUVAwfL980TQs9kLqcZmXWUMa556Sl3+4Viy48uGTwlVS3OTB4MHhC9nS8IGvpM+GyWL/drlEjo2cLVe/vRqnzRVI+ry82eAFsX95zJM/rntZnn3/Z++57/PFvnVHmlfc5JCQZvQL+/rgu5S6fq+2a70ODzfzbdNDF7x5mTf7v/9TO6nes61vD+55SmpOaO/fe3ypUuiwT8G3zc/KlZI2vl2VFe0P69/aTyut5o+fc41vq/es59cL1fZJx82xvvvS1iNCYAn+nh3rv9ngICxUzbfUm0u/aLpNXphfj++ul6tuaqjHkWLFLAVnXp0Iper7dlD+cJHYOv6qrP5yaXl13/7Sord0mlrFJ1WlCJ77/pLQl5TSLnsxBx4qlfa/e1loYLfz0Q1CWWzlA8ex++fwkOPD02K/bV7dbxbeLNccqocTXhN7Ym8T/+5HnhVStT9BwfCasE49WGmDZ6nIU4WNPQSEVD5wTbL9aukhjSF6mdT8ik5YadwcD2FnXILOR9v57vS5mVIBKJpbL9RDgSVAsCEKBsl9x0vF1pwwVmXEy7Ll52jf/j37dTmwpJr/uFek1P2xeLcCO3bgJQW0M87z7Ts7avvpSV8K6VOFr4hLAI5xKShoAFp9/hdR0Yd8vVG4W58NH/LgTdK32qfw2utK1R8E6xvlyl23YgWlhx2EdHPRIlF1sGmgKagxG5BhtC6gcQnuPd5MXJq5Atwf/6ZYAjRgSPquHOm+W2ynqSv0sHqh55XanE1TFHy65DFJmXZA7PJtXRENByB9U6z6ROyQry96zAjUeW/vuf3iEjA8LFLK6xEfBxvWkgEz43w7xv+djEqI9yX2fonqEe/bKyVPQ414//mOU5Xaxbe/q4BhyjBHeJyV/d1cf8ptxsd+Yl/+oZL/xtli5Goln/52CaBmoCcoytXF7IEIv/R8OyqhpQI8BC1NsohypF0p64h3162Tg+KCBGUsJdM2+uBCal9UmzEeTW4/fLLQm1R7vjwxqy4kWcyakiI8OarHdKUuQ6ICPPf9aEFsTFNgaTaCSbV7yZ8HZwQl642zf4TVO8jC+jcFD450j9MVaxb84OkrZ17d5nEPUoTIiwoy+i3Dqs88e2n5Ktjze+9KyToIES/WMZvUsXRn8pfdxT02skRGnGxOWffpO0x31ZeJSANwM9AkOy/zOYD0/HKbmYX/njsb76ziu7t33SUVYMptC8Xts+FOBZYgCONR+LsoljWRbq61crtSd15m8T9BpXEfi/veTwUKUDpeUsDCOrTGliC6v22+ClGQKXU+m/7fovsHSJizqUh/uAQqGGtOBQAnYIEiIBCfyb+0OCwuQcWiClDBIjAOQ1srH41MgJzERom+pQhfNG2OiJ7jXd/7puABazJXpK6T4JVWn3fyuQeppbMJWD11BVsJXyHVPQi4KVfoKXyFx3IP0v8sZyo5PVEB6Al3/JyOCtDlOsrzHXfC9b2QKF+LXbNgKILX9RmzHz8d41sWHxat9Y0+UOq2Q/UjYENS0GdDDNQyQTl7646jKBK1kYY4hgCSBFUMNADcEbF6SB58dCPCcg9cimLFkGT9+P/ljFFJej51yX9zeFGUcT46N0vSk/oUqrkI9p5LheN6F9otP7egooXrG0UJHha6BDimQDktVy8owFM0iiUFmF/GMlMLOBaQ2lt+u0YBQ/VI92kFNmbFYfSnhwoy+p1gRctHszmDvChNImXzdgk4KLiHL/wqnzw9QEsGun4jNNgzyO1iDx3rmKSV3uMhALlJsuWkMLTGhI3D+s9UavkeAbs+aLKFIzFL1PFQWj3kj6eRhdaJapXuocmJZcdj4SRFKotL8LfLswMOT8CmiIxdYl+YP99jF0MTQnSeFyR5DRSIKJ/FJs6t7OvUdfcj1XxOLqT2u5R1CtJK9wb97puLJ7UBfpdyHk3+hNjzqRYx8SEMaREOaDvse2yeCiC/78IIfgWAgz1LgN5dgBbgt1u7o4B6+lCnsMnbP2L72wot2w7dWe5f3hXeQD6EadcCBVxyQ15tUefQ9PCH1Fp5B2PntJZV0se9KYyd04iF+QFnYf23EJVfoZQXBJHJjWggpLpYzmecRBrnvqHUSuxcBRjnED77uUemBjHiQWgf7X0jTi4T0ut6zwgecBVXEGuefXPxOt0D7gw2pQ7lShlHs3l23Rwk6NR8yypNAJV06kX6jUC7+cwj5TTiEtBqLofbCsAWpePu4tt/j6o7ChX4qqBbNws7WgRItZ8SzK67VThDa0P4LqUNRuZ9ajmXQHedeKp64DwCJJ1xGcagAeg0dbC4q7K+UYAR9BvVj/ZChHuIsGI+0KkX/k22fx78qipWa2WeUrdcZfMRPjQw0dHX8uHjMQroTiQC+1EN+jcZO3tYHiQCfzARNhddHYQ75zVSDqmaCJwYlcO5holgb9geJMLmoqNI3KPektt/EXtsZAJ2j0Ig3wlhkAisCBxBT+xdrNQiShUwf1gCLZPgoRkuBr9YP849Jfb1szU0TT46V9NniLmciwgg6sfSpcr70qL1DvSuPWJZCtlTuDupZf0l4HhJy9uMfv0QytsRtL1wa3gnCCnUKg0n6B88gEIomj15QRLb8IFHMUsn6p0EDhOk0DS5vPysR6OS4sayRsHhC4XwfIhxUcTslmH99yEjmop9YtanmCHbob0cxBTXg90vAVeIHmJ7tU3A+F0NZ1f2ET2eZdtAcHkjT55AWtRMtqzadBmPIzU/waEYrPSH7VJlvAI2JeiRZJm56IoYqo57kFTnGY8OgVL/rGzUjpSJow5lqVTOgJkRDi17F+F/3MMliyavJaj3fs6mLsgxOJSWpf9oclKb/OVHClgRRpzEbYX/sMktrF/VR6aJ3d61js9ZipTjkEswYOYQccHG+WWgw8NLxeU1R0FJt2OYtWYwCY+hYr6Gu+Ih7WOWQ/DuXbtk56IPYNtPBDe696DblxoFpOowAk6GugKFD67chQ2745qznreA9hB2GeKkvby2DVFAgAxAWN0t+NIhliXnr6/U19xnYdFNaRZ6ghT3knwFdP7QGlYslMC9NQFF+wuMYy3FHZSf4BNgoqzO6Rr37WiU61mePT36ijqNd171YrnTuTupOQmnU3/EaD6G8msVIHl0krY4D4m3CDYrTdZ6yGMIbNUbb0btrIoLTzdesT3LwRMiqsNJ4Z9lCgblr0WJ+trDZltUAVI0FNEH27veikK2Dla+XTB1vYmifi9Saib88KC4B3GJplG1nCB6cKMv9NSQLLJ0BCmm6uAB1WSdYbOzyG0MeWGf9ZJZgJqZwuxBjE1RqkMNAV3f8IGQbzcXOXo9Z51gqUVLzEfmbRXLixoTfVTCSkh2SLB0EVIw+JJACtmHKGBvb7kafYiu/k3eJ+p73ij0AeTncKMqo7ZmSNUbV+seaxagAvGWSRtgutqPDvmqjiJppSiJvJ//4d1haOFhXPGbBQ8giLf0scvsUp4dnXAatitJppRagVmG6Mxy75qtaFic7uDMjfo1gIBCweTB5AIzeXQVjvY4StB+FBXfPuAMArjdR7wNh9xlAC+L7hZ8+clh+xDLtkpf00WkLtOiAvBgt1wU4+DfJM4ELgHk8HVRBahgEZgJuBPTC4xehPNkBSy7KKpJrDSQqCSZVzCdXOAnTFcl3uXlj3stVzcMahEjgXTnolwaPaJKTZ+7EiX3cWTQDsFHjiWc3TS+t3c9p58wEKhR+sUEtvJRkKdoUaJApIjTYgWsUrqCy/m3ZkFVX/fg1xpuevhCI45S7ANNsXwlIrApPgfNFJeAkimHoqYnNfZVdt4iqAy/nKh2jAI8SGacqP4MHBqEApEGtkIJ8CzvjgSsVBBNLFsjdBZGDl4W3BB+0SQjRcQED9geuGKM/45YeEHbHM7E17Zisbx3oKtrXpDqpZEAMRmsYF7wFdpM92Aj5KakegoBj+UKlYOjCQXjVKCScvqi6DyF1Jh/AA==(/figma)--&gt;"></span><strong>Thank you for your order.</strong></div></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 50px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
        <div><span style="color: #000000; line-height: 19.6px;">Dear yasiriq</span></div>
    <p style="line-height: 140%;">Welcome To Scotland!</p>
    <div>
    <p style="color: #222222; white-space: normal; background-color: #ffffff; line-height: 140%;">Thank you for your order. We are pleased to provide you with the following link to download your Digital Pack;</p>
    </div>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_button_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
    <div class="v-text-align" align="center">
      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://unlayer.com" style="height:37px; v-text-anchor:middle; width:264px;" arcsize="11%"  strokecolor="#000000" strokeweight="1px" fillcolor="#ffffff"><w:anchorlock/><center style="color:#000000;"><![endif]-->
        <a href="https://unlayer.com" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #ffffff; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-color: #000000; border-top-style: solid; border-top-width: 1px; border-left-color: #000000; border-left-style: solid; border-left-width: 1px; border-right-color: #000000; border-right-style: solid; border-right-width: 1px; border-bottom-color: #000000; border-bottom-style: solid; border-bottom-width: 1px;font-size: 14px;">
          <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">DOWNLOAD YOUR DIGITAL PACK</span></span>
        </a>
        <!--[if mso]></center></v:roundrect><![endif]-->
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="299" class="v-col-border" style="background-color: #f4fcfa;width: 299px;padding: 0px;border-top: 1px solid #CCC;border-left: 1px solid #CCC;border-right: 0px solid transparent;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_5" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="background-color: #f4fcfa;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 1px solid #CCC;border-left: 1px solid #CCC;border-right: 0px solid transparent;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 0px 25px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="line-height: 140%;"><span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiWGN2ekhNbGxLZWpqS2twMTFKM0xkQSIsInBhc3RlSUQiOjExOTM3OTk3MzAsImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;" style="line-height: 19.6px;"></span>Here is a link to our Scotland Titles Booklet with lots of information about your new land and title, and some Scottish traditions to help our new Lairds, plus links to download the map and tree planting certificate;</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
    <div class="v-text-align" align="left">
      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37px; v-text-anchor:middle; width:110px;" arcsize="11%"  stroke="f" fillcolor="#3AAEE0"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
        <a href="" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3AAEE0; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
          <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">Button Text</span></span>
        </a>
        <!--[if mso]></center></v:roundrect><![endif]-->
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="299" class="v-col-border" style="background-color: #f4fcfa;width: 299px;padding: 0px;border-top: 1px solid #CCC;border-left: 0px solid transparent;border-right: 1px solid #CCC;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_6" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="background-color: #f4fcfa;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 1px solid #CCC;border-left: 0px solid transparent;border-right: 1px solid #CCC;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_image_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 0px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="images/image-6.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 75%;max-width: 210px;" width="210" class="v-src-width v-src-max-width"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 15px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="299" class="v-col-border" style="background-color: #f4fcfa;width: 299px;padding: 0px;border-top: 1px solid #CCC;border-left: 1px solid #CCC;border-right: 0px solid transparent;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_7" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="background-color: #f4fcfa;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 1px solid #CCC;border-left: 1px solid #CCC;border-right: 0px solid transparent;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 0px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="images/image-6.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 75%;max-width: 210px;" width="210" class="v-src-width v-src-max-width"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="299" class="v-col-border" style="background-color: #f4fcfa;width: 299px;padding: 0px;border-top: 1px solid #CCC;border-left: 0px solid transparent;border-right: 1px solid #CCC;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_8" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="background-color: #f4fcfa;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 1px solid #CCC;border-left: 0px solid transparent;border-right: 1px solid #CCC;border-bottom: 1px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_text_4" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:100px 25px 0px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="line-height: 140%;"><span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiWGN2ekhNbGxLZWpqS2twMTFKM0xkQSIsInBhc3RlSUQiOjExOTM3OTk3MzAsImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;" style="line-height: 19.6px;"></span><span data-buffer="&lt;!--(figma)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(/figma)--&gt;" style="line-height: 19.6px;"></span>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum been the industry's standard dummy text ever since the 1500s.</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_5" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 25px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 20px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="line-height: 140%;"><strong>Jacob Smith</strong></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_social_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <div align="center">
      <div style="display: table; max-width:167px;">
      <!--[if (mso)|(IE)]><table width="167" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:167px;"><tr><![endif]-->
      
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://www.facebook.com/unlayer" title="Facebook" target="_blank">
              <img src="images/image-1.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://www.linkedin.com/company/unlayer/mycompany/" title="LinkedIn" target="_blank">
              <img src="images/image-2.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://www.instagram.com/unlayer_official/" title="Instagram" target="_blank">
              <img src="images/image-3.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://twitter.com/unlayerapp" title="X" target="_blank">
              <img src="images/image-4.png" alt="X" title="X" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_6" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 30px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 170%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 170%;">UNSUBSCRIBE   |   PRIVACY POLICY   |   WEB</p>
    <p style="font-size: 14px; line-height: 170%;"> </p>
    <p style="font-size: 14px; line-height: 170%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_image_5" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="images/image-5.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 149px;" width="149" class="v-src-width v-src-max-width"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>
    
    `;

    // const emailTemplate = `
    // <!DOCTYPE html>
    // <html>

    // <head>
    //     <style>
    //         body {
    //             font-family: Arial, sans-serif;
    //             background-color: #f4f4f4;
    //             margin: 0;
    //             padding: 0;
    //         }

    //         .container {
    //             max-width: 600px;
    //             margin: 0 auto;
    //             padding: 20px;
    //             background-color: #ffffff;
    //         }

    //         .header {
    //             < !-- background-color: #007bff;
    //             -->color: #ffffff;
    //             padding: 10px;
    //             < !-- width: 100px --> < !-- text-align: center;
    //             -->
    //         }

    //         .content {
    //             padding-top: 10px;
    //         }

    //         .headerText {
    //             font-size: 20px;
    //             < !-- font-style: bold --> color:#000000
    //         }

    //         .welcomeText {
    //             font-weight: bold
    //         }

    //         .dentText {
    //             color: #000000 font-weight: bold;
    //             font-size: 16px;

    //         }

    //         .heading {
    //             color: #d6d3cc;
    //             font-weight: bold;
    //         }

    //         .staticUrls a {
    //             display: flex;
    //             flex-direction: column;
    //             padding-top: 20px
    //         }
    //                 .footerTexts a {
    //             display: flex;
    //             flex-direction: column;
    //             padding-top: 15px
    //         }

    //         .rowClass {
    //             display: flex;
    //             flex-direction: row;
    //         }

    //         .footer {
    //             justify-content: center
    //         }

    //         .footerText {
    //             font-size: 14px;
    //         }

    //         .left {
    //             padding-left: 3px
    //         }
    //         .logo{
    //           width:100px;
    //           height:100px
    //         }
    //     </style>
    // </head>

    // <body>
    //     <div class="container">
    //         <div class="header">

    //                 <span class="dentText" style="color:#000000">Dear ${name}</span>

    //         </div>
    //         <p class="welcomeText">
    //             Welcome To Scotland!</span></p>
    //         <div class="content">
    //             <p class="footerText" style="font-size:16px;">
    //                 Thank you for your order. We are pleased to provide you with the following link to download your Digital Pack;

    //             <p>
    //                 <a href="https://scotlandtitlesapp.com/pdfs/${order_no}.pdf" download target="_blank" rel="noreferrer">
    //                 Digital Pack ${order_no} ${name}
    //                 </a>

    //             <p style="font-size:16px">Here is a link to our Scotland Titles Booklet with lots of information about your new land and title, and some Scottish traditions to help our new Lairds, plus links to download the map and tree planting certificate;</p>
    //             <br/>

    //             <div>
    //                 <a href="https://scotlandtitlesapp.com/pdfs/BookletMay2021.pdf" download target="_blank" rel="noreferrer" style="padding-top: 20px">
    //                 Scotland Titles Booklet
    //                 </a>
    //                 <br/>
    //                 <br/>
    //                 <a href="https://scotlandtitlesapp.com/pdfs/ScotlandTitlesMap.pdf" download target="_blank" rel="noreferrer" style="padding-top: 20px">
    //                 Scotland Titles Heritage Map
    //                 </a>
    //                 <br/>

    //                 <br/>

    //                 <a href="https://scotlandtitlesapp.com/pdfs/TreePlantingCertificate.pdf" download target="_blank" rel="noreferrer" style="padding-top: 20px">
    //                 Certificate of Tree Planting
    //                 </a>

    //                 <br/>

    //             </div>

    //             <p style="font-size:16px">If your order included a Printed Pack, then it will be dispatched shortly. Please note that during the current busy period it is possible that shipping may take longer than usual due to carrier circumstances out with our control.

    //             </p>

    //             <p style="font-size:16px">We ask that you check your documents carefully, and if there are any issues with the details contained within then please let us know by replying to this email and we will swiftly emend accordingly and re-issue to you.

    //             </p>
    //             <div>
    //                 <p style="font-size:16px,   display:flex;
    //               flex-direction:row;" class="rowClass">If you require any further assistance, then please email us at <a style="padding-left:3px" class="left" href="https://scotlandtitlesapp.com/pdfs/${order_no}.pdf" download target="_blank" rel="noreferrer"> info@scotlandtitles.com</a>

    //                 </p>

    //             </div>

    //             <p style="font-size:16px">
    //                 Thank you once again for your order.

    //             </p>
    //             <p style="font-size:16px">
    //                 Kind regards

    //             </p>
    //             <p style="font-size:16px">
    //                 Scotland Titles

    //             </p>

    //             <img src="${server}/images/scotland_log.png" alt="Scotland Logo" width="130px" height: "130px" class="logo" style="width: 100px; height: 100px;"/>

    //         </div>

    //         <footer>
    //             <div class="rowClass footerTexts">
    //                 <p>Website:</p><a  style="padding-left:3px" class="left" href="www.ScotlandTitles.com" target="_blank">www.ScotlandTitles.com</a>
    //             </div>

    //           <div class="rowClass footerTexts">
    //                 <p>Facebook:</p><a style="padding-left:3px" class="left" href="www.ScotlandTitles.com" target="_blank">fb.me/ScotlandTitles</a>
    //             </div>

    //           <div class="rowClass footerTexts">
    //                 <p>Email:</p><a style="padding-left:3px" class="left" href="www.ScotlandTitles.com" target="_blank">info@ScotlandTitles.com</a>
    //             </div>
    //         </footer>
    //     </div>
    // </body>

    // </html>
    // `;

    await sendMail({
      to: email,
      from: "alifr849@gmail.com",
      subject: `Scotland Order Email`,
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
