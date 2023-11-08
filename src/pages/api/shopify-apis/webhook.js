import axios from "axios";
import { server } from "../../../../config";
export default async function webhookHandler(req, res) {
  console.log(req.body, "request");
  // const { id, email, created_at, order_number } = req.body;
  axios
    .post(`${server}/api/order`, { data: req.body })
    .then((response) => {
      return res.status(200).send({ message: "success" });
    })
    .catch((error) => {
      return res.status(200).send({ message: error.message });
    });
  //   return res.status(200).send({ message: "error" });
}
