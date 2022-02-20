import { supabase } from "../../../utils/supabase";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userName } = req.body;
    if (!userName || userName.trim() === "" || userName.length <= 6) {
      return res
        .status(400)
        .send({ message: "Invalid UserName", localStatus: 1 });
    }
    if (userName.includes("@")) {
      return res
        .status(400)
        .send({ message: "Already an email", localStatus: 2, email: userName });
    }
    const { data, error } = await supabase
      .from("profile")
      .select("email")
      .match({ username: userName });
    if (error) {
      return res
        .status(400)
        .send({ message: "Cannot connect to database", localStatus: 3 });
    }
    if (data.length === 0) {
      return res
        .status(200)
        .send({ message: "Unknown username", localStatus: 4 });
    }
    if (data.length > 0) {
      return res.status(200).send({
        message: "Username existed",
        localStatus: 5,
        email: data[0].email,
      });
    }
  }
}
