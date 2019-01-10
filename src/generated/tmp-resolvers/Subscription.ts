// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import {SubscriptionResolvers} from '../graphqlgen';

export const Subscription: SubscriptionResolvers.Type = {
  ...SubscriptionResolvers.defaultResolvers,
  newLink: {
    subscribe: (parent, args, context) => {
      return context.prisma.$subscribe.link({mutation_in: ['CREATED']}).node();
    },
  },
  newVote: {
    subscribe: (parent, args, context) => {
      return context.prisma.$subscribe.vote({mutation_in: ['CREATED']}).node();
    },
  },
};
