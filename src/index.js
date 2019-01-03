// @flow

import {GraphQLServer} from 'graphql-yoga';
import {prisma} from './generated/prisma-client';

import * as Query from './resolvers/Query';
import * as Mutation from './resolvers/Mutation';
import * as User from './resolvers/User';
import * as Link from './resolvers/Link';

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
