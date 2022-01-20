import { supabase } from "../../utils/supabase";
import { useRouter } from "next/router";
function LogOutPage() {
  const { error } = supabase.auth.signOut();
  const router = useRouter();
  router.push({ pathname: "/" });
  return <div>Logging out</div>;
}

export default LogOutPage;
