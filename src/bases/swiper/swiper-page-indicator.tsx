import React from "react";
import './styles/swiper-page-indicator.scss'
import cx from "classnames";

export interface SwiperPageIndicatorProps {
  /** 轮播图数量 */
  total: number,
  /** 当前轮播图下标 */
  current: number,
  indicatorClassName?: string
}

const classPrefix = 'wz-swiper-page-indicator'
const SwiperPageIndicator: React.FC<SwiperPageIndicatorProps> = (props) => {
  const dots: React.ReactElement[] = React.useMemo(() => {
    return Array(props.total)
      .fill(0)             // 创建一个props.total长度的数组，并全部填充为0
      .map((_, index) => (
        <div key={index}
             className={cx(`${classPrefix}-dot`, {
               [`${classPrefix}-dot-active`]: props.current === index
             })}/>
      ));
  }, [props]);
  return <div className={classPrefix}>
    {dots}
  </div>
}
export default SwiperPageIndicator;
SwiperPageIndicator.displayName = "SwiperPageIndicator";
