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

  const { friendID } = req.body;

  console.log(friendID);

  if (!friendID) {
    return res.status(400).send({
      message: "Missing Input",
    });
  }

  const { error } = await supabase.from("friends").delete().match({
    friendID: friendID,
    userID: user.id,
  });

  if (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }

  const { error: error2 } = await supabase.from("friends").delete().match({
    friendID: user.id,
    userID: friendID,
  });

  if (error2) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }

  return res.status(200).send({
    message: "Success",
  });
}
