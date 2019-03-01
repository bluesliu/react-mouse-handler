import ReactDOM from "react-dom";
import React,{Component} from "react";
import mouseHandler from "../src/MouseHandler";


class MyComponent extends Component{
    render() {
        return <p>{this.props.children}</p>;
    }
}
MyComponent = mouseHandler(MyComponent);

class MyImg extends Component{
    render() {
        return <img>{this.props.children}</img>;
    }
}
MyImg = mouseHandler(MyImg);


class App extends Component {
    render() {
        return (
            <div>
                <p>App</p>
                <br/>
                <div>
                    <MyComponent
                        cursor="ew-resize" canDrag={true}
                        onMouseOver={(e) => {
                            console.log(e.target)
                        }}
                        onMouseMove={(e, position)=>{
                            console.log(position)
                        }}
                    >ew-resize</MyComponent>
                </div>
                <br/>
                <MyImg
                    src="https://www.baidu.com/img/xinshouye_4d9e7ecaa1b5f78475bf13965c6142d1.png"
                    cursor="help"
                    canDrag={false}
                    onMouseMove={(e)=>{
                        console.log(e);
                    }}
                />
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));