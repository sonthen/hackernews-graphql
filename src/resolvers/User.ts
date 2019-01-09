export default {
  links: (parent, args, context) => {
    return context.prisma.user({id: parent.id}).links();
  },
  votes: (parent, args, context) => {
    return context.prisma.user({id: parent.id}).votes();
  },
};
