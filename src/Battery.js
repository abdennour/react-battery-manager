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

 addCss() {
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = Styling(this.props, this.state.id);
  css.id = `style-react-battery-manager-${this.state.id}`;
  document.querySelector('head').appendChild(css);
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
  } else if(this.props.width){
    containerWith = this.props.width;
    containerHeight = parseInt(containerWith/3)
  } else if (this.props.height) {
    containerHeight = this.props.height;
    containerWith = 3 * containerHeight;
  } else {
   let sizeMap = {
    small: [36, 12],
    normal: [72, 24],
    large: [108, 36],
    xlarge: [144, 48],
    xxlarge: [156, 60]
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
  if(this.state.level && this.state.level <10) {
    return this.props.colorOnCritical;
  } else {
    return (!this.state.charging) ? this.props.foreground : this.props.colorOnCharing;
  }
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
 colorOnCharing: 'green',
 colorOnCritical:'red'
};

module.exports = Battery;
