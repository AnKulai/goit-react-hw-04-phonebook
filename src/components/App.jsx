import { useEffect } from 'react';
import { Report, Notify } from 'notiflix';
import ContactList from './ContactList/ContactList';
import Filterblock from './Filterblock/Filterblock';
import Phonebook from './Phonebook/Phonebook';
import Section from './Section/Section';
import { useState } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(`contacts`)) === null ||
      !JSON.parse(localStorage.getItem(`contacts`)).length
      ? []
      : JSON.parse(localStorage.getItem(`contacts`))
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!contacts.length) return;
    const stringifyContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifyContacts);
  }, [contacts]);

  const addContact = contact => {
    if (contacts.some(({ name }) => name.includes(contact.name))) {
      Report.failure('Error', `${contact.name} is already in contacts`, 'Okay');
      return;
    }

    setContacts(prevState => {
      return [contact, ...prevState];
    });
  };

  const removeContact = ({ target }) => {
    const id = target.dataset.nanoid;
    const filterList = contacts.filter(contact => contact.id !== id);
    if (filterList.length !== contacts.length) {
      setContacts(filterList);
      Notify.success(`Contact removed`);
    }
  };

  const filterContactList = keyword => {
    setFilter(keyword);
  };

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter)
  );

  return (
    <>
      <Section title="PhoneBook">
        <Phonebook addContact={addContact} />
        <Filterblock title="Filter by Name" filterList={filterContactList} />
      </Section>
      <Section title="Contacts">
        <ContactList contacts={filterContacts} removeContact={removeContact} />
      </Section>
    </>
  );
};

export default App;
