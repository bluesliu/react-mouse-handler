import React, {Component} from "react";
import mouseHandler from "./MouseHandler";

class MouseContainer extends Component {
    render() {
        return <div/>
    }
}

MouseContainer = mouseHandler()(MouseContainer);

export default MouseContainer;