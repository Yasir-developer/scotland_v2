import axios from "axios";

export default async function webhookHandler(req, res) {
  console.log(req.body, "request");
  // const { id, email, created_at, order_number } = req.body;
  axios
    .post("/api/order", { data: req.body })
    .then((response) => {
      return res.status(200).send({ message: "success" });
    })
    .catch((error) => {
      return res.status(200).send({ message: error.message });
    });
  //   return res.status(200).send({ message: "error" });
}
