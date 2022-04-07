import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoggedLayout from "../../../components/layout/logged-layout";

function ProfilePage() {
  const router = useRouter();

  const { user } = router.query;

  useEffect(() => {
    if (!user) {
      return;
    }

    async function getUser() {
      await axios
        .get(`/api/user/${user}`)
        .then((res) => {
          console.log(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [user]);

  return <div></div>;
}

ProfilePage.getLayout = LoggedLayout;

export default ProfilePage;
