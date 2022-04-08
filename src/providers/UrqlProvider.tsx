import React, { ReactNode } from 'react';
import { Provider } from 'urql';

import createGraphQlClient from '../clients/createGraphQlClient';

const UrqlProvider = ({ children }: { children: ReactNode }) => {

  return <Provider value={createGraphQlClient()}>{children}</Provider>;
};

export default UrqlProvider;
