import { supabase } from "../../../utils/supabase";
import cookie from "cookie";

function getRowName(name) {
  if (name === "Using") {
    return "used_time";
  }
  if (name === "Used") {
    return "used_token";
  }
  if (name === "Ada") {
    return "ada";
  }
  if (name === "Babbage") {
    return "babbage";
  }
  if (name === "Curie") {
    return "curie";
  }
  if (name === "Davinci") {
    return "davinci";
  }
  if (name === "All Requests") {
    return "all_req";
  }
  if (name === "All Responses") {
    return "all_res";
  }
  return name;
}

export default async function handler(req, res) {
  const { id } = req.query;
  const rowName = getRowName(id);
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

  const { data, error } = await supabase
    .from("AI_profile")
    .select(rowName)
    .eq("id", user.id)
    .single();

  if (error) {
    return res.status(400).send({
      message: "Fail to connect to server",
      error: error,
    });
  }

  return res.status(200).json({ data: data[rowName] });
}
