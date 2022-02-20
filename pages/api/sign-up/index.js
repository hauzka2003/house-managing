import { supabase } from "../../../utils/supabase";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, userName } = req.body;
    console.log(email, password, userName);
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
    const { data, error: firstError } = await supabase
      .from("profile")
      .select("username")
      .match({ username: userName });
    if (firstError) {
      return res.status(400).send({
        message: "Fail to connect to server",
        localStatus: 4,
        error: firstError,
      });
    }
    if (data.length > 0) {
      return res
        .status(200)
        .send({ message: "Username already existed", localStatus: 1 });
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
    console.log("user ID: ", user.id);
    const { error: UNerror } = await supabase
      .from("profile")
      .update({
        username: userName,
      })
      .eq("id", user.id);
    if (UNerror?.length === 0) {
      return res.status(200).send({
        message: "Email already existed",
        localStatus: 5,
      });
    }

    if (UNerror) {
      return res.status(400).send({
        message: "Fail to connect to server",
        localStatus: 6,
        error: UNerror,
      });
    }
    res
      .status(200)
      .send({ message: "sign up successfully", localStatus: 4, user: user });
  }
}
