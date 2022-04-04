import { supabase } from "../../../utils/supabase";
import cookie from "cookie";

export default async function handler(req, res) {
  // const { user } = await supabase.auth.api.getUserByCookie(req);

  // if (!user) {
  //   return res.status(401).send({
  //     message: "Unauthorized",
  //   });
  // }

  // const token = cookie.parse(req.headers.cookie)["sb:token"];
  // supabase.auth.session = () => ({
  //   access_token: token,
  // });

  const { search_input } = req.query;

  if (req.method === "GET") {
    // const { data: firstname, error: error1 } = await supabase
    //   .from("profile")
    //   .select("email,username")
    //   .ilike("firstName", `%${search_input}%`)
    //   .limit(4);

    // if (error1) {
    //   return res.status(400).send({
    //     message: "Fail to connect to server",
    //     error: error1,
    //   });
    // }

    // const { data: lastname, error: error2 } = await supabase
    //   .from("profile")
    //   .select("email,username")
    //   .ilike("lastName", `%${search_input}%`)
    //   .limit(4);

    // if (error2) {
    //   return res.status(400).send({
    //     message: "Fail to connect to server",
    //     error: error2,
    //   });
    // }

    let userEmail = [];

    // if (search_input?.includes("@")) {
    const { data: email, error: error3 } = await supabase
      .from("profile")
      .select("email,username,lastSeen")
      .ilike("email", `%${search_input}%`)
      .limit(4);
    userEmail = email ?? [];

    if (error3) {
      console.log(error);
      return res.status(400).send({
        message: "Fail to connect to server",
        error: error,
      });
    }
    // }
    const { data, error } = await supabase
      .from("profile")
      .select("email,username,lastSeen")
      .ilike("username", `%${search_input}%`)
      .limit(4);

    if (error) {
      console.log(error);
      return res.status(400).send({
        message: "Fail to connect to server",
        error: error,
      });
    }

    const lastData = [...data, ...userEmail];

    //remove all duplicated user with the same email in array and keep only one user in lastData

    const uniqueData = lastData.filter((user, index) => {
      const email = user?.email;
      const emailIndex = lastData.findIndex((user) => user?.email === email);
      if (emailIndex === index) {
        return true;
      }
      return false;
    });

    if (uniqueData) {
      return res.status(200).send({
        message: "Success",
        data: uniqueData,
      });
    }
  }
}
