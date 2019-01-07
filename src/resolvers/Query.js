async function feed(parent, args, context) {
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
  });
  return links;
}

export {feed};
