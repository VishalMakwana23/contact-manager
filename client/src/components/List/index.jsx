import { Contact } from "../Contact";
import styles from "./list.module.scss";
import { FaSadTear } from "react-icons/fa";

export function List({ filteredContacts, editContact, deleteContact, search }) {
  return (
    <section className={styles.container}>
      {filteredContacts.map((item) => {
        return (
          <Contact
            key={item.id}
            contactData={item}
            editContact={editContact}
            deleteContact={deleteContact}
          />
        );
      })}
      {filteredContacts.length <= 0 && (
        <div className={styles.empty}>
          <FaSadTear size={50} />
          <div>
            {search ? (
              <>
                <strong>No contacts found...</strong>
                <p>Search for another or add a new one</p>
              </>
            ) : (
              <>
                <strong>Your list is empty...</strong>
                <p>Add your contacts to start interacting</p>
              </>
            )}
          </div>
          <p className={styles.credits}>
            Made with <span>❤</span> by{" "}
            <a href="https://github.com/VishalMakwana23" target="_blank">
              VishalCodes
            </a>
          </p>{" "}
        </div>
      )}
    </section>
  );
}
