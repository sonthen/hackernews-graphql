import {GraphQLServer} from 'graphql-yoga';
import {prisma} from './generated/prisma-client';

import * as Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Link from './resolvers/Link';
import Vote from './resolvers/Vote';
import resolvers from './generated/tmp-resolvers';

// const resolvers = generatedResolver;
// {
//   Query,
//   Mutation: {...Mutation},
//   Subscription: {...Subscription},
//   User: {...User},
//   Link: {...Link},
//   Vote: {...Vote},
// };

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: resolvers as any,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
