const fs = require('fs');
const path = require('path');
const parseString = require('xml2js').parseString;

const SVG_DEST_PATH = '../src/assets/svg/index.js';
const SVG_PATH = '../assets/svg';

let files = fs.readdirSync(SVG_PATH);
let allSvgs = [];

for(let index in files){
  let filename = files[index];
  let svgFile = fs.readFileSync(path.join(SVG_PATH, filename));

  parseString(svgFile.toString(), function (err, result) {
    allSvgs.push(buildSvg(filename, result.svg['$'], result.svg.path));

    if(allSvgs.length === files.length){
      finishBuildSvg();
    }
  });
}

function buildSvg(filename, attrs, paths){
  filename = filename.split('.')[0].replace('-','_');
  filename = filename.charAt(0).toUpperCase() + filename.substring(1);
  let {width, height, viewBox} = attrs;
  let svgString = `export const ${filename} = () => (<Svg width='${width}' height='${height}' viewBox='${viewBox}'>`;

  for(let path of paths){
    let {fill, d} = path['$'];
    svgString += `<Path fill='${fill}' d='${d}'/>`
  }

  svgString+= '</Svg>);';
  return svgString;
}

function finishBuildSvg(){
  let fileContent = [ "//Generated file", "import React from 'react';", "import Svg, { Path } from 'react-native-svg';", ""].concat(allSvgs).join('\n');
  fs.writeFileSync(SVG_DEST_PATH, fileContent, 'utf-8');
  console.log("File wrote successfully at ", SVG_DEST_PATH);
}
