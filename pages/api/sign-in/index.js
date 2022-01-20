import { supabase } from "../../../utils/supabase";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).send({ message: "Invalid Email", localStatus: 1 });
    }
    if (!password || password.length <= 6 || password.trim() === "") {
      return res
        .status(400)
        .send({ message: "Invalid Password", localStatus: 2 });
    }
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (error) {
      return res.send({ message: "fail to login in", error: error });
    }
    res.send({ message: "Successfully sign in", user });
  }
}
