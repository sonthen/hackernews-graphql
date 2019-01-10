// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import {QueryResolvers} from '../graphqlgen';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  info: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  feed: async (parent, args, context) => {
    const where = args.filter
      ? {
          OR: [
            {description_contains: args.filter},
            {url_contains: args.filter},
          ],
        }
      : {};

    const links = await context.prisma.links({
      where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    });

    const count = await context.prisma
      .linksConnection({
        where,
      })
      .aggregate()
      .count();

    return {
      links,
      count,
    };
  },
  link: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
};
