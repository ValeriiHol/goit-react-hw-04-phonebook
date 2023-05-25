import { Component } from 'react';
import { nanoid } from 'nanoid';

import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsContact = JSON.parse(contacts);

    if (parsContact) {
      this.setState({ contacts: parsContact });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      alert("Enter the contact's name and number phone!");
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filterValue = filter.toUpperCase();
    const visibleContacts = contacts.filter(element =>
      element.name.toUpperCase().includes(filterValue)
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} onChange={this.handleFilter} />
        )}
        {contacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          />
        ) : (
          <p>Your phonebook is empty.</p>
        )}
      </Container>
    );
  }
}

export default App;

// // clo
// console.log('object :>> ', object);
// // clg
// console.log(object);
// //nfn
// const name = (params) => {

// }

// anfn
// (params) => {

// }
