import styles from "./AddSongModal.module.css";

const AddSongModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={styles.modalOverlay}
      style={
        !isModalOpen
          ? {
              transform: "scale(0)"
            }
          : {}
      }
    >
      <div className={styles.modalContainer}>
        <h1>Add new song</h1>
        <form
          className={styles.addSongForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.formGroup}>
            <label htmlFor="title">Song title</label>
            <input type="text" placeholder="Fukashigi no Carte" />
          </div>
          <input type="file" name="file" id="file" />
          <div className={styles.formButtons}>
            <button onClick={() => setIsModalOpen(false)}>Add song</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;
