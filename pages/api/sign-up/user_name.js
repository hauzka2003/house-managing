import { supabase } from "../../../utils/supabase";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userName } = req.body;
    console.log(userName);
    const { data, error, status } = await supabase
      .from("profile")
      .select("username")
      .match({ username: userName });
    if (error) {
      return res.status(400).send({
        message: "Fail to connect to server",
        localStatus: 4,
        error: error,
        status: status,
      });
    }
    if (data.length > 0) {
      return res
        .status(200)
        .send({ message: "Username already existed", localStatus: 1 });
    }
    return res
      .status(200)
      .send({ message: "Username available", localStatus: 2 });
  }
}
