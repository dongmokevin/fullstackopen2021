import React, { useState, useEffect } from "react";
import { getAll, remove, create, update } from "./services/persons";
import "./index.css";

const Persons = ({ persons, newFilter, deletePerson }) => {
  const personsToShow = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;

  return personsToShow.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={deletePerson} name={person.name} id={person.id}>
        delete
      </button>
    </div>
  ));
};

const Filter = ({ newFilter, setNewFilter }) => {
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      filter shown with <input onChange={handleFilter} value={newFilter} />
    </div>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setErrorMessage,
  setMessageType,
}) => {
  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const AddName = (event) => {
    event.preventDefault();
    if (newName === "") {
      return alert("Invalid input, empty names are not allowed");
    }

    const personExist = () => persons.some((person) => person.name === newName);

    // console.log(personExist());
    const name = { name: newName, number: newNumber };

    personExist()
      ? window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one ?`
        )
        ? update(persons.find((person) => person.name === newName).id, name)
            .then(
              (res) => (
                setPersons(
                  persons.map((person) =>
                    person.name === res.name
                      ? { ...person, number: res.number }
                      : person
                  )
                ),
                setMessageType("success"),
                setErrorMessage(`Updated ${newName} number to ${res.number}`),
                setTimeout(() => {
                  setErrorMessage(null);
                  setMessageType("");
                }, 5000)
              )
            )
            .catch((error) => {
              setMessageType("error");
              setErrorMessage(
                `Information from ${newName} has already been removed from server`
              );
              setTimeout(() => {
                setMessageType("");
                setErrorMessage(null);
              }, 5000);
            })
        : console.log("canceled")
      : create(name)
          .then((res) => setPersons(persons.concat(res)))
          .then(
            (setMessageType("success"),
            setErrorMessage(`Added ${newName}`),
            setTimeout(() => {
              setErrorMessage(null);
              setMessageType("");
            }, 5000))
          );

    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={AddName}>
      <div>
        name: <input onChange={handleName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  } else {
    return <div className={messageType}>{message}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    getAll().then((res) => setPersons(res));
  }, []);

  const deletePerson = (event) => {
    const personName = event.target.attributes.name.value;
    const personId = event.target.attributes.id.value;
    if (window.confirm(`Delete ${personName}`)) {
      const Newperson = persons.filter((person) => person.name !== personName);
      remove(personId).then(
        (setPersons(Newperson),
        setMessageType("error"),
        setErrorMessage(`${personName} was successfully deleted`))
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} messageType={messageType} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setMessageType={setMessageType}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
