import { supabase } from "../../../utils/supabase";
import cookie from "cookie";

export default async function handler(req, res) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const { access_token } = req.query;

  if (!user) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const token = cookie.parse(req.headers.cookie)["sb:token"];
  supabase.auth.session = () => ({
    access_token: token,
  });

  if (req.method === "POST") {
    //check if password has at least 8 characters and at least one capital letter
    const password = req.body?.password;

    if (password.length < 8 || !password.match(/[A-Z]/)) {
      return res.status(400).send({
        message: "Password must be at least 8 characters",
      });
    }

    if (!password.match(/[A-Z]/)) {
      return res.status(400).send({
        message: "Password must be at least one capital letter",
      });
    }

    let data;

    try {
      data = await supabase.auth.api.updateUser(access_token, {
        password: req.body?.password,
      });
    } catch (error) {
      return res.status(400).send({
        message: "Fail to connect to server",
        error: error,
      });
    }
    if (data) {
      res.status(201).send({ message: "Success" });
    }
  }
}
