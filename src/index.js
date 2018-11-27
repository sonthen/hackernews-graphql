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
      let newLink;
      links = links.map(link => {
        if (link.id === args.id) {
          newLink = {
            ...link,
            description: args.description ? args.description : link.description,
            url: args.url ? args.url : link.url
          };
          return newLink;
        }
        return link;
      });
      return newLink;
    },
    deleteLink: (_, args) => {
      let deletedLink = links.filter(link => link.id === args.id)[0];
      links = links.filter(link => link.id !== args.id);
      console.log("links", links);
      console.log("deletedLink", deletedLink);
      return deletedLink;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
