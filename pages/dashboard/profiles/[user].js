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

  const { user: userData } = useUser();

  useEffect(() => {
    if (!username) {
      return;
    }

    setUser(null);

    if (userData?.user_metadata?.userName === username) {
      return setUser(userData);
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
//   const { params } = context;
//   const username = params.user;
//   console.log(username);
//   const currentUser = supabase.auth.user();

//   async function setCookie() {
//     const res = await fetch("https://www.subsica.com/api/set-supabase-cookie", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         event: currentUser ? "SIGNED_IN" : "SIGNED_OUT",
//         session: supabase.auth.session(),
//       }),
//     });
//   }

//   await setCookie();

//   const response = await fetch(`https://www.subsica.com/api/user/${username}`);

//   const data = await response.json();

//   console.log(data?.data);

//   return {
//     props: {
//       user: data?.data ?? null,
//     },
//   };
// }

ProfilePage.getLayout = LoggedLayout;

export default ProfilePage;
