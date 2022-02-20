import { useUser } from "../../store/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
function ReceiptPage() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/log-in");
    }
  }, [user]);
  return <div style={{ marginLeft: "300px" }}>receipt</div>;
}

export default ReceiptPage;
