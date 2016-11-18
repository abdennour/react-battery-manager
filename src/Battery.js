import React from 'react';
import Styling from './Style.js';

const PropTypes = {
 ltr: React.PropTypes.bool,
 size: React.PropTypes.oneOf(Styling.sizeEnum),
 background: React.PropTypes.string,
 color: React.PropTypes.string,
 colorOnCharing: React.PropTypes.string,
 colorOnCritical: React.PropTypes.string
};
const DefaultProps = {
 ltr:false,
 size: 'normal',
 background: 'transparent',
 color: 'black',
 colorOnCharing: 'green',
 colorOnCritical: 'red'
};

const Methods = [
 'onChange', 'styleDidMount', 'removeCss', 'styleDidUpdate'
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

 get level() {
  return this.state.level;
 }

 onChange(battery) {
  this.setState({
   level: battery.level * 100,
   charging: battery.charging
  });
 }

 styleDidMount() {
  this.css = document.createElement("style");
  this.css.type = "text/css";
  this.styleDidUpdate();
  document.querySelector('head').appendChild(this.css);
 }
 styleDidUpdate() {
  if (this.css)
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
    this.onChange(battery);
    let eventHandler = (event) => this.onChange(event.currentTarget);
    battery.ondischargingtimechange = eventHandler;
    battery.onchargingtimechange = eventHandler;
    battery.onchargingchange = eventHandler;
    battery.onlevelchange = eventHandler;
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
  return (
    <div className={"battery_"+this.state.id+((this.state.charging)?" plugged":"")}>
     <div className={"level_"+this.state.id}></div>
    </div>
  )
 }
}

Battery.PropTypes = PropTypes;
Battery.defaultProps = DefaultProps;

export default Battery;
