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

function buildAttrs(e) {
  let attrs = '';
  let attrName = '';

  for (var key in e) {
    attrName = key.split('-').map((item, index) => {
      item = index !== 0 ? item.replace(/\b\w/g, l => l.toUpperCase()) : item;
      return item;
    }).join('');

    attrs += ` ${attrName}="${e[key]}" `;
  }

  return attrs;
}

function buildDefChildren(element) {
  let elementString = '';

  for (let key in element) {
    if (key === '$') {
      continue;
    }
    let elementName = key.replace(/\b\w/g, l => l.toUpperCase());

    for (let child of element[key]) {
      elementString += `<${elementName}  ${buildAttrs(child['$'])} />`;
    }
  }

  return elementString;
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

  if (svg.defs) {
    svgString += '<Defs>';

    for (let item of svg.defs) {
      let keys = Object.keys(item);

      for (let key of keys) {
        let elementName = key.replace(/\b\w/g, l => l.toUpperCase());
        let elementAttrs = '';

        let element = item[key][0];
        elementAttrs = buildAttrs(element['$']);

        svgString += `<${elementName} ${elementAttrs}>`;
        svgString += buildDefChildren(element);
        svgString += `</${elementName}>`;
      }

    }

    svgString += '</Defs>';
  }

  for (let path of paths) {
    let attributes = path['$'];
    let {fill, d, stroke} = attributes;

    if (d) {
      svgString += buildPath(path);
    } else {
      for (let p of path.path) {
        let {d} = p['$'];
        let fillInside = p['$'].fill || fill;

        svgString += `<Path fill='${fillInside}' d='${d}'`;

        if (stroke) {
          svgString += ` stroke='${stroke}' `;
        }

        svgString += '/>';
      }
    }
  }

  svgString += '</Svg>); \n};\n';
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

  svgPathString += `<Path fill='${fill}' d='${d}'`;

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
    svgPathString += ` strokeMiterlimit='${strokeMiterlimit}'`;
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
    "import Svg, { Path, LinearGradient, Defs, Stop  } from 'react-native-svg';",
    "import {applyStyle} from './applyStyle';", ""].concat(allSvgs).join('\n');

  fs.writeFileSync(SVG_DEST_PATH, fileContent, 'utf-8');
  console.log("File wrote successfully at ", SVG_DEST_PATH);
}
