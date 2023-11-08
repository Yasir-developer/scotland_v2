import axios from "axios";

export default async function webhookHandler(req, res) {
  console.log(req.body, "request");
  // const { id, email, created_at, order_number } = req.body;
  return res.status(200).send({ message: "error" });
}
