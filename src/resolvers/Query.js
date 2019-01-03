function feed(parent, args, context) {
  return context.prisma.links();
}

export {feed};
