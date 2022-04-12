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

  const { userID } = req.body;
  if (!userID) {
    return res.status(400).send({
      message: "Missing user id",
    });
  }

  const { data } = await supabase
    .from("friendRequest")
    .select("id")
    .match({
      sender: user.id,
      receiver: userID,
    })
    .single();

  if (data) {
    return res.status(400).send({
      message: "Already sent a friend request",
    });
  }

  const { error } = await supabase.from("friendRequest").upsert({
    sender: user.id,
    receiver: userID,
    status: "pending",
    type: "friend",
  });

  if (error) {
    console.log("error", error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
  return res.status(200).send({
    message: "Success",
  });
}
