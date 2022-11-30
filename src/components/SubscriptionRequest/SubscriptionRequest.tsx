import styles from "./SubscriptionRequest.module.css";

import { useEffect, useState, useRef } from "react";

import { REST_BASE_URL, SUBS_PAGE_SIZE } from "../../constants/constants";
import SingleSubs from "./SingleSubs";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ISubs {
  creatorID: number;
  subscriberID: number;
}

const SubscriptionRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subs, setSubs] = useState<ISubs[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  const fetchSubs = async (pageNumber?: number) => {
    const response = await fetch(
      `${REST_BASE_URL}/subscribe?page=${pageNumber ?? currentPage}&pageSize=${SUBS_PAGE_SIZE}`,
      {
        headers: {
          Authorization: localStorage.getItem("token") ?? "",
        },
      }
    );

    if (response.ok) {
      const { data, totalPage } = await response.json();
      setSubs(data);
      setPageCount(totalPage);

      // Handle kasus accept and reject subscription ...
      if (currentPage > totalPage) {
        const response = await fetch(
            `${REST_BASE_URL}/subscribe?page=${pageNumber ?? currentPage - 1}&pageSize=${SUBS_PAGE_SIZE}`,
          {
            headers: {
              Authorization: localStorage.getItem("token") ?? "",
            },
          }
        );

        if (response.ok) {
            const { data, totalPage } = await response.json();
            setSubs(data);
            setPageCount(totalPage);
        }
        setCurrentPage(currentPage - 1);
      }
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const nextPage = async () => {
    if (currentPage < pageCount) {
      await fetchSubs(currentPage + 1);
      setCurrentPage(oldPage => oldPage + 1);
    }
  }

  const prevPage = async () => {
    if (currentPage > 0) {
      await fetchSubs(currentPage - 1);
      setCurrentPage(oldPage => oldPage - 1);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.subscriptionRequestContainer}>
        <header>
          <h1>Subscription Request</h1>
          <p>Approve or Reject User Subscription Request!</p>
        </header>
        {subs.length > 0 && (
          <div className={styles.subsTable}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Creator ID</th>
                  <th>Subscriber ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subs.map((sub, idx) => {
                  return (
                    <SingleSubs
                      index={(idx + 1) + (currentPage - 1) * (SUBS_PAGE_SIZE)}
                      creatorID={sub.creatorID}
                      subscriberID={sub.subscriberID}
                      key={`${sub.creatorID}-${sub.subscriberID}`}
                      fetchSubs={fetchSubs}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {subs.length === 0 && (
          <div className={styles.subsTable}>
            <p>No request yet!</p>
          </div>
        )}
        {subs.length > 0 && (
          <div className={styles.pagination}>
            <button disabled={currentPage === 1} onClick={() => {
              prevPage();
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM116.7 244.7l112-112c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8l0 64 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 64c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-112-112c-6.2-6.2-6.2-16.4 0-22.6z" />
              </svg>
            </button>
            <p>
              Page {currentPage} out of {pageCount}
            </p>
            <button disabled={currentPage === pageCount} onClick={() => {
              nextPage();
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zm395.3 11.3l-112 112c-4.6 4.6-11.5 5.9-17.4 3.5s-9.9-8.3-9.9-14.8l0-64-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-64c0-6.5 3.9-12.3 9.9-14.8s12.9-1.1 17.4 3.5l112 112c6.2 6.2 6.2 16.4 0 22.6z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscriptionRequest;
