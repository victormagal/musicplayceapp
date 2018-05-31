const fs = require('fs');
const path = require('path');
const parseString = require('xml2js').parseString;

const SVG_DEST_PATH = '../src/assets/svg/index.js';
const SVG_PATH = '../assets/svg';

let files = fs.readdirSync(SVG_PATH);
files = files.filter((f) => f.includes("svg"));
let allSvgs = [];

for(let index in files){
  let filename = files[index];
  let svgFile = fs.readFileSync(path.join(SVG_PATH, filename));
  parseString(svgFile.toString(), function (err, result) {
    allSvgs.push(buildSvg(filename, result.svg['$'], result.svg.path || result.svg.g));

    if(allSvgs.length === files.length){
      finishBuildSvg();
    }
  });
}

function buildSvg(filename, attrs, paths){
  let names = filename.split('.')[0].split('-');
  filename = names.map(name => name.charAt(0).toUpperCase() + name.substring(1)).join('');
  let {width, height, viewBox} = attrs;
  let svgString = `export const MP${filename}Icon = () => (<Svg width='${width}' height='${height}' viewBox='${viewBox}'>`;

  for(let path of paths){
    let {fill, d, stroke} = path['$'];
    if (d) {
      svgString += `<Path fill='${fill}' d='${d}'/>`
    } else {
      for (let p of path.path) {
        let { d } = p['$'];
        svgString += `<Path fill='${fill}' stroke='${stroke}' d='${d}'/>`      
      }
    }
  }

  svgString+= '</Svg>);';
  return svgString;
}

function finishBuildSvg(){
  let fileContent = [ "//Generated file", "import React from 'react';", "import Svg, { Path } from 'react-native-svg';", ""].concat(allSvgs).join('\n');
  fs.writeFileSync(SVG_DEST_PATH, fileContent, 'utf-8');
  console.log("File wrote successfully at ", SVG_DEST_PATH);
}
