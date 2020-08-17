import { Component } from 'react';
interface Props {
    baseHeight?: number;
    data: propsData[];
    margin?: number;
    width?: number;
    wrapClassName?: string;
    autoload?: boolean;
    renderItem?: Function;
    diff?: any;
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
declare class ReactBarrel extends Component<Props, State> {
    static defaultProps: Props;
    totalWidth: number;
    baseHeight: number;
    margin: number;
    autoload: boolean;
    BarrelContainer: any;
    firstLoadData: propsData[];
    renderData: Function;
    reszieBind: Function;
    constructor(props: Props);
    renderItem(item: any, index: number): JSX.Element;
    render(): JSX.Element;
    componentDidMount(): Promise<void>;
    /**
     * 窗口重置事件，重新初始化渲染
     */
    resize(): void;
    /**
     *
     * @param {[{width,height,src}]}} data
     */
    initRender(data: propsData[]): void;
    /**
     * @method 按总宽度获取一行的平均高度
     * @param {width,height,src} tempBarrel
     * @returns {width,height,src,marign}
     */
    getBarrel(tempBarrel: barrelItem[]): barrelItem[];
    sum(...nums: number[]): number;
    /**
     *	1.根据获取的实际宽高设置成标准高度
     * @param {[{width:number,height:number,src:string}]} imgwh 图片的宽高
     * @returns {width,height,src,margin} // 返回标准高度的等比例
     */
    getStandardHeight(imgwh: propsData[], baseHeight?: number, margin?: number): {
        height: number;
        width: number;
        src: string | undefined;
        margin: number;
    }[];
    getAutoWidth(): number | undefined;
    /**
     * 0.获取图片真实宽高
     * @param {*} url 图片地址
     * @returns {Promise}  res {width,height,src}
     */
    getImgInfo(url: string | undefined): any;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
}
export default ReactBarrel;
