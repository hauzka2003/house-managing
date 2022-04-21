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

  if (req.method === "GET") {
    const { id } = req.query;
    const { data, error } = await supabase
      .from("profile")
      .select("username,id,email")
      .eq("id", id)
      .single();

    console.log("error", error);

    if (error) {
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }

    return res.status(200).send(data);
  }
}
