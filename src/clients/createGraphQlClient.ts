import { CombinedError, createClient, dedupExchange, errorExchange, fetchExchange, makeOperation } from 'urql';
import { AuthConfig, authExchange } from '@urql/exchange-auth';

import { offlineExchange, cacheExchange } from '@urql/exchange-graphcache';
import { KeyingConfig } from '@urql/exchange-graphcache/dist/types/types';
import graphqlSchema from '../graphql/graphql';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';

// export const GRAPHQL_CACHE_INDEXEDDB_NAME = 'graphcache';

const createGraphQlClient = () =>
  createClient({
    exchanges: [
      dedupExchange,
      // offlineExchange({
      //   schema: graphqlSchema,
      //   storage: makeDefaultStorage({
      //     idbName: GRAPHQL_CACHE_INDEXEDDB_NAME, // The name of the IndexedDB database
      //     maxAge: 1, // The maximum age of the persisted data in days
      //   }),
      // }),
      cacheExchange({
        schema: graphqlSchema,
      }),
      fetchExchange,
    ],
    url: 'https://countries.trevorblades.com/graphql',
  });

export default createGraphQlClient;
