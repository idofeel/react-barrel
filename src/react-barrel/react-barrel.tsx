import React, { Component } from 'react'

interface Props {
    baseHeight?: number // 基础高度
    data: propsData[]; // 数据
    margin?: 5; // 图片间的间距
    width?: number;
    wrapClassName?: string; // 外层容器的类名
    autoload?: boolean; // 自动加载图片
    renderItem?: Function;
}

interface propsData {
    width?: number;
    height?: number;
    src?: string;
}

interface State {
    barrelData: barrelItem[];
}

interface barrelItem extends propsData {
    margin: number | undefined;
}

class ReactBarrel extends Component<Props, State>{
    static defaultProps: Props = {
        baseHeight: 250, // 基础高度
        data: [], // 数据
        margin: 5, // 图片间的间距
        width: 0,
        wrapClassName: '', // 外层容器的类名
        autoload: true, // 自动加载图片
    };

    totalWidth: number;
    baseHeight: number;
    margin: number;
    autoload: boolean;
    BarrelContainer: any;
    firstLoadData: propsData[] = [];
    renderData: Function;
    reszieBind: Function;

    constructor(props: Props) {
        super(props);

        this.state = {
            barrelData: [], //木桶布局的数据
        };
        this.totalWidth = props.width || 0; // 木桶布局总宽度
        this.baseHeight = props.baseHeight || 0; // 基础高度
        this.margin = props.margin || 0; // 图片之间间距
        this.autoload = props.autoload || true; // 自动加载
        this.BarrelContainer = React.createRef();
        this.renderData = props.renderItem || this.renderItem;
        this.reszieBind = this.resize.bind(this);
    }

    renderItem(item: any, index: number) {

        const imgProps = {
            key: index,
            src: item.src || item,
            style: {
                width: item.width,
                height: item.height,
                marginRight: item.margin,
                marginBottom: this.margin,
            },
        };
        return <img {...imgProps} alt="" />;
    }
    render() {
        const { barrelData } = this.state;
        const { wrapClassName } = this.props;

        return (
            <div
                ref={this.BarrelContainer}
                className={`${wrapClassName}`}>
                {barrelData.map((item, index) => this.renderData(item, index))}
            </div>
        );
    }

    async componentDidMount() {
        this.totalWidth = this.totalWidth || this.getAutoWidth();
        // 获取所有来源的图片实际宽高
        const { data } = this.props;
        const newdata: any = this.autoload
            ? await Promise.all(data.map((item) => this.getImgInfo(item.src)))
            : data;
        this.initRender(newdata);
        // 监听屏幕变化
        window.addEventListener('resize', () => this.resize());
        if (this.totalWidth !== this.getAutoWidth()) this.resize();
    }


    /**
     * 窗口重置事件，重新初始化渲染
     */
    resize() {
        console.log('reszie')
        const width = this.getAutoWidth();
        if (this.totalWidth === width) return;
        this.totalWidth = this.props.width || width; // 重置高度
        this.initRender(this.firstLoadData);
    }
    /**
	 *
	 * @param {[{width,height,src}]}} data
	 */
    initRender(data: propsData[]) {
        this.firstLoadData = data; // 保留初始化加载的数据，当屏幕重置时重新计算
        // 获取行高一样的图片数据
        const rowHeights: barrelItem[] = this.getStandardHeight(data);
        let barrelData: barrelItem[] = []; // 最终渲染的数据
        let wholeWidth: number = 0; // 计算一行图片的宽度总和
        let tempBarrel: barrelItem[] = []; // 临时存储一行的数据

        rowHeights.forEach((item) => {
            if (!item.width) return;
            // 最小高度
            let minHeight: number = (wholeWidth / this.totalWidth) * this.baseHeight,
                maxHeight;
            // 累加宽度
            wholeWidth += item.width;
            // 将数据放入渲染
            tempBarrel.push(item);
            // 是否够一行数据
            if (wholeWidth > this.totalWidth) {
                // 已经够一行的数据
                maxHeight = (wholeWidth / this.totalWidth) * this.baseHeight; // 最大高度

                const minh = this.baseHeight - minHeight, // 最小高度和基础高度差
                    maxh = maxHeight - this.baseHeight; // 最大高度和基础高度差

                if (maxh < minh) {
                    // 超出部分离基础值最近
                    // 一行总宽度
                    const barrel = this.getBarrel(tempBarrel);
                    barrelData.push(...barrel); // 放入到一行
                    tempBarrel = []; // 重置，新起一行
                    wholeWidth = 0; // 重置总宽度
                } else {
                    const lastImg: any = tempBarrel.pop(); // 删除最后一个元素
                    const barrel = this.getBarrel(tempBarrel);
                    barrelData.push(...barrel); // 放入到一行
                    tempBarrel = [lastImg]; // 将最后一个元素的宽度作为最后一行的开始
                    wholeWidth = lastImg.width; // 最后一个宽度作为下一行的开始
                }
            }
        });

        barrelData.push(...tempBarrel); //将剩余的不够一行的数据追加到最后
        // 渲染数据
        this.setState({
            barrelData,
        });
    }

    /**
	 * @method 按总宽度获取一行的平均高度
	 * @param {width,height,src} tempBarrel
	 * @returns {width,height,src,marign}
	 */
    getBarrel(tempBarrel: barrelItem[]) {
        if (!tempBarrel.length) return tempBarrel;
        let sumWidth =
            this.sum(...tempBarrel.map((item: any) => item.width)) +
            tempBarrel.length * this.margin; // 计算总宽度

        let Barrel = this.getStandardHeight(
            tempBarrel,
            this.baseHeight / (sumWidth / this.totalWidth),
        ); // 根据总宽度设置新的高度
        Barrel[Barrel.length - 1].margin = 0; //将最后一个marin设置为 0
        return Barrel;
    }

    sum(...nums: number[]) {
        let res = 0;
        for (let i of nums) {
            res += i;
        }
        return res;
    }

    /**
	 *	1.根据获取的实际宽高设置成标准高度
	 * @param {[{width:number,height:number,src:string}]} imgwh 图片的宽高
	 * @returns {width,height,src,margin} // 返回标准高度的等比例
	 */
    getStandardHeight(
        imgwh: propsData[],
        baseHeight: number = this.baseHeight,
        margin: number = this.margin,
    ) {

        return imgwh.map((item) => {
            const { width = 0, height = 0, src } = item;
            const imgRatio = height / baseHeight; // 根据基础高度获取图片比例
            return {
                height: baseHeight, // 将图片设置为基础高度
                width: width / imgRatio, // 等比缩放宽度
                src, // 图片地址
                // realWidth: width, // 图片真实宽度
                // realHeight: height, // 图片真实高度
                margin,
            };
        });
    }

    getAutoWidth() {
        const dom: any = this.BarrelContainer.current,
            style: any = window.getComputedStyle(dom),
            { paddingLeft, paddingRight } = style,
            width: number =
                dom.offsetWidth -
                parseInt(`${paddingLeft}`) -
                parseInt(`${paddingRight}`);
        return width;
    }





    /**
	 * 0.获取图片真实宽高
	 * @param {*} url 图片地址
	 * @returns {Promise}  res {width,height,src}
	 */
    getImgInfo(url: string | undefined) {
        if (!url) return [];
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = url;
            // const run = () => {
            // 	if (img.width > 0 || img.height > 0) {
            // 		resolve({
            // 			width: img.width,
            // 			height: img.height,
            // 			src: url,
            // 		});
            // 	} else {
            // 		animate = window.requestAnimationFrame(run);
            // 	}
            // };
            // run();

            let timer = setInterval(function () {
                if (img.width > 0 || img.height > 0) {
                    resolve({
                        width: img.width,
                        height: img.height,
                        src: url,
                    });
                    clearInterval(timer);
                }
            }, 50);
        });
    }
}
export default ReactBarrel