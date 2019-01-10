// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import {LinkResolvers} from '../graphqlgen';

export const Link: LinkResolvers.Type = {
  ...LinkResolvers.defaultResolvers,

  postedBy: (parent, args, context) => {
    return context.prisma.link({id: parent.id}).postedBy();
  },
  votes: (parent, args, context) => {
    return context.prisma.link({id: parent.id}).votes();
  },
};
