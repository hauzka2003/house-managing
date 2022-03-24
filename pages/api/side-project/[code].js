export default async function handler(req, res) {
  const { code } = req.query;

  if (req.method === "GET") {
    if (!code) {
      return res.status(401).send({
        message: "Unothorized",
      });
    }
    if (code !== "dfkju34n30u823nfjk") {
      return res.status(400).send({
        message: "Wrong code",
      });
    }
    return res.status(200).send({
      message: "Success",
    });
  }
}
