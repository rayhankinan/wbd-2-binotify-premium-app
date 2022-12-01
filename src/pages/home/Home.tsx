import { ReactNode, useEffect, useState } from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import Navbar from "../../components/Navigation/Navbar";
import styles from "./Home.module.css";
import SongsManagement from "../../components/SongsManagement/SongsManagement";
import SubscriptionRequest from "../../components/SubscriptionRequest/SubscriptionRequest";

import { REST_BASE_URL } from "../../constants/constants";

import { useNavigate } from "react-router-dom"

interface ILink {
  icon: ReactNode;
  text: string;
  url?: string;
  action?: () => void;
}

const Home = () => {
  const [userID, setUserID] = useState<number>(-1);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
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
      action: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const adminLinks: ILink[] = [
    {
      icon: (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path 
              fill="#ffffff"
              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
            />
          </svg>
        </>
      ),
      text: "Subscription Request",
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
      action: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

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
      setIsAuth(true);
    }
  };

  // Check for token
  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuth) {
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
        return (
          <>
            <div className={styles.mainWrapper}>
              <Sidebar sidebarLinks={adminLinks} />
              <div className={styles.mainContent}>
                <Navbar navbarLinks={adminLinks} />
                <main>
                  <SubscriptionRequest />
                </main>
              </div>
            </div>
          </>
        );
    }
  } else {
    return (
      <>
        <div className={styles.mainWrapper}>
          <Sidebar sidebarLinks={adminLinks} />
          <div className={styles.mainContent}>
            <Navbar navbarLinks={adminLinks} />
            <main>
              <h1>Loading ...</h1>
            </main>
          </div>
        </div>
      </>
    );
  }
};

export default Home;
