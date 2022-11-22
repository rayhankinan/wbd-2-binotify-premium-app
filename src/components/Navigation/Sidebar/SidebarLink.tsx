import { ReactNode } from "react";
import styles from "./SidebarLink.module.css";

interface ISidebarLink {
  icon: ReactNode;
  text: string;
  url: string;
}

const SidebarLink = ({ icon, text, url }: ISidebarLink) => {
  return (
    <a href={url} className={styles.sidebarLink}>
      {icon}
      <p>{text}</p>
    </a>
  );
};

export default SidebarLink;
