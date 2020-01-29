import PropTypes from "prop-types";
import initPropType from "./initPropType";

export const xPropTypes =  PropTypes.number;

export default (defaultValue=0)=>{
    return (target) => {
        console.log('xxx',target, this);
        initPropType(target);
        target.propTypes.x = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
        target.defaultProps.x = defaultValue;
        target.styleMap.push('x')
    };
};