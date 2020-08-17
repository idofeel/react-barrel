## react-barrel （木桶瀑布流）


#### 实现思路
1. 获取到图片真实的宽高；

2. 自定义一个高度，将获取到的图片宽高等比例缩放至自定义的高度（获取到缩放后的宽高）；

3. 获取容器的总宽度；

4. 遍历缩放后的宽高，累加每个元素的宽度，当超过总宽度时（已经够一行的数据），获取n 和 n + 1 的平均高度，保留接近自定义的高度，n+1接近就放入当前行，n接近就将这个数据作为下一行的开始，以此类推；

5. 将已经够一行的宽度（可能超出，可能不够整行），计算出能排列到一行的宽度的平局高度。

6. 最后把最后一行的数据（累加不够一行，不满足放入一行的数据）直接追加到渲染的数据中。

7. 最后渲染数据就大功告成了。



#### 核心方法（上代码）

##### 获取图片真实的宽高
```
/**
 * 获取图片真实宽高
 * @param {*} url 图片地址
 * @returns {Promise}  res {width,height,src
 */
getImgInfo(url) {
	return new Promise((resolve, reject) => {
	    // 创建图片
		let img = new Image();
		// 设置地址
		img.src = url;
		// 使用onload获取宽高比较慢。故使用下面这种方式较快获取到图片的真实宽高
		// 当浏览器返回宽高时及时拿到宽高。
		let timer = setInterval(function() {
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
```

##### 等比例缩放至相同的高度
```
/**
 * @method 根据获取的实际宽高设置成标准高度
 * @param {[{width:number,height:number,src:string}],baseHeight,marign } imgwh 图片的宽高
 * @returns {width,height,src,margin} // 返回标准高度的等比例
 */
getStandardHeight(
	imgwh,
	baseHeight = this.baseHeight,
	margin = this.margin,
) {
	return imgwh.map((item) => {
		const { width, height, src } = item;
		const imgRatio = height / baseHeight; // 根据基础高度获取图片比例
		return {
			height: baseHeight, // 将图片设置为基础高度
			width: width / imgRatio, // 等比缩放宽度
			src, // 图片地址
			margin,
		};
	});
}
```

##### 根据总宽度，获取平均的高度
```
/**
 * @method 按总宽度获取一行的平均高度
 * @param {@getStandardHeight} tempBarrel
 * @returns {width,height,src,marign}
 */
getBarrel(tempBarrel) {
    if (!tempBarrel.length) return tempBarrel;
    let sumWidth =
    	this.sum(...tempBarrel.map((item) => item.width)) +
    	tempBarrel.length * this.margin; // 计算总宽度
    
    let Barrel = this.getStandardHeight(
    	tempBarrel,
    	this.baseHeight / (sumWidth / this.totalWidth),
    ); // 根据总宽度设置新的高度
    Barrel[Barrel.length - 1].margin = 0; //将最后一个marin设置为 0
    return Barrel;
}
```


##### 初始化渲染
```
/**
 *
 * @param {*} data 
 */
initRender(data) {
	this.firstLoadData = data; // 保留初始化加载的数据，当屏幕重置时重新计算
	// 获取行高一样的图片数据
	const rowHeights = this.getStandardHeight(data);
	// 定义图片的宽度总和
	let wholeWidth = 0;
	let barrelData = []; // 最终渲染的数据
	let tempBarrel = []; // 临时存储一行的数据
	rowHeights.forEach((item) => {
		// 最小高度
		let minHeight = (wholeWidth / this.totalWidth) * this.baseHeight,
			maxHeight;
		// 累加宽度
		wholeWidth += item.width;
		// 将数据放入渲染
		tempBarrel.push(item);
		if (wholeWidth > this.totalWidth) {
			// 已经够一行的数据
			// 最大高度
			maxHeight = (wholeWidth / this.totalWidth) * this.baseHeight;
			// 最小高度和基础高度差
			const minh = this.baseHeight - minHeight;
			// 最大高度和基础高度差
			const maxh = maxHeight - this.baseHeight;

			if (maxh < minh) {
				// 超出部分离基础值最近
				// 一行总宽度
				const barrel = this.getBarrel(tempBarrel);
				barrelData.push(...barrel); // 放入到一行
				tempBarrel = []; // 重置，新起一行
				wholeWidth = 0; // 重置总宽度
			} else {
				const lastImg = tempBarrel.pop(); // 删除最后一个元素
				const barrel = this.getBarrel(tempBarrel);
				barrelData.push(...barrel); // 放入到一行
				tempBarrel = [lastImg]; // 将最后一个元素的宽度作为最后一行的开始
				wholeWidth = lastImg.width; // 最后一个宽度作为下一行的开始
			}
		}
	});

	barrelData.push(...tempBarrel); //将剩余的不够一行的数据追加到最后
	this.setState({
		barrelData,
	});
}

```


### API

#### ReactBarrel

| 参数          | 说明                                                                | 类型              | 默认值         | 版本  |
| ------------- | ------------------------------------------------------------------- | ----------------- | -------------- | ----- |
| wrapClassName | 外层容器的类名，用于修改样式                                        | String            | ''             | 1.0.0 |
| baseHeight    | 基准高度                                                            | Number            | 250            | 1.0.0 |
| width         | 容器的宽度                                                          | Number            | 继承父级的宽度 | 1.0.0 |
| margin        | 设置每个元素之间的间距                                              | Number            | 5              | 1.0.0 |
| children      | 子元素                                                              | string\|ReactNode | ''             | 1.0.0 |
| autoload      | 自动加载图片，自动从图片中获取宽高，进行布局。                      | Boolean           | true           | 1.0.0 |
| data          | 渲染的数据                                                          | Array             | []             | 1.0.0 |
| renderItem    | 定义渲染，回调 item，index 样式包含在 item 中，用于进行自定义调整。 | (item,index)=>{}  | function       | 1.0.0 |


#### data属性说明

``` 
interface propsData {
    width?: number; //属性autoload 为flase 时,需存在
    height?: number;//属性autoload 为flase 时,需存在
    src?: string;  //属性autoload 为true 时,需存在
}
    
```
