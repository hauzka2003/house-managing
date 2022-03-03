import { supabase } from "../../../utils/supabase";
import cookie from "cookie";

async function updateUser(input) {
  await supabase.from("AI_profile").update(input).eq("id", user.id);
}

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
        .select("*")
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
    console.log(data.data.signature);
    return res.status(200).send({
      message: "Success",
      userName: data.data.username,
      email: data.data.email,
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      phone: data.data.phone,
      signature: data.data.signature,
    });
  }
  if (req.method === "POST") {
    console.log(req.body);
    let data;
    try {
      await supabase
        .from("profile")
        .update(req.body)
        .eq("id", user.id)
        .single();
    } catch (error) {
      return res.status(400).send({
        message: "Fail to connect to server",
        error: error,
      });
    }
    res.status(200).send({ message: "Success" });
  }
}
