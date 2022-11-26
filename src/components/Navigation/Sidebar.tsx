import styles from "./Sidebar.module.css";
import Logo from "../../assets/logo-light.svg";
import SidebarLink from "./Sidebar/SidebarLink"
import { ReactNode } from "react";

interface ISidebarLink {
  icon: ReactNode;
  text: string;
  url?: string;
  action?: () => void;
}

const Sidebar = ({ sidebarLinks }: { sidebarLinks: ISidebarLink[] }) => {
  return (
    <aside className={styles.aside}>
      <img src={Logo} alt="Binotify logo" />
      <div className={styles.links}>
        {sidebarLinks.map(({icon, text, url, action}) => {
          return <SidebarLink key={url} icon={icon} text={text} url={url} action={action} />
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
