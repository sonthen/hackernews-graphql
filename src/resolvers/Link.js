function postedBy(parent, args, context) {
  return context.prisma.link({id: parent.id}).postedBy();
}
export {postedBy};
