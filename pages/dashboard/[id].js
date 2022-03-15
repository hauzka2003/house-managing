import { useRouter } from "next/router";

function CatchUrl() {
  const router = useRouter();
  const { query } = router;
  const access_token = query.access_token;
  console.log("access_token", access_token);
  return <div>{access_token}</div>;
}

export default CatchUrl;
