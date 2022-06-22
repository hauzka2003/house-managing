import FrontPageHeader from "../../components/layout/frontpage-header";
import HeaderLayout from "../../components/layout/header-layout";

function Plans() {
  return (
    <>
      <FrontPageHeader header={"PLANS"} />
    </>
  );
}
Plans.getLayout = HeaderLayout;

export default Plans;
