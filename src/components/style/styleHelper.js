/**
 *
 * @type {Map<string, string>}
 */
let styleMap = new Map();
styleMap.set('x', 'left');
styleMap.set('y', 'top');
styleMap.set('visible', 'visibility');

let parseDimension = (name ,value) => {
    if ((name === 'visibility') && (typeof value === 'boolean')) {
        return value ? 'inherit' : 'hidden';
    }
    if (typeof value === 'number') {
        return value + 'px';
    } else if (value.match(/^[0-9]+$/)) {
        return value + 'px';
    }
    return value;
};

export const parseStyle = (obj)=>{
    const style = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        let name = styleMap.get(key);
        if(!name){
            name = key;
        }
        style[name] = parseDimension(name, obj[key]);
    }
    return style;
};

