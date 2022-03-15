import styles from "../../styles/change-password.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function ChangePasswordPage() {
  const router = useRouter();
  const [access_token, setAccess_token] = useState();
  const [password, setPassword] = useState();

  function submitHandler() {
    const str = router.asPath.split("#")[1];

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

    if (access_token) {
      const response = axios.post(`/api/password/${access_token}`, {
        password,
      });
      const data = response.json();
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
