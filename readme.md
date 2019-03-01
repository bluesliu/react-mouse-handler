# react-mouse-handler

React 鼠标事件处理组件，通过这个高阶组件封装后，子组件具备光标样式设置（`cursor`）、鼠标事件回调（`onMouseOver`、`onMouseMove`、`onMouseDown`、`onMouseUp`、`onMouseOut`），在回调函数中可以拿到鼠标位置数据（`localX`、`localY`、`globalX`、`globalY`、`dx`、`dy`）



## install

```bash
npm install react-mouse-handler --save-dev
```



## use

自定义组件：

```jsx
// MyComponent.js

import React,{Component} from "react";
import mouseHandler from "react-mouse-handler";

class MyComponent extends Component{
  render() {
    return <p>{this.props.children}</p>;
  }
}
MyComponent = mouseHandler(MyComponent);	// 使用高阶组件封装 MyComponent
export default MyComponent;
```

在 `index.js` 中使用刚刚封装的 `MyComponent`

```jsx
// index.js

import ReactDOM from "react-dom";
import React,{Component} from "react";

class App extends Component {
  render() {
    return (
      <div>
        <p>App</p>
        <MyComponent
          cursor="help"                     // 鼠标经过组件时，光标会变成 help 样式
          canDrag={true}                    // 鼠标拖拽（按下并离开）组件时，光标样式保持不变
          onMouseMove={(e, position) => {
            console.log(e);                 // 原生的事件参数
            console.log(position.localX);   // 相对于父容器的局部坐标x
            console.log(position.localY);   // 相对于父容器的局部坐标y
            console.log(position.globalX);  // 相对于document的全局坐标x
            console.log(position.globalY);  // 相对于document的全局坐标y
            console.log(position.dx);       // 水平方向的移动增量（只有在onMouseMove时有意义）
            console.log(position.dy);       // 垂直方向的移动增量（只有在onMouseMove时有意义）
          }}
          onMouseOver={(e, position) => {
            // do something
          }}
          onMouseDown={(e, position) => {
            // do something
          }}
          onMouseUp={(e, position) => {
            // do something
          }}
          onMouseOut={(e, position) => {
            // do something
          }}
        >help</MyComponent>
      </div>
    )
  }
}
ReactDOM.render(<App/>,document.getElementById('root'));
```

