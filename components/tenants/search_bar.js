import TenantSearch from "../filter/tenant_search";
import TenantsFilter from "../filter/tenant_filter";
import styles from "./search_bar.module.css";
function TenantsSearchBar() {
  return (
    <div className={styles.container}>
      <TenantSearch />
      <TenantsFilter />
    </div>
  );
}

export default TenantsSearchBar;
