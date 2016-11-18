const api = {
 containerScale(props, state) {
  return (props.ltr) ? 0.5 : -0.5;
 },
 containerSize(props, state) {
  let containerWith, containerHeight, padding;
  if (props.width && props.height) {
   containerWith = props.width;
   containerHeight = props.height;
  } else if (props.width) {
   containerWith = props.width;
   containerHeight = parseInt(containerWith / 3)
  } else if (props.height) {
   containerHeight = props.height;
   containerWith = 3 * containerHeight;
  } else {
   let sizeMap = {
    small: [36, 12],
    normal: [72, 24],
    large: [108, 36],
    xlarge: [144, 48],
    xxlarge: [156, 60]
   };
   containerWith = sizeMap[props.size][0];
   containerHeight = sizeMap[props.size][1];

  }

  return {
   width: containerWith,
   height: containerHeight,
   padding: parseInt(containerHeight / 12),
   border: parseInt(containerHeight / 12)
  };
 },
 sizeCoeffecient(containerHeight) {
   let coeff =parseInt(containerHeight / 12);
   if(!coeff) return 1;
   return (coeff % 3);
 },
 getForeground(props, state) {
  if (state.level && state.level < 10) {
   return props.colorOnCritical;
  } else {
   return (!state.charging) ? props.color : props.colorOnCharing;
  }
 },
 barWidth(props, state) {
  return `${state.level}%`;
 },
 barBackgroundColor(props, state) {
  return this.getForeground(...arguments);
 }
}
const getStyleByPropsAndState = (props, state) => {
 let style = {
  container: {
   $before: {},
   $after: {},
   $plugged: {}
  },
  bar: {}
 };
 style.container.background = props.background;
 style.container = Object.assign(style.container, api.containerSize(props, state)); //width,height,border,padding
 style.container.scale = api.containerScale(props, state);
 style.container.borderColor = api.getForeground(props, state);
 style.container.$before.sizeCoeff = api.sizeCoeffecient(style.container.height);

 style.container.$before.background = api.getForeground(props, state);
 style.container.$plugged.sizeCoeff = style.container.$before.sizeCoeff;
 style.container.$plugged.background = api.getForeground(props, state);

 style.bar.width = api.barWidth(props, state);
 style.bar.background = api.barBackgroundColor(props, state);
 return style;
};
module.exports = function(props, state) {

 var style = getStyleByPropsAndState(props, state);
 return `

.battery_${state.id} {
  background: ${style.container.background};
  position: relative;
  width: ${style.container.width}px;
  height: ${style.container.height}px;
  border: ${style.container.border}px solid ${style.container.borderColor};
  border-radius: ${style.container.border*2}px;
  position: relative;
  padding: ${style.container.padding}px;
  -webkit-transform: scale(${style.container.scale});
  transform: scale(${style.container.scale});
}
.battery_${state.id}:before {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: -${5.1*style.container.$before.sizeCoeff}px;
  margin-top: -${3*style.container.$before.sizeCoeff}px;
  width: ${6*style.container.$before.sizeCoeff}px;
  height: ${6*style.container.$before.sizeCoeff}px;
  background: ${style.container.$before.background};
  clip: rect(0, ${6*style.container.$before.sizeCoeff}px, ${6*style.container.$before.sizeCoeff}px, 3.9px);
  border-radius: 50%;
}
.battery_${state.id}.plugged:after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: -19px;
  margin-top: -${3*style.container.$plugged.sizeCoeff}px;
  width: ${6*style.container.$plugged.sizeCoeff}px;
  height: ${6*style.container.$plugged.sizeCoeff}px;
  background: ${style.container.$plugged.background};
  border-radius: 50%;
}
.battery_${state.id} .level_${state.id} {
  width: ${style.bar.width};
  height: 100%;
  background: ${style.bar.background};
  border-radius: 1px;
}
.fa-battery-4_${state.id}:before, .fa-battery_${state.id}:before, .fa-battery-full_${state.id}:before {
  content:"\f240";
 }
 .fa-battery-0_${state.id}:before, .fa-battery-empty_${state.id}:before {
    content: "\f244";
}

.fa-battery-1_${state.id}:before, .fa-battery-quarter_${state.id}:before {
    content: "\f243";
}
.fa-battery-2_${state.id}:before, .fa-battery-half_${state.id}:before {
    content: "\f242";
}
.fa-battery-3_${state.id}:before, .fa-battery-three-quarters_${state.id}:before {
    content: "\f241";
}
`;

};
