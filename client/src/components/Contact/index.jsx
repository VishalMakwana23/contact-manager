import styles from "./contact.module.scss";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { ThreeCircles } from "react-loader-spinner";
import placeholderImg from "../../assets/placeholder_user.png";

export function Contact({
  contactData,
  editContact,
  deleteContact,
  isDeleteLoading,
}) {
  return (
    <div className={styles.container}>
      <div>
        <img
          src={contactData.avatar ?? placeholderImg}
          alt={contactData.name}
        />
        <div className={styles.details}>
          <strong>{contactData.name}</strong>
          <span>{contactData.phone}</span>
          <span>{contactData.email}</span>
          <span style={{ paddingTop: "10px" }}>{contactData.description}</span>
        </div>
      </div>
      <div>
        <button
          onClick={() => editContact(contactData)}
          className={styles.edit}
        >
          <MdEdit size={25} />
        </button>
        <button
          onClick={() => deleteContact(contactData._id)}
          className={styles.delete}
          disabled={isDeleteLoading}
        >
          {isDeleteLoading ? (
            <ThreeCircles
              height="20"
              width="20"
              color="#4b9d5e"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          ) : (
            <MdDeleteForever size={25} />
          )}
        </button>
      </div>
    </div>
  );
}
