import { useState, useEffect } from "react";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79'  },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const addContact = newContact => {

    const existingContact = contacts.find(contact =>
      contact.name === newContact.name);
    
    if (existingContact) {
      alert(`${newContact.name} is already in contacts`)
      return
    }

    setContacts([newContact, ...contacts]);
  }

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  }

  const changeFilter = event => {
    setFilter(event.currentTarget.value)
  }

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)      
    );
  }

  const filteredContacts = filterContacts();

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={filteredContacts} onDeleteContact={deleteContact}/>
      </Section>
    </>
  );
}