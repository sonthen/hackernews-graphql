export default {
  link: (parent, args, context) => {
    return context.prisma.vote({id: parent.id}).link();
  },
  user: (parent, args, context) => {
    return context.prisma.vote({id: parent.id}).user();
  },
};
