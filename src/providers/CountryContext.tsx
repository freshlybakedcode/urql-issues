import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery, UseQueryState } from 'urql';
import {
  CurrencyDocument,
  CurrencyQuery,
  EmojiDocument,
  EmojiQuery
} from '../graphql/graphql';

type GraphQLResponse<Data = any> = {
  response: UseQueryState<Data>;
  loading: boolean;
  refresh: Function;
};

type CountryContextType = {
  emoji: GraphQLResponse<EmojiQuery>;
  currency: GraphQLResponse<CurrencyQuery>;
};

type Props = {
  children: ReactNode;
};

const CountryContextDefaultValues: CountryContextType = {
  emoji: {
    response: {
      data: {
        __typename: 'Query',
      },
      fetching: true,
      stale: true,
    },
    loading: true,
    refresh: () => {},
  },
  currency: {
    response: {
      data: {
        __typename: 'Query',
      },
      fetching: true,
      stale: true,
    },
    loading: true,
    refresh: () => {},
  },
};

const CountryContext = createContext<CountryContextType>(CountryContextDefaultValues);

export function useCountryDetails() {
  return useContext(CountryContext);
}

export function CountryProvider({ children }: Props) {
  const [currencyDetails, refreshCurrencyDetails] = useQuery({
    query: CurrencyDocument,
  });
  const [emojiDetails, refreshEmojiDetails] = useQuery({
    query: EmojiDocument,
  });

  const valueMemoised = useMemo(() => {
    return {
      currency: {
        response: currencyDetails,
        loading: currencyDetails.fetching || currencyDetails.stale,
        refresh: () => refreshCurrencyDetails({ requestPolicy: 'network-only' }),
      },
      emoji: {
        response: emojiDetails,
        loading: emojiDetails.fetching || emojiDetails.stale,
        refresh: () => refreshEmojiDetails({ requestPolicy: 'network-only' }),
      },
    };
  }, [currencyDetails, emojiDetails, refreshCurrencyDetails, refreshEmojiDetails]);

  return <CountryContext.Provider value={valueMemoised}>{children}</CountryContext.Provider>;
}
