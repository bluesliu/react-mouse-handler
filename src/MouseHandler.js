import React from "react";
import ReactDOM from "react-dom";

/**
 *
 * @param {Class} WrappedComponent 被包裹的组件
 * @returns {{new(*=): MouseHandler, onOverHandler, onDownHandler, onOutHandler, onUpHandler, onMoveHandler, onClickHandler, cursor: *, canDrag: *, onMouseOver: *, onMouseDown: *, onMouseOut: *, onMouseUp: *, onMouseMove: *, onClick: *, onDragStart: *, onDrag: *, onDragEnd: *, newProps: *, newStyle: *, isDown: boolean, dx, dy, globalX, globalY, localX, localY, prototype: MouseHandler}}
 */
const mouseHandler = (WrappedComponent)=> {

    return class MouseHandler extends WrappedComponent {

        state = {
            isOver: false
        };

        isDown = false;
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
        onClick = undefined;
        onDragStart = undefined;
        onDrag = undefined;
        onDragEnd = undefined;

        newProps = undefined;
        newStyle = undefined;

        constructor(props) {
            super(props);

            this.onOverHandler = this.onOverHandler.bind(this);
            this.onDownHandler = this.onDownHandler.bind(this);
            this.onOutHandler = this.onOutHandler.bind(this);
            this.onUpHandler = this.onUpHandler.bind(this);
            this.onMoveHandler = this.onMoveHandler.bind(this);
            this.onClickHandler = this.onClickHandler.bind(this);

            const {
                cursor, canDrag,
                onMouseOver, onMouseDown, onMouseOut, onMouseUp, onMouseMove, onClick,
                onDragStart, onDrag, onDragEnd,
                style,          //高阶组件封装后，新组件接收的 style
                ...newProps     //过滤后的属性
            } = this.props;
            this.cursor = cursor;
            this.canDrag = canDrag;
            this.onMouseOver = onMouseOver;
            this.onMouseDown = onMouseDown;
            this.onMouseOut = onMouseOut;
            this.onMouseUp = onMouseUp;
            this.onMouseMove = onMouseMove;
            this.onClick = onClick;
            this.onDragStart = onDragStart;
            this.onDrag = onDrag;
            this.onDragEnd = onDragEnd;

            newProps.onPointerOver = this.onOverHandler;
            newProps.onPointerDown = this.onDownHandler;
            newProps.onPointerOut = this.onOutHandler;
            newProps.onPointerUp = this.onUpHandler;
            newProps.onPointerMove = this.onMoveHandler;
            newProps.onClick = this.onClickHandler;
            this.newProps = newProps;
            this.newStyle = style;
        }

        render() {
            const {isOver} = this.state;
            const elementsTree = super.render();
            const {style, ...elementsTreeProps} = elementsTree.props;
            const mergeStyle = {...this.newStyle, ...style};
            if (isOver) {
                mergeStyle.cursor = this.cursor;
                document.body.style.cursor = this.canDrag ? this.cursor : '';
            } else {
                mergeStyle.cursor = '';
                document.body.style.cursor = '';
            }
            const mergeProps = Object.assign({}, elementsTreeProps, this.newProps);
            mergeProps.style = mergeStyle;
            return React.cloneElement(elementsTree, mergeProps, elementsTreeProps.children);
        }

        onOverHandler(e) {
            this.onMouseOver && this.onMouseOver.call(this, e, this.getMousePosition(e));
            this.setState({
                ...this.state,
                isOver: true
            });
        }

        onDownHandler(e) {
            this.isDown = true;
            if (this.canDrag) {
                e.target.setPointerCapture(e.pointerId);
            }
            this.onMouseDown && this.onMouseDown.call(this, e, this.getMousePosition(e));
            if(this.canDrag){
                this.onDragStart && this.onDragStart.call(this, e, this.getMousePosition(e));
            }
        }

        onOutHandler(e) {
            this.onMouseOut && this.onMouseOut.call(this, e, this.getMousePosition(e));
            this.setState({
                ...this.state,
                isOver: false,
            });
        }

        onUpHandler(e) {
            this.isDown = false;
            if (this.canDrag) {
                e.target.releasePointerCapture(e.pointerId);
            }
            this.onMouseUp && this.onMouseUp.call(this, e, this.getMousePosition(e));
            if(this.canDrag){
                this.onDragEnd && this.onDragEnd.call(this, e, this.getMousePosition(e));
            }
        }

        onMoveHandler(e) {
            this.onMouseMove && this.onMouseMove.call(this, e, this.getMousePosition(e));
            if(this.canDrag && this.isDown){
                this.onDrag && this.onDrag.call(this, e, this.getMousePosition(e));
            }
        }

        onClickHandler(e) {
            this.onClick && this.onClick.call(this, e, this.getMousePosition(e));
        }

        getMousePosition(e) {
            switch (e.type) {
                case 'pointermove':
                    this.dx = e.pageX - this.globalX;
                    this.dy = e.pageY - this.globalY;
                    break;
                default:
                    this.dx = 0;
                    this.dy = 0;
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