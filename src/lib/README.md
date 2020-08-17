
## 使用方式

### 简单的使用方式

```
    <ReactBarrel
        data={[{src:imgurl}]]}
    />
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

#### data 属性说明

```
interface propsData {
    width?: number; //属性autoload 为flase 时,需存在
    height?: number;//属性autoload 为flase 时,需存在
    src?: string;  //属性autoload 为true 时,需存在
}

```
