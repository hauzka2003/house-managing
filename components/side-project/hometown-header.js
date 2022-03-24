import { useState } from "react";
import classes from "./hometown-header.module.css";
import LinkName from "./link-name";

const links = [
  { name: "Home" },
  { name: "Background" },
  { name: "Destinations" },
  { name: "Cuisines" },
  { name: "Cultures" },
];

function HomeTownHeader({ onClick, setOnClick }) {
  // const [onClick, setOnClick] = useState("Home");

  return (
    <div className={classes.container}>
      <div className={classes.web_name}>HomeTown</div>
      <div className={classes.link_container}>
        {links.map((link) => {
          return (
            <LinkName
              name={link.name}
              key={link.name}
              onClick={setOnClick}
              selected={link.name === onClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomeTownHeader;
