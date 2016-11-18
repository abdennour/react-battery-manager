import React from 'react';
import Styling from './Style.js';
const Methods = [
 'onCharging', 'onDisCharging', 'addCss', 'removeCss',
 'getContainerSize', 'getContainerColors', 'getContainerStyle', 'getForeground'
];
class Battery extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   id: Date.now(),
   level: 10
  };
  Methods.forEach((method) => this[method] = this[method].bind(this));
 }

 onCharging(event) {
  this.setState({
   level: event.target.level * 100,
   charging: true
  });
 }
 onDisCharging(event) {
  this.setState({
   level: event.target.level * 100,
   charging: false
  });
 }
 removeCss() {

 }
 addCss() {
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = Styling(this.props, this.state.id);
  css.id = `style-react-battery-manager-${this.state.id}`;
  document.body.appendChild(css);
 }

 removeCss() {
  let previous = document.querySelector(`#style-react-battery-manager-${this.state.id}`);
  previous && previous.remove();
 }
 componentDidMount() {
  this.addCss();
  if (typeof navigator.getBattery === 'function') {
   navigator.getBattery().then((battery) => {
    this.setState({
     level: battery.level * 100
    });
    battery.ondischargingtimechange = this.onDisCharging;
    battery.onchargingtimechange = this.onCharging;
   });
  }
 }

 componentWillUnmount() {
  this.removeCss();
 }
 getContainerSize() {
  let containerWith, containerHeight, padding;
  if (this.props.width && this.props.height) {
   containerWith = this.props.width;
   containerHeight = this.props.height;
  } else {
   let sizeMap = {
    small: [36, 12],
    large: [72, 24],
    xlarge: [108, 36],
    xxlarge: [144, 48]
   };
   containerWith = sizeMap[this.props.size][0];
   containerHeight = sizeMap[this.props.size][1];

  }

  return {
   width: containerWith,
   height: containerHeight,
   padding: parseInt(containerHeight / 12)
  };
 }
 getForeground() {
  return (!this.state.charging) ? this.props.foreground : this.props.colorOnCharing;
 }
 getContainerColors() {
  return {
   background: this.props.background,
   border: `1px solid ${this.getForeground()}`
  }
 }

 getContainerStyle() {
  return Object.assign({}, this.getContainerSize(), this.getContainerColors());
 }
 getBarStyle() {
  return {
   width: `${this.state.level}%`,
   background: this.getForeground()
  };
 }

 render() {

  return (
    <div className={"battery_"+this.state.id} style={this.getContainerStyle()}>
     <div className={"level_"+this.state.id} style={this.getBarStyle()}></div>
    </div>
  )
 }
}

Battery.defaultProps = {

 size: 'large',
 background: 'white',
 foreground: 'black',
 colorOnCharing: 'green'
};

module.exports = Battery;
