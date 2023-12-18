import React from 'react';
import Header from './components/header';
import Loading from '@/components/loading';
import styles from './index.module.scss';

import { useRequest } from '@/hooks/useRequest';
import api from './api';
import { ErrorBlock } from '@/bases';

const Home: React.FC = () => {
  const { data, error } = useRequest<any>({ url: api.getHomeData });
  // if (error) {
  //   return <ErrorBlock />;
  // }
  if (!data) {
    return <ErrorBlock />;
  }
  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.home}>
      <Header />
      Home
    </div>
  );
};

export default Home;
