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
    let data;

    try {
      data = await supabase.auth.api.updateUser(access_token, {
        password: req.body?.password,
      });
    } catch (error) {
      return res.status(400).send({
        message: "Fail to connect to server",
        error: error,
        data: data,
      });
    }
    res.status(200).send({ message: "Success", data: data });
  }
}
