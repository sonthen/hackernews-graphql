// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import {MutationResolvers} from '../graphqlgen';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {APP_SECRET, getUserId} from '../../utils';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  signup: async (parent, args, context) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({...args, password});
    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
      token,
      user,
    };
  },
  login: async (parent, args, context) => {
    const user = await context.prisma.user({email: args.email});
    if (!user) {
      throw new Error('No such user found');
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
      token,
      user,
    };
  },
  createLink: (parent, args, context) => {
    const userId = getUserId(context);
    return context.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: {connect: {id: userId}},
    });
  },

  updateLink: async (parent, args, context) => {
    return context.prisma.updateLink(args);
  },
  deleteLink: (parent, args, context) => {
    return context.prisma.deleteLink(args);
  },
  vote: async (parent, args, context) => {
    const userId = getUserId(context);

    const linkExists = await context.prisma.$exists.vote({
      user: {id: userId},
      link: {id: args.linkId},
    });
    if (linkExists) {
      throw new Error(`Already voted for link: ${args.linkId}`);
    }

    return context.prisma.createVote({
      user: {connect: {id: userId}},
      link: {connect: {id: args.linkId}},
    });
  },
};
