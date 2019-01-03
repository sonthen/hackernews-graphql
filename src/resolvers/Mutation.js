import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {APP_SECRET, getUserId} from '../utils';

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({...args, password});
  const token = jwt.sign({userId: user.id}, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context) {
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
}

function createLink(parent, args, context) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: {connect: {id: userId}},
  });
}

async function updateLink(parent, args, context, info) {
  return context.prisma.updateLink(args, info);
}
function deleteLink(parent, args, context, info) {
  return context.prisma.deleteLink(args, info);
}
export {signup, login, createLink, updateLink, deleteLink};
