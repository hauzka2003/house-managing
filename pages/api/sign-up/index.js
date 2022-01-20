import { supabase } from "../../../utils/supabase";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, userName } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid Email", localStatus: 1 });
    }
    if (!password || password.length <= 6 || password.trim() === "") {
      return res
        .status(400)
        .json({ message: "Invalid Password", localStatus: 2 });
    }
    if (!userName || userName.length <= 6 || userName.trim() === "") {
      return res
        .status(400)
        .json({ message: "Invalid user name", localStatus: 3 });
    }
    const { error, session, user } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
      },
      {
        data: {
          userName: userName,
        },
      }
    );
    if (error) {
      return res.status(400).send({
        message: "Fail to sign up to server",
        localStatus: 4,
        error: error,
      });
    }
    res
      .status(200)
      .send({ message: "sign up successfully", localStatus: 4, user: user });
  }
}
