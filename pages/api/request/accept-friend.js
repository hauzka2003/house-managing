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

  const { receiver, sender, id } = req.body;

  if (!receiver || !sender) {
    return res.status(400).send({
      message: "Missing input",
    });
  }

  const { data, error } = await supabase
    .from("social")
    .select("friends")
    .eq("id", sender)
    .single();

  console.log("error", error);

  if (error) {
    return res.status(500).send({
      message: "Fail to connect to server",
      error: error,
    });
  }

  const { friends } = data;

  console.log("friends", friends);

  if (friends?.includes(receiver)) {
    return res.status(400).send({
      message: "Already friends",
    });
  }

  const { error: updaterror } = await supabase
    .from("social")
    .update({
      friends: friends ? [receiver, ...friends] : [receiver],
    })
    .eq("id", sender);

  console.log("updaterror2", updaterror);

  if (updaterror) {
    return res.status(500).send({
      message: "Fail to connect to server",
      error: updaterror,
    });
  }

  const { data: receiverData, error: error1 } = await supabase
    .from("social")
    .select("friends")
    .eq("id", receiver)
    .single();

  console.log("error1", error1);

  if (error1) {
    return res.status(500).send({
      message: "Fail to connect to server",
      error: error1,
    });
  }

  const { friends: receiverFriends } = receiverData;

  console.log("receiverFriends", receiverFriends);

  if (receiverFriends?.includes(sender)) {
    return res.status(400).send({
      message: "Already friends",
    });
  }

  const { error: receiverUpdaterror } = await supabase
    .from("social")
    .update({
      friends: receiverFriends ? [sender, ...receiverFriends] : [sender],
    })
    .eq("id", receiver);

  console.log("receiverUpdaterror", receiverUpdaterror);

  if (receiverUpdaterror) {
    return res.status(500).send({
      message: "Fail to connect to server",
      error: receiverUpdaterror,
    });
  }

  const { error: error2 } = await supabase
    .from("friendRequest")
    .delete()
    .eq("id", id);

  if (error2) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }

  return res.status(200).send({
    message: "Success",
  });
}
