const fs = require('fs');
const path = require('path');
const parseString = require('xml2js').parseString;

const SVG_DEST_PATH = '../src/assets/svg/index.js';
const SVG_PATH = '../assets/svg';

let files = fs.readdirSync(SVG_PATH);
files = files.filter((f) => f.includes("svg"));
let allSvgs = [];

for (let index in files) {
  let filename = files[index];
  let svgFile = fs.readFileSync(path.join(SVG_PATH, filename));
  parseString(svgFile.toString(), function (err, result) {
    allSvgs.push(buildSvg(filename, result.svg));

    if (allSvgs.length === files.length) {
      finishBuildSvg();
    }
  });
}

function buildSvg(filename, svg) {
  let paths = svg.path || svg.g;
  let attrs = svg['$'];
  let names = filename.split('.')[0].split('-');
  filename = names.map(name => name.charAt(0).toUpperCase() + name.substring(1)).join('');
  let {width, height, viewBox} = attrs;
  let svgString = `export const MP${filename}Icon = (props) => { \n`
    + ` let newProps = applyStyle(props, ${width}, ${height}); \n`
    + ` return (<Svg {...newProps} viewBox='${viewBox}'>`;

  for (let path of paths) {
    let attributes = path['$'];
    let {fill, d, stroke} = attributes;

    if (path.rect){
      for(let rect of path.rect){
        svgString += buildRect(rect, attributes);
      }
    }

    if(path.circle){
      for(let circle of path.circle){
        svgString += buildCircle(circle);
      }
    }

    if(path.path){
      for (let p of path.path) {
        let {d} = p['$'];
        let fillInside = p['$'].fill || fill;

        svgString += `<Path fill='${fillInside}' d='${d}'`;

        if (stroke) {
          svgString += ` stroke='${stroke}' `;
        }

        svgString += '/>';
      }
    }else if (d) {
      svgString += buildPath(path);
    }
  }

  svgString += '</Svg>); \n};\n';
  return svgString;
}

function buildRect(rect, attrs){
  let {fill} = attrs;
  let {width, height, rx, x} = rect['$'];
  let svgString = '<Rect ';

  svgString += fill ? ` fill='${fill}'` : '';
  svgString += width ? ` width='${width}'` : '';
  svgString += height ? ` height='${height}'` : '';
  svgString += rx ? ` rx='${rx}'` : '';
  svgString += x ? ` x='${x}'` : '';
  svgString += '/>';

  return svgString;
}

function buildCircle(circle){
  let {cx, cy, r} = circle['$'];
  let svgString = '<Circle ';

  svgString += cx ? ` cx='${cx}'` : '';
  svgString += cy ? ` cy='${cy}'` : '';
  svgString += r ? ` r='${r}'` : '';
  svgString += '/>';

  return svgString;
}


function buildPath(path) {
  let svgPathString = '';
  let attributes = path['$'];
  let {fill, d, stroke} = attributes;

  let strokeWidth = attributes['stroke-width'];
  let strokeMiterlimit = attributes['stroke-miterlimit'];
  let strokeLinecap = attributes['stroke-linecap'];
  let strokeLinejoin = attributes['stroke-linejoin'];
  let fillOpacity = attributes["opacity"];

  svgPathString += `<Path d='${d}'`;

  if(fill){
    svgPathString += ` fill='${fill}'`;
  }

  if (fillOpacity) {
    svgPathString += ` fillOpacity='${fillOpacity}'`;
  }

  if (stroke) {
    svgPathString += ` stroke='${stroke}'`;
  }

  if (strokeWidth) {
    svgPathString += ` strokeWidth='${strokeWidth}'`;
  }

  if (strokeMiterlimit) {
    svgPathString += ` strokeMiterlimit={${strokeMiterlimit}}`;
  }

  if (strokeLinecap) {
    svgPathString += ` strokeLinecap='${strokeLinecap}'`;
  }

  if (strokeLinejoin) {
    svgPathString += ` strokeLinejoin='${strokeLinejoin}'`;
  }

  svgPathString += '/>';
  return svgPathString;

}

function finishBuildSvg() {
  let fileContent = ["//Generated file",
    "import React from 'react';",
    "import Svg, { Rect, Circle, Path, LinearGradient, Defs, Stop  } from 'react-native-svg';",
    "import {applyStyle} from './applyStyle';", ""].concat(allSvgs).join('\n');

  fs.writeFileSync(SVG_DEST_PATH, fileContent, 'utf-8');
  console.log("File wrote successfully at ", SVG_DEST_PATH);
}
