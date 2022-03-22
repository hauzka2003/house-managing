import classes from "./hometown-header.module.css";

const links = [
  { name: "Home" },
  { name: "Background" },
  { name: "Destinations" },
  { name: "Cuisines" },
  { name: "Cultures" },
];

function HomeTownHeader() {
  return (
    <div className={classes.container}>
      <div>HomeTown</div>
      <div className={classes.link_container}>
        {links.map((link) => {
          return (
            <div className={classes.link} key={link.name}>
              {link.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeTownHeader;
