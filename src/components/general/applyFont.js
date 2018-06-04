import React, {Component} from 'react';

export const applyFont = (WrapperComponent) => {
  return class extends Component{
    render(){
      let newProps = {...this.props};
      let {style} =  newProps;

      if(!this.props.fontLoaded && style){
        if(Array.isArray(style)){
          for(let i in style) {
            delete style[i]['fontFamily'];
          }
        }else{
          delete style.fontFamily;
        }
      }

      return <WrapperComponent {...newProps} />
    }
  }
};
