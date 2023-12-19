import InternalSwiper from '@/bases/swiper/swiper';
import SwiperItem from './swiper-item';

export type {SwiperProps} from '@/bases/swiper/swiper';
export type {SwiperItemProps} from '@/bases/swiper/swiper-item';

type InternalSwiper = typeof InternalSwiper;

export interface SwiperInterface extends InternalSwiper {
  Item: typeof SwiperItem;
}

const Swiper = InternalSwiper as SwiperInterface; // InternalSwiper 类型为 SwiperInterface
Swiper.Item = SwiperItem

export default Swiper;
