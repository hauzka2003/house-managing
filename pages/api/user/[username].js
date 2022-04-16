import { supabase } from "../../../utils/supabase";
import cookie from "cookie";
import { data } from "autoprefixer";

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
    const { username } = req.query;

    if (!username) {
      return res.status(400).send({
        message: "Missing input",
      });
    }

    const { data, error } = await supabase
      .from("profile")
      .select("email,username,lastSeen,firstName,lastName,phone,signature,id")
      .eq("username", username)
      .single();

    if (
      error &&
      error?.details !==
        "Results contain 0 rows, application/vnd.pgrst.object+json requires 1 row"
    ) {
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }

    if (error) {
      return res.status(200).send({
        message: "User not found",
      });
    }

    return res.status(200).send({
      message: "Success",
      data: data,
    });
  }
}
