import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoggedLayout from "../../../components/layout/logged-layout";
import { motion } from "framer-motion";
import { useLayout } from "../../../store/layout";
import UserBackground from "../../../components/profile/user-profile";
function ProfilePage() {
  const router = useRouter();
  const { navClosed } = useLayout();
  const [user, setUser] = useState(null);

  const { user: username } = router.query;

  useEffect(() => {
    if (!username) {
      return;
    }

    async function getUser() {
      await axios
        .get(`/api/user/${username}`)
        .then((res) => {
          setUser(res?.data?.data);
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

ProfilePage.getLayout = LoggedLayout;

export default ProfilePage;
