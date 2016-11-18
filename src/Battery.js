import React from 'react';
import Styling from './Style.js';
const Methods = [
 'onCharging', 'onDisCharging', 'styleDidMount', 'removeCss','styleDidUpdate'
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

 styleDidMount() {
  this.css = document.createElement("style");
  this.css.type = "text/css";
  this.styleDidUpdate();
  //this.css.id = `style-react-battery-manager-${this.state.id}`;
  document.querySelector('head').appendChild(this.css);
 }
 styleDidUpdate() {
  if(this.css)
   this.css.innerHTML = Styling(this.props, this.state);
 }
 removeCss() {
  let previous = document.querySelector(`#style-react-battery-manager-${this.state.id}`);
  previous && previous.remove();
 }
 componentDidMount() {
  this.styleDidMount();
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
 componentDidUpdate() {
   this.styleDidUpdate();
 }
 componentWillUnmount() {
  this.removeCss();
 }

 render() {
//  this.styleDidUpdate();
  return (
    <div className={"battery_"+this.state.id+((this.state.charging)?" plugged":"")}>
     <div className={"level_"+this.state.id}></div>
    </div>
  )
 }
}

Battery.defaultProps = {
 ltr:true,
 size: 'normal',
 background: 'transparent',
 color: 'black',
 colorOnCharing: 'green',
 colorOnCritical:'red'
};

module.exports = Battery;
