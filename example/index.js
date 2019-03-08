import ReactDOM from "react-dom";
import React,{Component} from "react";
import {mouseHandler, MouseContainer} from "../src";


class MyComponent extends Component{
    render() {
        return <p>old children</p>;
    }
}
MyComponent = mouseHandler(true)(MyComponent);

class MyImg extends Component{
    render() {
        return <img>{this.props.children}</img>;
    }
}
MyImg = mouseHandler()(MyImg);


class App extends Component {
    render() {
        return (
            <div>
                <p>App</p>
                <br/>
                <div>
                    <MyComponent
                        cursor="ew-resize"
                        canDrag={true}
                        style={{color:"red"}}
                        onDragStart={()=>{
                            console.log('onDragStart');
                        }}
                        onDrag={(e, position) => {
                            console.log('onDrag', e, position);
                        }}
                        onDragEnd={()=>{
                            console.log('onDragEnd');
                        }}
                    >My Component</MyComponent>
                </div>
                <br/>
                <MyImg
                    src="https://www.baidu.com/img/xinshouye_4d9e7ecaa1b5f78475bf13965c6142d1.png"
                    cursor="help"
                    canDrag={false}
                    onClick={(e, position)=>{
                        console.log('click',e,position)
                    }}
                />
                <MouseContainer onDrag={()=>{console.log("drag")}} style={{color:"#0000ff"}}>MouseContainer</MouseContainer>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));