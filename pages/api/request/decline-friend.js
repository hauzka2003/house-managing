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

  const { id } = req.body;

  if (!id) {
    return res.status(400).send({
      message: "Missing input",
    });
  }

  const { error } = await supabase.from("friendRequest").delete().eq("id", id);

  if (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }

  return res.status(200).send({
    message: "Success",
  });
}
