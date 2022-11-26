import { ReactNode } from "react";
import styles from "./SidebarLink.module.css";

interface ISidebarLink {
  icon: ReactNode;
  text: string;
  url?: string;
  action?: () => void;
}

const SidebarLink = ({ icon, text, url, action }: ISidebarLink) => {
  if (url) {
    return (
      <a href={url} className={styles.sidebarLink}>
        {icon}
        <p>{text}</p>
      </a>
    );
  }
  else {
    return (
      <a className={styles.sidebarLink} onClick={() => action!()}>
        {icon}
        <p>{text}</p>
      </a>
    );
  }
};

export default SidebarLink;
