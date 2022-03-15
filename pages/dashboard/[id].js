import { useRouter } from "next/router";

function CatchUrl() {
  const router = useRouter();
  //detect data from url after hash
  const { query } = router;
  console.log("query", router.asPath);
}

export default CatchUrl;
