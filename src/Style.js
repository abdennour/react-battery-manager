module.exports = function(props, id) {


return `

.battery_${id} {
  background: ${props.background};
  position: relative;
  width: 36px;
  height: 12px;
  border: 1px solid black;
  border-radius: 2px;
  position: relative;
  padding: 1px;
  -webkit-transform: scale(0.5);
}
.battery_${id}:before {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: -5.1px;
  margin-top: -3px;
  width: 6px;
  height: 6px;
  background: ${props.foreground};
  clip: rect(0, 6px, 6px, 3.9px);
  border-radius: 50%;
}
.battery_${id}.plugged:after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: -19px;
  margin-top: -3px;
  width: 6px;
  height: 6px;
  background: ${props.foreground};
  border-radius: 50%;
}
.battery_${id} .level_${id} {
  width: 10%;
  height: 100%;
  background: ${props.foreground};
  border-radius: 1px;
}
`;

};
