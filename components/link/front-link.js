import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";

function FrontLink({ href, style, children }) {
  const router = useRouter();
  const { setPageLoading } = useLayout();

  function onClick() {
    setPageLoading((prevState) => ({
      ...prevState,
      loading: !prevState.loading,
    }));

    setTimeout(() => {
      router.push(href ?? "/");
    }, 1000);
  }

  return (
    <motion.div onClick={onClick} style={style}>
      {children}
    </motion.div>
  );
}

export default FrontLink;
