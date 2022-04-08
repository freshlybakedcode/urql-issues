require('dotenv').config({
  path: `${__dirname}/.env.local`,
});

module.exports = {
  documents: 'graphql/**/!(*.d).graphql',
  generates: {
    'graphql/schema.graphql': {
      config: {
        includeDirectives: true,
      },
      plugins: ['schema-ast'],
    },
    'src/graphql/graphql.ts': {
      config: {
        nonOptionalTypename: true,
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-urql', 'urql-introspection'],
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
  overwrite: true,
  schema: {
    [process.env.CODEGEN_GRAPHQL_ENDPOINT]: {
    },
  },
};
