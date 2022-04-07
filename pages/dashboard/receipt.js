import { useUser } from "../../store/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLayout } from "../../store/layout";
import { motion } from "framer-motion";
import LoggedLayout from "../../components/layout/logged-layout";

function ReceiptPage() {
  const { user } = useUser();
  const router = useRouter();
  const { navClosed } = useLayout();
  useEffect(() => {
    if (!user) {
      router.push("/log-in");
    }
  }, [user]);
  return (
    <motion.div
      animate={!navClosed ? { marginLeft: "300px" } : { marginLeft: "120px" }}
    >
      {/* receipt */}
    </motion.div>
  );
}

ReceiptPage.getLayout = LoggedLayout;

export default ReceiptPage;
