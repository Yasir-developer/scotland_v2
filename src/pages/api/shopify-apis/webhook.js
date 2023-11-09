import axios from "axios";
import { server } from "../../../../config";
export default function webhookHandler(req, res) {
  //   console.log(req.body, "request");
  // const { id, email, created_at, order_number } = req.body;
  //   await axios
  //     .get(`${server}/api/shopify-apis/order`, { data: req.body })
  //     .then((response) => {
  //       console.log("response");
  //       console.log(response);
  //       //   return res.status(200).send({ message: "success" });
  //     })
  //     .catch((error) => {
  //       console.log("error.message");
  //       console.log(error.message);
  //       return res.status(200).send({ message: error.message });
  //     });
  axios
    .get(`${server}/api/shopify-apis/order`, { data: req.body })
    .then((res) => {
      console.log(res, "------------------");
    });
  return res.status(200).send({ message: "Success" });
}
