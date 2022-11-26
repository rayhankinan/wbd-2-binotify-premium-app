import { ReactNode, useEffect, useState } from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import Navbar from "../../components/Navigation/Navbar";
import styles from "./Home.module.css";
import SongsManagement from "../../components/SongsManagement/SongsManagement";

import { REST_BASE_URL } from "../../constants/constants";

import { useNavigate } from "react-router-dom"

interface ILink {
  icon: ReactNode;
  text: string;
  url: string;
}

const singerLinks: ILink[] = [
  {
    icon: (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#ffffff"
            d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"
          />
        </svg>
      </>
    ),
    text: "Songs Management",
    url: "/",
  },
  {
    icon: (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#ffffff"
            d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
          />
        </svg>
      </>
    ),
    text: "Log out",
    url: "/logout",
  },
];

const Home = () => {
  const [userID, setUserID] = useState<number>(-1);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkAuth = async () => {
    const response = await fetch(`${REST_BASE_URL}/user/check`,
    {
      headers: {
        "Authorization": localStorage.getItem("token") ?? ""
      }
    });

    if (!response.ok) {
      // Token tidak valid
      navigate("/login");
    } else {
      const data = await response.json();
      setIsAdmin(data.isAdmin);
      setUserID(data.userID);
    }
  };

  // Check for token
  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAdmin) {
    // TODO: Pass user ID ke dalam SongsManagement
    return (
      <>
        <div className={styles.mainWrapper}>
          <Sidebar sidebarLinks={singerLinks} />
          <div className={styles.mainContent}>
            <Navbar navbarLinks={singerLinks} />
            <main>
              <SongsManagement />
            </main>
          </div>
        </div>
      </>
    );
  } else {
    // TODO: Return page admin @Aira
  }
};

export default Home;
