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
    const { username } = req.query;

    if (!username) {
      return res.status(400).send({
        message: "Missing input",
      });
    }
    let data;

    const { data: userData, error } = await supabase
      .from("profile")
      .select("email,username,lastSeen,firstName,lastName,phone,signature,id")
      .eq("username", username)
      .single();

    if (error) {
      return res.status(400).send({
        message: "Fail to connect to server",
        error: error,
      });
    }
    const { data: requested } = await supabase
      .from("friendRequest")
      .select("sender")
      .match({ sender: user?.id, receiver: userData?.id })
      .single();

    data = { ...userData, isRequested: requested?.sender === user.id };

    // if (!error2?.message) {
    //   return res.status(400).send({
    //     message: "Fail to connect to server",
    //     error: error2,
    //   });
    // }

    return res.status(200).send({
      message: "Success",
      data: data,
    });
  }
}
