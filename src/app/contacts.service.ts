import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-angular-link-http";

import gql from 'graphql-tag';

const getContacts = gql`
{
  contacts{
    name
    email
  }
}
`;

const getContact = gql`
query Contact($name:String!){
  contact(name: $name){
    name
    email
  }
}
`;

const addContact = gql`
mutation addContact($name:String!, $email:String!) {
  addContact(name: $name, email: $email) {
    name
    email
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: "http://localhost:4000/graphql" }),
      cache: new InMemoryCache()
    });
  }

  getContacts():Observable<any> {
    return this.apollo.watchQuery({
      query: getContacts,
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  getContact(name):Observable<any> {
    return this.apollo.watchQuery({
      query: getContact,
      variables: {
        name: name
      },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  addContact(name, email):Observable<any> {
    return this.apollo.mutate({
      mutation: addContact,
      variables: {
        name: name,
        email: email
      }
    });
  }
}
