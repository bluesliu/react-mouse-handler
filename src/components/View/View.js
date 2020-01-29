import React,{Component} from "react";
import PropTypes from "prop-types";
import {currentTheme} from "../style/theme";
import {parseStyle} from "../style/styleHelper";

let styles = {
    display: 'flex',
    position: 'absolute'
};

class View extends Component{
    static propTypes = {
        x: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        y: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        visible: PropTypes.bool,
        backgroundColor: PropTypes.string,
        color: PropTypes.string
    };
    static defaultProps = {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        visible: true,
        backgroundColor: currentTheme.view.backgroundColor,
        color: currentTheme.view.color
    };

    render() {
        const style = {
            ...styles,
            ...currentTheme.view,
            ...this.props.style,
            ...this.getStyle()
        };
        const finalStyle = parseStyle(style);
        return (
            <div style={finalStyle}>{this.props.children}</div>
        )
    }

    getStyle(){
        return {
            x:this.props.x,
            y:this.props.y,
            width:this.props.width,
            height:this.props.height,
            visible:this.props.visible,
            backgroundColor:this.props.backgroundColor,
            color:this.props.color
        };
    }
}

export default View;