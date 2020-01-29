import PropTypes from "prop-types";
import initPropType from "./initPropType";

export default (defaultValue=0)=>{
    return (target) => {
        console.log('yyy',target);
        initPropType(target);
        target.propTypes.y = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
        target.defaultProps.y = defaultValue;
    };
};