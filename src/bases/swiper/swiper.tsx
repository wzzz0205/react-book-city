import React from "react";

import './styles/swiper.scss';

export interface SwiperProps {
  /** 循环 */
  loop?: boolean;
  /** 自动播放 */
  autoplay?: boolean;
  /** 默认显示第几张 */
  defaultIndex?: number;
  children: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties & Partial<Record<'--height' | '--width' | '--track-padding' | '--border-radius',string>>
}

const classPrefix = 'wz-swiper';
const Swiper:React.FC<SwiperProps> = (props) => {
  // 当前轮播图播放到第几张
  const [currentIndex,setCurrentIndex] = React.useState<number>(props.defaultIndex | 0)
  // 滑动相关  鼠标点击的坐标
  const startRef = React.useRef<number>(0);
  // 移动距离相较于本身宽度的百分比 1就是移动了1张
  const slideRatioRef = React.useRef<number>(0);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const getFinalPosition = (index:number) => {
    /**  播放到第一张时
     * 第一张图片 0*100 + 0 * 100 = 0
     * 第二 0*100 + 100
     * */
    const finalPosition = -currentIndex * 100 + index * 100;
    return finalPosition;
  }
  const renderSwiperItem = () => {
    return (
      <div className={`${classPrefix}-track-inner`}>
        {React.Children.map(props.children,(child,index)=>{
          const position = getFinalPosition(index);
          return (
            <div className={`${classPrefix}-slide`}
                 style={{left: `-${index * 100}%`, transform: `translate3d(${position}%,0,0)`, }}>
              {child}
            </div>
          )
        })}
      </div>
    )
  }
  const getSlideRatio = (diff:number) => {
    const element = trackRef.current;
    if(!element) return 0;

    return diff / element.offsetWidth;
  }
  const onTouchMove = (e:TouchEvent) => {
    const currentX = e.changedTouches[0].clientX;
    const diff = startRef.current - currentX;
    slideRatioRef.current = getSlideRatio(diff);

    const position = currentIndex + slideRatioRef.current;
    setCurrentIndex(position);
  }
  // 滑动边界值
  const boundIndex = (index:number) => {
    let ret = index;
    let min = 0;
    let max = React.Children.count(props.children);

    ret = Math.max(ret,min);
    ret = Math.min(max,ret);
    return ret;
  }
  // 跳转位置
  const swipeTo = (index:number) => {
    const targetIndex = boundIndex(index);
    setCurrentIndex(targetIndex);
  }
  const onTouchEnd = () => {
    const index =  Math.round(slideRatioRef.current);
    slideRatioRef.current = 0;

    const position = currentIndex + index; // 当前位置
    swipeTo(position);

    document.removeEventListener('touchmove',onTouchMove);
    document.removeEventListener('touchend',onTouchEnd);
  }
  const onTouchStart = (e:React.TouchEvent<HTMLDivElement>) => {
    startRef.current = e.changedTouches[0].clientX;

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  }

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-track`} ref={trackRef} onTouchStart={onTouchStart}>
        {renderSwiperItem()}
      </div>
    </div>
  )
}


export default Swiper;

Swiper.displayName = 'Swiper';
