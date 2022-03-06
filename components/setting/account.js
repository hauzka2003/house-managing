import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";
import AvatarUser from "../icons/avatar";
import { useUser } from "../../store/user";
import { useEffect, useState } from "react";
import { useErrorModal } from "../../store/error_modal";
import { supabase } from "../../utils/supabase";

function AccountTab({ loginName }) {
  const { settingTabState } = useLayout();
  const { user } = useUser();
  const { setError } = useErrorModal();
  const [avatar, setAvatar] = useState(null);

  const [name, setName] = useState({ userName: user?.user_metadata?.userName });

  const [phone_number, setPhoneNumber] = useState({
    phone: user?.user_metadata?.phone,
  });
  const [first_name, setFirstName] = useState({
    firstName: user?.user_metadata?.firstName,
  });
  const [last_name, setLastName] = useState({
    lastName: user?.user_metadata?.lastName,
  });
  const [signature, setSignature] = useState({
    signature: user?.user_metadata?.signature,
  });
  const [email, setEmail] = useState({ email: user?.email });

  const [enteredName, setEnteredName] = useState(user?.user_metadata?.userName);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState(
    user?.user_metadata?.phone
  );
  const [enteredFirstName, setEnteredFirstName] = useState(
    user?.user_metadata?.firstName
  );
  const [enteredLastName, setEnteredLastName] = useState(
    user?.user_metadata?.lastName
  );
  const [enteredSignature, setEnteredSignature] = useState(
    user?.user_metadata?.signature
  );

  async function updateUser(input, type) {
    if (type === "signature" && input?.signature === enteredSignature) {
      return;
    }
    if (type === "userName" && input?.userName === enteredName) {
      return;
    }
    if (type === "phone" && input?.phone === enteredPhoneNumber) {
      return;
    }
    if (type === "firstName" && input?.firstName === enteredFirstName) {
      return;
    }
    if (type === "lastName" && input?.lastName === enteredLastName) {
      return;
    }
    const { error } = await supabase.auth.update({
      data: { ...input },
    });
    if (error) {
      return setError(error);
    }

    if (type === "signature") {
      setEnteredSignature(input.signature);
    }
    if (type === "userName") {
      setEnteredName(input.userName);
    }
    if (type === "phone") {
      setEnteredPhoneNumber(input.phone);
    }
    if (type === "firstName") {
      setEnteredFirstName(input.firstName);
    }
    if (type === "lastName") {
      setEnteredLastName(input.lastName);
    }
    return setError({
      message: `update ${type} successfully`,
      type: "success",
    });
  }

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
              updateUser(signature, "signature");
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
              onBlur={() => updateUser(first_name, "firstName")}
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
              onBlur={() => updateUser(last_name, "lastName")}
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
              value={email?.email ?? ""}
              className={styles.normal_input}
              placeholder={"Your Email"}
              disabled
            />
          </div>
          <div className={styles.last_name}>
            <div className={styles.signature}>Phone Number</div>
            <input
              onBlur={() => updateUser(phone_number, "phone")}
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
            <div className={styles.signature}>Display name</div>
            <input
              onBlur={() => updateUser(name, "userName")}
              type="text"
              className={styles.normal_input}
              placeholder={"Your Display Name"}
              onChange={(e) => {
                setName({ userName: e.target.value });
              }}
              value={name?.userName ?? ""}
            />
          </div>
          <div className={styles.last_name}>
            <div className={styles.signature}>UserName</div>
            <input
              type="text"
              className={styles.number_input}
              placeholder={"Your UserName"}
              disabled
              value={loginName ?? "loading"}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AccountTab;
