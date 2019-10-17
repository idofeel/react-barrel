This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

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
