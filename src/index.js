// @flow

import { GraphQLServer } from "graphql-yoga";

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => "string woy",
    feed: () => links
  },
  Mutation: {
    // 2
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (_, args) => {
      const newLink = {
        ...prevLink,
        description: args.description,
        url: args.url
      };
      return newLink;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
