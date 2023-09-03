import { Input } from "../Input";
import styles from "./addcontact.module.scss";
import {
  MdPersonAddAlt1,
  MdAddCircle,
  MdRemoveCircle,
  MdLogout,
  MdEdit,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { POST, PUT } from "../../services/methods";
import toast from "react-hot-toast";

const initialValues = {
  avatar: "",
  name: "",
  email: "",
  phone: "",
  description: "",
};

export function AddContact({ getContacts, isEditContact, setIsEditContact }) {
  const history = useHistory();

  const [isShowing, setIsShowing] = useState(false);
  const [formValue, setFormValue] = useState(initialValues);

  useEffect(() => {
    if (isEditContact) {
      setFormValue(isEditContact);
      setIsShowing(true);
    }
  }, [isEditContact]);

  function toggleForm() {
    setIsShowing(!isShowing);
    setFormValue(initialValues);
    setIsEditContact(false);
  }

  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    history.push("/login");
  };

  async function onSubmit(event) {
    event.preventDefault();

    const payload = {
      avatar: !formValue.avatar ? null : formValue.avatar,
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      description: formValue.description,
    };

    if (isEditContact) {
      const editContact = await PUT(`/contacts/${isEditContact._id}`, payload);
      if (editContact) {
        toast.success(editContact.data.message);
        getContacts();
        setFormValue(initialValues);
        setIsEditContact(false);
      }
    } else {
      const addContact = await POST("/contacts", payload);
      if (addContact) {
        toast.success(addContact.data.message);
        getContacts();
        setFormValue(initialValues);
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      setFormValue({
        ...formValue,
        [name]: value.trim(""),
      });
    } else {
      setFormValue({
        ...formValue,
        [name]: value,
      });
    }
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <button
          onClick={toggleForm}
          className={isShowing ? styles.circle : ""}
          style={isShowing ? { background: "#fe6161" } : {}}
        >
          {isShowing ? (
            <MdRemoveCircle size={20} />
          ) : (
            <>
              <MdPersonAddAlt1 size={20} />
              Add Contact
            </>
          )}
        </button>
        {isShowing && (
          <div className={styles.title}>
            {isEditContact ? "Edit Contact" : "Add Contact"}
          </div>
        )}
        <button
          onClick={handleLogout}
          className={styles.circle}
          style={{ background: "#fe6161" }}
        >
          <MdLogout size={20} />
        </button>
      </header>
      {isShowing && (
        <form onSubmit={onSubmit}>
          <div className={styles.formWrapper}>
            <div className={styles.form}>
              <Input
                placeholder="Photo url *"
                required
                name="avatar"
                onChange={handleInputChange}
                value={formValue.avatar}
              />
              <Input
                placeholder="Full name *"
                name="name"
                required
                onChange={handleInputChange}
                value={formValue.name}
              />
              <Input
                placeholder="Phone number *"
                name="phone"
                required
                onChange={handleInputChange}
                value={formValue.phone}
              />
              <button className={styles.circle} style={{ opacity: 0 }}>
                <MdAddCircle size={20} />
              </button>
            </div>

            <div className={styles.form}>
              <Input
                placeholder="Email *"
                required
                type="email"
                name="email"
                onChange={handleInputChange}
                value={formValue.email}
              />
              <Input
                placeholder="Description"
                name="description"
                onChange={handleInputChange}
                value={formValue.description}
              />

              <button className={styles.circle}>
                {isEditContact ? (
                  <MdEdit size={20} />
                ) : (
                  <MdAddCircle size={20} />
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
