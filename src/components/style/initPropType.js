export default (target)=>{
    if(!target.propTypes){
        target.propTypes = {};
    }
    if(!target.defaultProps){
        target.defaultProps = {};
    }
    if(!target.styleMap){
        target.styleMap = [];
    }
    if(!target.prototype.getStyle){
        target.prototype.getStyle = ()=>{
            const style = {};
            console.log('333',this)
            for (let i = 0; i < target.styleMap.length; i++) {

            }
            return style;
        }
    }
}

class Style {
    name = '';
    value = null;
    cssName = '';

}