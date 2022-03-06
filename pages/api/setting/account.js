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
    let data;
    try {
      data = await supabase
        .from("profile")
        .select("username")
        .eq("id", user.id)
        .single();
    } catch (error) {
      return res.status(400).send({
        message: "Fail to connect to server",
        error: error,
      });
    }
    if (data.error) {
      return res.status(400).send({
        message: "Fail to connect to server",
        error: data.error,
      });
    }
    console.log(data.data);
    return res.status(200).send({
      message: "Success",
      data: data.data?.username,
    });
  }
  if (req.method === "POST") {
    console.log(req.body);
    let data;
    try {
      data = await supabase.auth.api.updateUserById({
        uid: `${user.id}`,
        attributes: { user_metadata: req.body },
      });
    } catch (error) {
      return res.status(400).send({
        message: "Fail to connect to server",
        error: error,
      });
    }
    res.status(200).send({ message: "Success" });
  }
}
