import { StyleSheet } from 'react-native';


export const applyStyle = (props, width, height) => {
  let newProps = {...props};
  let {style} = newProps;
  style = style || {};

  if(!isNaN(style)){
    style = Object.assign({}, StyleSheet.flatten([style]));

    if(typeof style.width === 'undefined'){
      style.width = width;
    }

    if(typeof style.height === 'undefined'){
      style.height = height;
    }
    newProps.style = style;
  }

  return newProps;
};
