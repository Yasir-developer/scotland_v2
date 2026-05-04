import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
import path from "path";
import fontkit from "@pdf-lib/fontkit";
import { server } from "../../../config";
import axios from "axios";
import { connectToDatabase } from "../../../db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ message: 'Order ID required' });
  }

  try {
    // Fetch order data from Shopify
    const db = await connectToDatabase();
    const configCollection = db.collection('config');
    const config = await configCollection.findOne({});
    const accessToken = config.accessToken;

    const shopifyResponse = await axios.get(
      `https://${process.env.SHOP_NAME}/admin/api/${process.env.SHOPIFY_API_VERSION}/orders/${orderId}.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      }
    );

    const order = shopifyResponse.data.order;

    // Now proceed with PDF generation using the order data
    // Copy the PDF generation logic from order.js, adapting to use order instead of req.body

    const titlePackId = 8727183196433;
    const emblemId = 8727183065361;
    const tartanId = 8727183032593;
    const freeTartanId = 8727182704913;
    const freeEmblemId = 8950348644625;

    const client = new ftp.Client();

    await client.access({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT || 21,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
    });

    const { id, email, created_at, order_number } = order;
    const { first_name, last_name } = order.customer;

    // PDF creation logic here - copy from order.js but use order data

    // ... (insert the entire PDF generation code from order.js, replacing req.body with order)

    // After generating PDFs, upload to FTP

    const pdfBytes = await pdfDoc.save();
    const pdfBytesPrinted = await pdfDocPrinted.save();

    const stream = Readable.from(pdfBytes);
    const streamPrinted = Readable.from(pdfBytesPrinted);

    await client.uploadFrom(stream, `/pdfs/${order_number}.pdf`);
    await client.uploadFrom(streamPrinted, `/pdfs/${order_number}-printed.pdf`);

    client.close();

    // Send email
    await axios.post(`${server}/api/user/email/orderEmail`, {
      email: process.env.ADMIN_EMAIL || email,
      name: first_name ? first_name : last_name,
      order_no: order_number,
    });

    // Mark as downloaded
    const ordersCollection = db.collection('orders');
    await ordersCollection.insertOne({ orderId: order_number.toString(), downloaded: true });

    res.status(200).json({ message: 'PDF generated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating PDF' });
  }
}