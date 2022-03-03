import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";
import AvatarUser from "../icons/avatar";
import { useUser } from "../../store/user";
import { useEffect, useState } from "react";

function AccountTab() {
  const { settingTabState } = useLayout();
  const { user } = useUser();
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState({ userName: null });
  const [phone_number, setPhoneNumber] = useState({
    phone: null,
  });
  const [first_name, setFirstName] = useState({
    firstName: null,
  });
  const [last_name, setLastName] = useState({
    lastName: null,
  });
  const [signature, setSignature] = useState({
    signature: null,
  });
  // const enteredUserName;
  // const enteredPhoneNumber;
  // const enteredFirstName;
  // const enteredLastName;
  // const enteredSignature;

  async function updateUser(input) {
    const response = await fetch("/api/setting/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    console.log("updatedData: ", data);
    if (data.status === 200) {
      return alert("Update success!");
    }
  }

  async function getUserData() {
    const response = await fetch("/api/setting/account", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    });

    if (response.status === 400) {
      console.log("error");
    }

    if (response.status === 200) {
      response.json().then((data) => {
        console.log("data", data);
        setName({ userName: data.userName });
        setPhoneNumber({ phone: data.phone });
        setFirstName({ firstName: data.firstName });
        setLastName({ lastName: data.lastName });
        setSignature({ signature: data.signature });
      });
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <motion.div
      className={styles.tab_information}
      initial={
        settingTabState.previousTab >= 0
          ? { x: 200, transition: { stiffness: 10 }, opacity: 0 }
          : { x: -200, transition: { stiffness: 10 }, opacity: 0 }
      }
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 200, transition: { duration: 0.3 }, opacity: 0 }}
    >
      <div className={styles.personal_pro}>
        <div className={{ width: "150px", height: "150px" }}>
          <AvatarUser
            style={{
              width: "150px",
              height: "150px",
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px,rgba(0, 0, 0, 0.22) 0px 15px 12px",
            }}
          />
        </div>
        <div className={styles.personal_pro_info}>
          <div className={styles.personal_name}>
            <span>{last_name.lastName ?? ""}</span>
            <span> </span>
            <span>{first_name.firstName ?? ""}</span>
          </div>
          <div className={styles.user_name}>{name?.userName}</div>
        </div>
        <div className={styles.signature_container}>
          <div className={styles.signature}>Signature</div>
          <textarea
            onBlur={() => {
              updateUser(signature);
            }}
            onChange={(e) => {
              setSignature({ signature: e.target.value });
            }}
            className={styles.biography}
            maxLength="150"
            placeholder={"Begin with introducing yourself"}
            value={signature?.signature ?? ""}
          />
        </div>
      </div>

      <div className={styles.detail_profile}>
        <div className={styles.personal_name_input}>
          <div className={styles.first_name}>
            <div className={styles.signature}>First Name</div>
            <input
              onBlur={() => updateUser(first_name)}
              className={styles.normal_input}
              placeholder={"First name"}
              onChange={(e) => {
                setFirstName({ firstName: e.target.value });
              }}
              value={first_name?.firstName ?? ""}
            />
          </div>
          <div className={styles.last_name}>
            <div className={styles.signature}>Last Name</div>
            <input
              onBlur={() => updateUser(last_name)}
              className={styles.normal_input}
              placeholder={"Last name"}
              onChange={(e) => {
                setLastName({ lastName: e.target.value });
              }}
              value={last_name?.lastName ?? ""}
            />
          </div>
        </div>
        <div className={styles.personal_name_input}>
          <div className={styles.first_name}>
            <div className={styles.signature}>Email</div>
            <input
              type="email"
              className={styles.normal_input}
              placeholder={"Your Email"}
              disabled
            />
          </div>
          <div className={styles.last_name}>
            <div className={styles.signature}>Phone Number</div>
            <input
              onBlur={() => updateUser(phone_number)}
              type="number"
              className={styles.number_input}
              placeholder={"Your phone number"}
              onChange={(e) => {
                setPhoneNumber({ phone: e.target.value });
              }}
              value={phone_number?.phone ?? ""}
            />
          </div>
        </div>
        <div className={styles.personal_name_input}>
          <div className={styles.first_name}>
            <div className={styles.signature}>UserName</div>
            <input
              onBlur={() => updateUser(name)}
              type="text"
              className={styles.normal_input}
              placeholder={"Your Username"}
              onChange={(e) => {
                setName({ userName: e.target.value });
              }}
              value={name?.userName ?? ""}
            />
          </div>
          <div className={styles.last_name}>
            <div className={styles.signature}>Coming Soon</div>
            <input
              type="text"
              className={styles.number_input}
              placeholder={"You can do nothing in here"}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AccountTab;
