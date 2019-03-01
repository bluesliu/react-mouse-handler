import React from "react";
import ReactDOM from "react-dom";

const mouseHandler = (WrappedComponent)=> {

    return class MouseHandler extends WrappedComponent {

        state = {
            event: "",
            isOver: false
        };

        localX = 0;
        localY = 0;
        globalX = 0;
        globalY = 0;
        dx = 0;
        dy = 0;

        cursor = undefined;
        canDrag = false;
        onMouseOver = undefined;
        onMouseDown = undefined;
        onMouseOut = undefined;
        onMouseUp = undefined;
        onMouseMove = undefined;
        otherProps = undefined;

        constructor(props) {
            super(props);

            const {cursor, canDrag, onMouseOver, onMouseDown, onMouseOut, onMouseUp, onMouseMove, ...otherProps} = this.props;
            this.cursor = cursor;
            this.canDrag = canDrag;
            this.onMouseOver = onMouseOver;
            this.onMouseDown = onMouseDown;
            this.onMouseOut = onMouseOut;
            this.onMouseUp = onMouseUp;
            this.onMouseMove = onMouseMove;
            this.otherProps = otherProps;

            this.onOverHandler = this.onOverHandler.bind(this);
            this.onDownHandler = this.onDownHandler.bind(this);
            this.onOutHandler = this.onOutHandler.bind(this);
            this.onUpHandler = this.onUpHandler.bind(this);
            this.onMoveHandler = this.onMoveHandler.bind(this);
        }

        render() {
            const {isOver} = this.state;
            const elementsTree = super.render();
            let newProps = {};
            newProps.onPointerOver = this.onOverHandler;
            newProps.onPointerDown = this.onDownHandler;
            newProps.onPointerOut = this.onOutHandler;
            newProps.onPointerUp = this.onUpHandler;
            newProps.onPointerMove = this.onMoveHandler;
            if (isOver) {
                newProps.style = {cursor: this.cursor};
                document.body.style.cursor = this.canDrag ? this.cursor : '';
            } else {
                newProps.style = {cursor: ''};
                document.body.style.cursor = '';
            }
            const props = Object.assign({}, elementsTree.props, newProps, this.otherProps);
            return React.cloneElement(elementsTree, props, elementsTree.props.children);
        }

        onOverHandler(e) {
            this.onMouseOver && this.onMouseOver.call(this, e, this.getMousePosition(e));
            this.setState({
                ...this.state,
                isOver: true,
                event: "over"
            });
        }

        onDownHandler(e) {
            if (this.canDrag) {
                e.target.setPointerCapture(e.pointerId);
            }
            this.onMouseDown && this.onMouseDown.call(this, e, this.getMousePosition(e));
            this.setState({
                ...this.state,
                event: "down"
            });
        }

        onOutHandler(e) {
            this.onMouseOut && this.onMouseOut.call(this, e, this.getMousePosition(e));
            this.setState({
                ...this.state,
                isOver: false,
                event: "out"
            });
        }

        onUpHandler(e) {
            if (this.canDrag) {
                e.target.releasePointerCapture(e.pointerId);
            }
            this.onMouseUp && this.onMouseUp.call(this, e, this.getMousePosition(e));
            this.setState({
                ...this.state,
                event: "up"
            });
        }

        onMoveHandler(e) {
            this.onMouseMove && this.onMouseMove.call(this, e, this.getMousePosition(e));
            if(this.state.event==='move'){
                return;
            }
            this.setState({
                ...this.state,
                event: "move"
            });
        }

        getMousePosition(e) {
            switch (e.type) {
                case 'pointerover':
                case 'pointerout':
                case 'pointerdown':
                case 'pointerup':
                    this.dx = 0;
                    this.dy = 0;
                    break;
                case 'pointermove':
                    this.dx = e.pageX - this.globalX;
                    this.dy = e.pageY - this.globalY;
                    break;
            }
            this.globalX = e.pageX;
            this.globalY = e.pageY;
            const dom = ReactDOM.findDOMNode(this);
            if (dom) {
                const rect = dom.getBoundingClientRect();
                this.localX = e.pageX - rect.x + document.documentElement.scrollLeft;
                this.localY = e.pageY - rect.y + document.documentElement.scrollTop;
            }

            return {
                localX: this.localX,
                localY: this.localY,
                globalX: this.globalX,
                globalY: this.globalY,
                dx: this.dx,
                dy: this.dy
            }
        }
    }
};

export default mouseHandler;