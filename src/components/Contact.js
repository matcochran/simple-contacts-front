const Contact = ({ contact, deleteContact }) => (
  <li>
    Name: {contact.firstName} {contact.lastName}
    <br />
    Email: {contact.email}
    <br />
    Mobile: {contact.mobile}
    <br />
    <button onClick={() => deleteContact(contact.id)}>Delete</button>
  </li>
);

export default Contact;
