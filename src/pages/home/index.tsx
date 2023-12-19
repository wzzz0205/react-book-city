import React from 'react';
import Header from './components/header';
import Loading from '@/components/loading';
import {ErrorBlock, Swiper} from '@/bases';
import styles from './index.module.scss';

import {useRequest} from '@/hooks/useRequest';
import api from './api';
import {IHomeData} from './types';

const Home: React.FC = () => {
  // const { data, error } = useRequest<IHomeData>({ url: api.getHomeData });
  // if (error) {
  //   return <ErrorBlock />;
  // }
  // if (!data) {
  //   return <Loading />;
  // }
  let data = {
    banner: [{src: "https://t7.baidu.com/it/u=1732966997,2981886582&fm=193&f=GIF", alt: "风景1"},
      {
        src: "https://img1.baidu.com/it/u=3370248593,795902545&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        alt: "风景2"
      },
      {
        src: "https://img0.baidu.com/it/u=4242418788,2490786188&fm=253&fmt=auto&app=120&f=JPEG?w=1044&h=689",
        alt: "牛排"
      },
      {
        src: "https://img2.baidu.com/it/u=100588367,3660166796&fm=253&fmt=auto&app=138&f=JPEG?w=689&h=500",
        alt: "大虾"
      },]
  }

  return (
    <div className={styles.home}>
      <Header/>
      <Swiper autoplay loop style={{"--border-radius": "12px"}}>
        {data!.banner.map((item, index) => (
          <Swiper.Item key={index}>
            <img src={item.src} alt={item.alt} height="100%" width="100%"/>
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
