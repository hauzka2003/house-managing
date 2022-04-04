import { supabase } from "../../../utils/supabase";
import cookie from "cookie";

export default async function handler(req, res) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const token = cookie.parse(req.headers.cookie)["sb:token"];
  supabase.auth.session = () => ({
    access_token: token,
  });

  const today = new Date();
  const { error } = await supabase
    .from("profile")
    .update({ lastSeen: today })
    .eq("id", user.id);

  if (error) {
    return res.status(400).send({
      message: "Fail to connect to server",
      error: error,
    });
  }

  return res.status(200).send({
    message: "Success",
  });
}
