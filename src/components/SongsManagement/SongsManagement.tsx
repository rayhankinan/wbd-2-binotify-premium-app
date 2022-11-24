import styles from "./SongsManagement.module.css";

import SingleSong from "./SingleSong";
import AddSongModal from "./AddSongModal"

import { useState } from "react"

interface ISong {
  title: string;
  duration: number;
}

const dummySongs: ISong[] = [
  {
    title: "Fukashigi no Carte",
    duration: 300,
  },
  {
    title: "Chiisana Koi no Uta",
    duration: 250,
  },
  {
    title: "Blue Bird",
    duration: 432,
  },
  {
    title: "Connect",
    duration: 311,
  },
  {
    title: "Orange",
    duration: 200,
  },
];

const SongsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <AddSongModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className={styles.songsManagementContainer}>
        <header>
          <h1>Songs Management</h1>
          <p>Create, update, delete, or listen to your songs!</p>
        </header>
        <div className={styles.songsTable}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummySongs.map((song, idx) => {
                return (
                  <SingleSong
                    index={idx + 1}
                    title={song.title}
                    duration={song.duration}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.newSongContainer}>
          <button onClick={() => setIsModalOpen(true)}>Add new song</button>
        </div>
        <div className={styles.pagination}>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM116.7 244.7l112-112c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8l0 64 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 64c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-112-112c-6.2-6.2-6.2-16.4 0-22.6z" />
            </svg>
          </button>
          <p>Page 1 out of 1</p>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zm395.3 11.3l-112 112c-4.6 4.6-11.5 5.9-17.4 3.5s-9.9-8.3-9.9-14.8l0-64-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-64c0-6.5 3.9-12.3 9.9-14.8s12.9-1.1 17.4 3.5l112 112c6.2 6.2 6.2 16.4 0 22.6z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SongsManagement;
