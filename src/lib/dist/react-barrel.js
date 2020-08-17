"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ReactBarrel = /** @class */ (function (_super) {
    __extends(ReactBarrel, _super);
    function ReactBarrel(props) {
        var _this = _super.call(this, props) || this;
        _this.firstLoadData = [];
        _this.state = {
            barrelData: [],
        };
        _this.totalWidth = props.width || 0; // 木桶布局总宽度
        _this.baseHeight = props.baseHeight || 0; // 基础高度
        _this.margin = props.margin || 0; // 图片之间间距
        _this.autoload = props.autoload || true; // 自动加载
        _this.BarrelContainer = react_1.default.createRef();
        _this.renderData = props.renderItem || _this.renderItem;
        _this.reszieBind = _this.resize.bind(_this);
        return _this;
    }
    ReactBarrel.prototype.renderItem = function (item, index) {
        var imgProps = {
            key: index,
            src: item.src || item,
            style: {
                width: item.width,
                height: item.height,
                marginRight: item.margin,
                marginBottom: this.margin,
            },
        };
        return react_1.default.createElement("img", __assign({}, imgProps, { alt: "" }));
    };
    ReactBarrel.prototype.render = function () {
        var _this = this;
        var barrelData = this.state.barrelData;
        var wrapClassName = this.props.wrapClassName;
        return (react_1.default.createElement("div", { ref: this.BarrelContainer, className: "" + wrapClassName }, barrelData.map(function (item, index) { return _this.renderData(item, index); })));
    };
    ReactBarrel.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, newdata, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.totalWidth = this.totalWidth || this.getAutoWidth() || 0;
                        data = this.props.data;
                        if (!this.autoload) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(data.map(function (item) { return _this.getImgInfo(item.src); }))];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = data;
                        _b.label = 3;
                    case 3:
                        newdata = _a;
                        this.initRender(newdata);
                        // 监听屏幕变化
                        window.addEventListener('resize', function () { return _this.resize(); });
                        if (this.totalWidth !== this.getAutoWidth())
                            this.resize();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 窗口重置事件，重新初始化渲染
     */
    ReactBarrel.prototype.resize = function () {
        var width = this.getAutoWidth();
        if (this.totalWidth === width)
            return;
        this.totalWidth = this.props.width || width || 0; // 重置高度
        this.initRender(this.firstLoadData);
    };
    /**
     *
     * @param {[{width,height,src}]}} data
     */
    ReactBarrel.prototype.initRender = function (data) {
        var _this = this;
        this.firstLoadData = data; // 保留初始化加载的数据，当屏幕重置时重新计算
        // 获取行高一样的图片数据
        var rowHeights = this.getStandardHeight(data);
        var barrelData = []; // 最终渲染的数据
        var wholeWidth = 0; // 计算一行图片的宽度总和
        var tempBarrel = []; // 临时存储一行的数据
        rowHeights.forEach(function (item) {
            if (!item.width)
                return;
            // 最小高度
            var minHeight = (wholeWidth / _this.totalWidth) * _this.baseHeight, maxHeight;
            // 累加宽度
            wholeWidth += item.width;
            // 将数据放入渲染
            tempBarrel.push(item);
            // 是否够一行数据
            if (wholeWidth > _this.totalWidth) {
                // 已经够一行的数据
                maxHeight = (wholeWidth / _this.totalWidth) * _this.baseHeight; // 最大高度
                var minh = _this.baseHeight - minHeight, // 最小高度和基础高度差
                maxh = maxHeight - _this.baseHeight; // 最大高度和基础高度差
                if (maxh < minh) {
                    // 超出部分离基础值最近
                    // 一行总宽度
                    var barrel = _this.getBarrel(tempBarrel);
                    barrelData.push.apply(barrelData, barrel); // 放入到一行
                    tempBarrel = []; // 重置，新起一行
                    wholeWidth = 0; // 重置总宽度
                }
                else {
                    var lastImg = tempBarrel.pop(); // 删除最后一个元素
                    var barrel = _this.getBarrel(tempBarrel);
                    barrelData.push.apply(barrelData, barrel); // 放入到一行
                    tempBarrel = [lastImg]; // 将最后一个元素的宽度作为最后一行的开始
                    wholeWidth = lastImg.width; // 最后一个宽度作为下一行的开始
                }
            }
        });
        if (!this.props.diff && tempBarrel.length && barrelData.length) {
            // 没有差异的情况下，取最后一个
            var blen = barrelData.length;
            var _a = barrelData[blen - 1], width_1 = _a.width, height_1 = _a.height;
            tempBarrel = tempBarrel.map(function (item) {
                item.width = width_1;
                item.height = height_1;
                return item;
            });
            tempBarrel[tempBarrel.length - 1].margin = 0;
        }
        barrelData.push.apply(barrelData, tempBarrel); //将剩余的不够一行的数据追加到最后
        // 渲染数据
        this.setState({
            barrelData: barrelData,
        });
    };
    /**
     * @method 按总宽度获取一行的平均高度
     * @param {width,height,src} tempBarrel
     * @returns {width,height,src,marign}
     */
    ReactBarrel.prototype.getBarrel = function (tempBarrel) {
        if (!tempBarrel.length)
            return tempBarrel;
        var sumWidth = this.sum.apply(this, tempBarrel.map(function (item) { return item.width; })) +
            tempBarrel.length * this.margin; // 计算总宽度
        var Barrel = this.getStandardHeight(tempBarrel, this.baseHeight / (sumWidth / this.totalWidth)); // 根据总宽度设置新的高度
        Barrel[Barrel.length - 1].margin = 0; //将最后一个marin设置为 0
        return Barrel;
    };
    ReactBarrel.prototype.sum = function () {
        var nums = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nums[_i] = arguments[_i];
        }
        var res = 0;
        for (var _a = 0, nums_1 = nums; _a < nums_1.length; _a++) {
            var i = nums_1[_a];
            res += i;
        }
        return res;
    };
    /**
     *	1.根据获取的实际宽高设置成标准高度
     * @param {[{width:number,height:number,src:string}]} imgwh 图片的宽高
     * @returns {width,height,src,margin} // 返回标准高度的等比例
     */
    ReactBarrel.prototype.getStandardHeight = function (imgwh, baseHeight, margin) {
        if (baseHeight === void 0) { baseHeight = this.baseHeight; }
        if (margin === void 0) { margin = this.margin; }
        return imgwh.map(function (item) {
            var _a = item.width, width = _a === void 0 ? 0 : _a, _b = item.height, height = _b === void 0 ? 0 : _b, src = item.src;
            var imgRatio = height / baseHeight; // 根据基础高度获取图片比例
            return __assign(__assign({}, item), { height: baseHeight, width: width / imgRatio, // 等比缩放宽度
                src: src,
                // realWidth: width, // 图片真实宽度
                // realHeight: height, // 图片真实高度
                margin: margin });
        });
    };
    ReactBarrel.prototype.getAutoWidth = function () {
        var dom = this.BarrelContainer.current;
        if (!dom)
            return;
        var style = window.getComputedStyle(dom), _a = style || {}, _b = _a.paddingLeft, paddingLeft = _b === void 0 ? 0 : _b, _c = _a.paddingRight, paddingRight = _c === void 0 ? 0 : _c, width = dom.clientWidth -
            parseInt("" + paddingLeft) -
            parseInt("" + paddingRight);
        return width;
    };
    /**
     * 0.获取图片真实宽高
     * @param {*} url 图片地址
     * @returns {Promise}  res {width,height,src}
     */
    ReactBarrel.prototype.getImgInfo = function (url) {
        if (!url)
            return [];
        return new Promise(function (resolve, reject) {
            var img = new Image();
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
            var timer = setInterval(function () {
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
    };
    ReactBarrel.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.data.length !== this.state.barrelData.length) {
            this.initRender(nextProps.data);
        }
    };
    ReactBarrel.defaultProps = {
        baseHeight: 250,
        data: [],
        margin: 5,
        width: 0,
        wrapClassName: '',
        autoload: true,
    };
    return ReactBarrel;
}(react_1.Component));
exports.default = ReactBarrel;
