import styles from "../../styles/change-password.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function ChangePasswordPage() {
  const router = useRouter();
  const [access_token, setAccess_token] = useState();
  const [password, setPassword] = useState();

  async function submitHandler() {
    const str = router.asPath.split("#")[1];

    console.log(str);

    if (str) {
      const params = new URLSearchParams(str);
      console.log("params", params.get("error_code"));
      if (params.get("error_code") == 404) {
        console.log("access denied");
      } else {
        console.log("access granted");
        setAccess_token(params.get("access_token"));
      }
    }

    console.log("access_token", access_token);

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
      <div>
        <input
          type="text"
          placeholder="Your new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="text" placeholder="Confirm your new password" />
        <div onClick={submitHandler}>submit</div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
