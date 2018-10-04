const schema = `
type Contact {
  name: String!
  email: String!
}

type Query {
  contacts: [Contact]
  contact(name:String!): Contact
}

type Mutation {
  addContact(name:String!, email:String!): Contact
}
`

module.exports.Schema = schema;
