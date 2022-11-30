import styles from "./SubscriptionRequest.module.css";

import { REST_BASE_URL } from "../../constants/constants";

import { toast } from "react-toastify";

interface ISubs {
  index: number;
  creatorID: number;
  subscriberID: number;
  fetchSubs: () => Promise<void>;
}

const SingleSubs = ({ index, creatorID, subscriberID, fetchSubs}: ISubs) => {

  const onApprove = async () => {
    const response = await fetch(`${REST_BASE_URL}/subscribe/accept`, {
      method: "POST",
      body: JSON.stringify({
        creatorID: creatorID,
        subscriberID: subscriberID,
      }),
      headers: {
        Authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
    });
    const { message } = await response.json();
    if (response.ok) {
      toast.success(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await fetchSubs();
    } else {
      toast.error(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onReject = async () => {
    const response = await fetch(`${REST_BASE_URL}/subscribe/reject`, {
      method: "POST",
      body: JSON.stringify({
        creatorID: creatorID,
        subscriberID: subscriberID,
      }),
      headers: {
        Authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
    });
    const { message } = await response.json();
    if (response.ok) {
      toast.success(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await fetchSubs();
    } else {
      toast.error(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <tr className={styles.subsRow}>
      <td>
        <p>{index}</p>
      </td>
      <td>
        {creatorID}
      </td>
      <td>
        {subscriberID}
      </td>
      <td>
          <>
            <button onClick={() => onApprove()}>Approve</button>
            <button onClick={() => onReject()}>Reject</button>
          </>
      </td>
    </tr>
  );
};

export default SingleSubs;
