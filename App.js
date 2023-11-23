import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/contacts')
      .then(response => setContacts(response.data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  const handleAddContact = () => {
    axios.post('http://localhost:5000/api/contacts', newContact)
      .then(response => {
        setContacts([...contacts, response.data]);
        setNewContact({ name: '', email: '', phone: '' });
      })
      .catch(error => console.error('Error adding contact:', error));
  };

  const handleDeleteContact = id => {
    axios.delete(`http://localhost:5000/api/contacts/${id}`)
      .then(() => setContacts(contacts.filter(contact => contact._id !== id)))
      .catch(error => console.error('Error deleting contact:', error));
  };

  return (
    <div>
      <h1>Contact Manager</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phone}
            <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Add Contact</h2>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={e => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newContact.email}
          onChange={e => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newContact.phone}
          onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
    </div>
  );
}

export default App;
