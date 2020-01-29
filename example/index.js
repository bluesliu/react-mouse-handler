import ReactDOM from "react-dom";
import React,{Component} from "react";
import "./index.css"
import {View} from "../src";


class App extends Component {
    render() {
        return (
            <View width="800" height="600" backgroundColor="#ffffff">
                <View width="100%" height="100%" x={30} y={200} backgroundColor="#ff0000">view 2</View>
                <View x={100} y={0} backgroundColor="#00ff00">view 3</View>
            </View>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));