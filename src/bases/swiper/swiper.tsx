import React from "react";

import './styles/swiper.scss';
import SwiperPageIndicator from "@/bases/swiper/swiper-page-indicator";
import SwiperItem from "@/bases/swiper/swiper-item";
import {modulus} from './utils';

export interface SwiperProps {
    /** 循环 */
    loop?: boolean;
    /** 自动播放 */
    autoplay?: boolean;
    /** 默认显示第几张 */
    defaultIndex?: number;
    /** 显示小圆点 */
    showIndicator?: boolean;
    /** 小圆点样式 */
    indicatorClassName?: string;
    /** 轮播间隔时间 */
    autoPlayInterval?: number;
    children: React.ReactElement | React.ReactElement[];
    style?: React.CSSProperties & Partial<Record<'--height' | '--width' | '--track-padding' | '--border-radius', string>>
}

const classPrefix = 'wz-swiper';
const Swiper: React.FC<SwiperProps> = (props) => {
    // 当前轮播图播放到第几张
    const [currentIndex, setCurrentIndex] = React.useState<number>(props.defaultIndex! | 0)
    const [dragging, setDragging] = React.useState<boolean>(false);
    // 滑动相关  鼠标点击的坐标
    const startRef = React.useRef<number>(0);
    // 移动距离相较于本身宽度的百分比 1就是移动了1张
    const slideRatioRef = React.useRef<number>(0);
    const trackRef = React.useRef<HTMLDivElement>(null);
    // 是否自动轮播
    const autoPlaying = React.useRef<boolean>(false);
    // 定时任务ref
    const intervalRef = React.useRef<number>(0);

    const {validChildren, validChildrenCount} = React.useMemo(() => {
        let validChildrenCount = 0;
        const validChildren = React.Children.map(props.children, (child) => {
            if (!React.isValidElement(child)) return null;
            if (child.type !== SwiperItem) {
                console.warn('Swiper中的子元素必须是Swiper.Item 组件')
            }
            validChildrenCount++;
            return child;
        });
        return {validChildren, validChildrenCount}
    }, [props.children])

    const getFinalPosition = (index: number) => {
        /**  播放到第一张时
         * 第一张图片 0*100 + 0 * 100 = 0
         * 第二 0*100 + 100
         * */
        let finalPosition = -currentIndex * 100 + index * 100;
        if (!props.loop) return finalPosition;
        // 总宽度
        const totalWidth = validChildrenCount * 100;
        // 无限轮播，当前图的前后平均分配轮播图数量
        /**
         * 3 4 1 2
         * 4 1 2 3
         * 1 2 3 4
         * 2 3 4 1
         * */
        const flagWidth = totalWidth / 2;
        // 把当前页的距离加上200，% 总距离（400），然后再减掉200
        finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;

        return finalPosition;
    }
    const getTransition = (position: number) => {
        if (dragging) {
            return '';
        } else if (autoPlaying.current) {
            if (position === -100 || position === 0) {
                return 'transform 0.3s ease-out';
            }else {
                return ''
            }
        } else if (position < -100) {
            return '';
        }
        return 'transform 0.3s ease-out';
    }
    const renderSwiperItem = () => {
        return (
            <div className={`${classPrefix}-track-inner`}>
                {React.Children.map(validChildren, (child, index) => {
                    const position = getFinalPosition(index);
                    return (
                        <div className={`${classPrefix}-slide`}
                             style={{
                                 left: `-${index * 100}%`,
                                 transform: `translate3d(${position}%,0,0)`,
                                 transition: getTransition(position)
                             }}>
                            {child}
                        </div>
                    )
                })}
            </div>
        )
    }
    const getSlideRatio = (diff: number) => {
        const element = trackRef.current;
        if (!element) return 0;

        return diff / element.offsetWidth;
    }
    const onTouchMove = (e: TouchEvent) => {
        const currentX = e.changedTouches[0].clientX;
        const diff = startRef.current - currentX;
        slideRatioRef.current = getSlideRatio(diff);

        let position = currentIndex + slideRatioRef.current;
        if (!props.loop) {
            position = boundIndex(position);
        }
        setCurrentIndex(position);
    }
    // 滑动边界值
    const boundIndex = React.useCallback((index: number) => {
        let ret = index;
        let min = 0;
        let max = validChildrenCount - 1;

        ret = Math.max(ret, min);
        ret = Math.min(max, ret);
        return ret;
    }, [validChildrenCount])

    // 跳转位置
    const swipeTo = React.useCallback((index: number) => {
        const targetIndex = props.loop ? modulus(index, validChildrenCount) : boundIndex(index);
        setCurrentIndex(targetIndex);
    }, [validChildrenCount, props.loop, boundIndex])

    // 自动轮播
    const swiperNext = React.useCallback(() => {
        swipeTo(currentIndex + 1);
    }, [swipeTo, currentIndex])
    const onTouchEnd = () => {
        const index = Math.round(slideRatioRef.current);
        slideRatioRef.current = 0;

        const position = currentIndex + index; // 当前位置
        swipeTo(position); // 判断边界值 跳转

        setDragging(false);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }
    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        startRef.current = e.changedTouches[0].clientX;

        setDragging(true);
        clearInterval(intervalRef.current);
        autoPlaying.current = false;

        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    }

    if (validChildrenCount === 0 || !validChildren) {
        console.warn("Swiper组件最少要有一个Swiper.Item子元素")
        return null;
    }

    React.useEffect(() => {
        if (!props.autoplay || dragging) return;

        intervalRef.current = window.setInterval(() => {
            autoPlaying.current = true
            swiperNext()
        }, props.autoPlayInterval);
        return () => {
            clearInterval(intervalRef.current);
        };

    }, [props.autoplay, dragging, props.autoPlayInterval, swiperNext])

    return (
        <div className={classPrefix} style={props.style}>
            <div className={`${classPrefix}-track`} ref={trackRef} onTouchStart={onTouchStart}>
                {renderSwiperItem()}
            </div>
            {
                props.showIndicator && (
                    <div className={`${classPrefix}-indicator`}>
                        <SwiperPageIndicator
                            total={validChildrenCount}
                            current={slideRatioRef.current > 0 ? Math.floor(currentIndex) : Math.ceil(currentIndex)}
                            indicatorClassName={props.indicatorClassName}
                        />
                    </div>
                )
            }
        </div>
    )
}


export default Swiper;

Swiper.defaultProps = {
    autoplay: false,
    defaultIndex: 0,
    showIndicator: true,
    loop: false,
    autoPlayInterval: 3000
}

Swiper.displayName = 'Swiper';
