import styles from "../../styles/change-password.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { MotionConfig } from "framer-motion";
import ChangePasswordContainer from "../../components/change-password/changepassword";

function ChangePasswordPage() {
  const router = useRouter();
  const [access_token, setAccess_token] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    let params;
    const str = router.asPath.split("#")[1];
    if (str) {
      params = new URLSearchParams(str);
      if (params.get("error_code") == 404) {
        router.push("/");
      } else {
        console.log("access granted");
      }
    }

    const access_token = params?.get("access_token");
    if (!access_token) {
      // router.push("/");
    } else {
      setAccess_token(access_token);
    }
  }, []);

  async function submitHandler() {
    let params;

    if (str) {
      params = new URLSearchParams(str);
      console.log("params", params.get("error_code"));
      if (params.get("error_code") == 404) {
        console.log("access denied");
      } else {
        console.log("access granted");
      }
    }

    const access_token = params.get("access_token");

    if (access_token) {
      await axios
        .post(`/api/password/${access_token}`, {
          password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className={styles.container}>
      <ChangePasswordContainer token={access_token} />
    </div>
  );
}

export default ChangePasswordPage;
