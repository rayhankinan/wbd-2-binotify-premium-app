import styles from "./SongsManagement.module.css";
import { formatSeconds } from "../../utils/formatSeconds";
import React, { useState, useRef } from "react";

import { REST_BASE_URL } from "../../constants/constants";

import { toast } from "react-toastify";

interface ISong {
  index: number;
  id: number;
  title: string;
  duration: number;
  fetchSongs: () => Promise<void>;
}

const SingleSong = ({ index, id, title, duration, fetchSongs }: ISong) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [songTitle, setSongTitle] = useState<string>(title);

  const fileRef = useRef<HTMLInputElement>(null);

  const onDelete = async () => {
    const response = await fetch(`${REST_BASE_URL}/song/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token") ?? "",
      },
    });

    if (response.ok) {
      toast.success("Song successfully deleted!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await fetchSongs();
    } else {
      const data = await response.json();
      toast.error(data.message, {
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

  const onSave = async () => {
    if (fileRef.current!.files!.length === 0) {
      // Update title saja
      const response = await fetch(`${REST_BASE_URL}/song/title/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: songTitle
        }),
        headers: {
          "Authorization": localStorage.getItem("token") ?? "",
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        toast.success("Title successfully updated!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await fetchSongs();
      } else {
        const data = await response.json();
        toast.error(data.message, {
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
    } else {
      // Update bersama file
    }

    setIsEditing(false);
  }

  return (
    <tr className={styles.songRow}>
      <td>
        <p>{index}</p>
      </td>
      <td>
        {!isEditing && title}
        {isEditing && (
          <input
            type="text"
            value={songTitle}
            onChange={(e) => {
              setSongTitle(e.currentTarget.value);
            }}
          />
        )}
      </td>
      <td>
        <p>{formatSeconds(duration)}</p>
      </td>
      <td>
        {!isEditing && (
          <>
            <button>Play</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete()}>Delete</button>
          </>
        )}
        {isEditing && (
          <>
            <form>
              <label htmlFor="song">Upload</label>
              <input type="file" name="song" id="song" ref={fileRef}/>
            </form>
            <button onClick={() => onSave()} disabled={songTitle === ""}>Save</button>
            <p>No file selected</p>
          </>
        )}
      </td>
    </tr>
  );
};

export default SingleSong;
