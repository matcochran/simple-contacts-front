import { useEffect } from "react";
import { useState } from "react";

import contactService from "../services/contacts";

import Contact from "./Contact";

const ContactPage = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [contacts, setContacts] = useState([]);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    contactService.getAll().then((r) => {
      setContacts(r);
      setDisplayedContacts(r);
    });
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setDisplayedContacts(
      contacts.filter((c) =>
        c.firstName.toLowerCase().startsWith(e.target.value.toLowerCase())
      )
    );
  };

  const handleContactChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const addContact = (e) => {
    e.preventDefault();
    setQuery("");
    for (let existingContact of contacts) {
      if (contact.mobile === existingContact.mobile) {
        updateContact(existingContact.id, {
          ...contact,
          createdDate: existingContact.createdDate,
          id: existingContact.id,
        });
        return;
      }
    }
    const newContact = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      mobile: contact.mobile,
    };

    contactService
      .post(newContact)
      .then((r) => {
        setContacts([...contacts, r]);
        setDisplayedContacts([...contacts, r]);
        setContact({ firstName: "", lastName: "", email: "", mobile: "" });
      })
      .catch((e) => {
        console.log("Could not add contact.");
      });
  };

  const updateContact = (id, existingContact) => {
    contactService.put(id, existingContact).then((r) => {
      setContacts(contacts.map((c) => (c.id !== id ? c : r)));
      setDisplayedContacts(contacts.map((c) => (c.id !== id ? c : r)));
      setContact({ firstName: "", lastName: "", email: "", mobile: "" });
    });
  };

  const deleteContact = (id) => {
    contactService
      .del(id)
      .then((r) => {
        setContacts(contacts.filter((n) => n.id !== id));
        setDisplayedContacts(contacts.filter((n) => n.id !== id));
      })
      .catch((e) => console.log(`Note with id of ${id} not found.`));
    setContacts(contacts.filter((n) => n.id !== id));
    setDisplayedContacts(contacts.filter((n) => n.id !== id));
  };

  return (
    <>
      <h1>Create contact</h1>
      <form onSubmit={addContact}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={contact.firstName}
          onChange={handleContactChange}
        />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={contact.lastName}
          onChange={handleContactChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleContactChange}
        />
        <br />
        <label htmlFor="mobile">Mobile:</label>
        <input
          type="tel"
          pattern="[0-9]{10}"
          name="mobile"
          value={contact.mobile}
          onChange={handleContactChange}
        />
        <br />
        <button type="submit">Create contact</button>
      </form>
      <h1>Contact list</h1>
      <form style={{ display: contacts.length ? null : "none" }}>
        Search: <input value={query} onChange={handleSearchChange}></input>
      </form>
      <ul>
        {contacts.length
          ? displayedContacts.map((c) => (
              <Contact
                key={c.id}
                contact={c}
                deleteContact={deleteContact}
              ></Contact>
            ))
          : "Add some contacts!"}
      </ul>
    </>
  );
};

export default ContactPage;
