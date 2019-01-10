// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import {VoteResolvers} from '../graphqlgen';

export const Vote: VoteResolvers.Type = {
  ...VoteResolvers.defaultResolvers,

  link: (parent, args, context) => {
    return context.prisma.vote({id: parent.id}).link();
  },
  user: (parent, args, context) => {
    return context.prisma.vote({id: parent.id}).user();
  },
};
