import styles from "./SongsManagement.module.css";
import { formatSeconds } from "../../utils/formatSeconds";
import { useState, useRef } from "react";

import { REST_BASE_URL } from "../../constants/constants";

import { toast } from "react-toastify";

interface ISong {
  index: number;
  songID: number;
  title: string;
  duration: number;
  fetchSongs: () => Promise<void>;
  playAudio: (id: number, title: string) => Promise<void>;
}

const SingleSong = ({ index, songID, title, duration, fetchSongs, playAudio }: ISong) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [songTitle, setSongTitle] = useState<string>(title);
  const [fileName, setFileName] = useState<string>("");

  const fileRef = useRef<HTMLInputElement>(null);

  const onDelete = async () => {
    const response = await fetch(`${REST_BASE_URL}/song/${songID}`, {
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
    if (fileName === "") {
      // Update title saja
      const response = await fetch(`${REST_BASE_URL}/song/title/${songID}`, {
        method: "PUT",
        body: JSON.stringify({
          title: songTitle,
        }),
        headers: {
          Authorization: localStorage.getItem("token") ?? "",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Song successfully updated!", {
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
      let data = new FormData();
      data.append("file", fileRef.current!.files![0]);
      data.append("title", songTitle);

      const response = await fetch(`${REST_BASE_URL}/song/${songID}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token") ?? "",
        },
        body: data,
      });

      if (response.ok) {
        toast.success("Song successfully updated!", {
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

        fileRef.current!.value = "";
        setFileName("");
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
    }

    setIsEditing(false);
  };

  const onFileChange = () => {
    if (fileRef.current!.files!.length == 0) {
      setFileName("");
    } else {
      setFileName(fileRef.current!.files![0].name);
    }
  };

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
            <button onClick={() => playAudio(songID, title)}>Play</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete()}>Delete</button>
          </>
        )}
        {isEditing && (
          <>
            <form>
              <label htmlFor="song">Upload</label>
              <input
                type="file"
                name="song"
                id="song"
                ref={fileRef}
                onChange={() => {
                  onFileChange();
                }}
                accept=".mp3"
              />
            </form>
            <button onClick={() => onSave()} disabled={songTitle === ""}>
              Save
            </button>
            <p>
              {fileName === ""
                ? "No file selected"
                : `${fileName.substring(0, 10) + "..."}`}
            </p>
          </>
        )}
      </td>
    </tr>
  );
};

export default SingleSong;
