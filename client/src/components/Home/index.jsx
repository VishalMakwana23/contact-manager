import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AddContact } from "../AddContact";
import { Search } from "../Search";
import { List } from "../List";
import { DELETE, GET } from "../../services/methods";

const Home = () => {
  const [contactData, setContactData] = useState();
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isEditContact, setIsEditContact] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (contactData) {
      const filteredContacts = contactData.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredContacts(filteredContacts);
    }
  }, [search, contactData]);

  const getContacts = async () => {
    const contactData = await GET("/contacts");
    setContactData(contactData);
  };

  const editContact = (id) => {
    setIsEditContact(id);
  };

  const deleteContact = async (id) => {
    const deletedContact = await DELETE(`/contacts/${id}`);
    if (deletedContact.data) {
      toast.success(deletedContact.data.message);
      getContacts();
      setIsEditContact(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  function onChangeSearch(event) {
    setSearch(event.target.value);
  }

  return (
    <>
      <AddContact
        getContacts={getContacts}
        isEditContact={isEditContact}
        setIsEditContact={setIsEditContact}
      />
      <Search search={search} onChangeSearch={onChangeSearch} />
      <List
        filteredContacts={filteredContacts}
        deleteContact={deleteContact}
        search={search}
        editContact={editContact}
      />
    </>
  );
};

export default Home;
