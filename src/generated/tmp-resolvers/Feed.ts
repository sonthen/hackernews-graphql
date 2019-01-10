// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import {FeedResolvers} from '../graphqlgen';

export const Feed: FeedResolvers.Type = {
  ...FeedResolvers.defaultResolvers,

  links: (parent, args, ctx) => {
    return parent.links;
  },
};
