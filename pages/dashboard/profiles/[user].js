import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoggedLayout from "../../../components/layout/logged-layout";
import { motion } from "framer-motion";
import { useLayout } from "../../../store/layout";
import UserBackground from "../../../components/profile/user-profile";
import { useUser } from "../../../store/user";
import { supabase } from "../../../utils/supabase";
function ProfilePage() {
  const router = useRouter();
  const { navClosed } = useLayout();
  const [user, setUser] = useState(null);

  const { user: username } = router.query;

  const { user: loggedUser } = useUser();

  useEffect(() => {
    if (!username) {
      return;
    }

    setUser(null);

    if (loggedUser?.user_metadata?.userName === username) {
      return setUser(loggedUser);
    }

    async function getUser() {
      await axios
        .get(`/api/user/${username}`)
        .then((res) => {
          if (res.data.message === "User not found") {
            return setUser("User not found");
          }

          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [username]);

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
      animate={!navClosed ? { marginLeft: "300px" } : { marginLeft: "120px" }}
    >
      <UserBackground user={user} />
    </motion.div>
  );
}

// export async function getServerSideProps(context) {
//   const { params, res } = context;

//   const { user } = await supabase.auth.api.getUserByCookie(context?.req);

//   if (!user) {
//     res.writeHead(302, {
//       Location: "/log-in",
//     });
//     res.end();
//     return { props: {} };
//   }

//   const { data, error } = await supabase
//     .from("profile")
//     .select("email,username,lastSeen,firstName,lastName,phone,signature,id")
//     .eq("username", params.user)
//     .single();

//   if (error) {
//     console.log(error);
//   }

//   return {
//     props: {
//       user: data ?? null,
//     },
//   };
// }

ProfilePage.getLayout = LoggedLayout;

export default ProfilePage;
