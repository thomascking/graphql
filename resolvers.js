var contacts = [
  {name: "Test User", email: "test@user.com"},
  {name: "Other User", email: "other@user.com"}
];


const resolvers = {
  Query: {
    contacts: () => contacts,
    contact: (_, { name }) => contacts.find((c) => c.name === name)
  },
  Mutation: {
    addContact: (_, { name, email }) => {
      newContact = {name: name, email: email};
      contacts.push(newContact);
      return newContact;
    }
  }
};


module.exports.Resolvers = resolvers;
