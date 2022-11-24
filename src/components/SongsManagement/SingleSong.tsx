import styles from "./SongsManagement.module.css";
import { formatSeconds } from "../../utils/formatSeconds";
import { useState } from "react";

interface ISong {
  index: number;
  title: string;
  duration: number;
}

const SingleSong = ({ index, title, duration }: ISong) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [songTitle, setSongTitle] = useState<string>(title);

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
            <button>Delete</button>
          </>
        )}
        {isEditing && (
          <>
            <button>Upload</button>
            <button onClick={() => setIsEditing(false)}>Save</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default SingleSong;
