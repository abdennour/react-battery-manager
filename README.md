![Battery React](https://raw.githubusercontent.com/abdennour/spl/master/js/react-battery-manager-optimized.gif)

# Overview :
Track battery status of device that opens the webpage.


# How yo use :

```js

import Battery from 'react-battery-manager';
//or: const Battery = require('react-battery-manager');

//Our default is Right to left.
<Battery   />
//no required props
```

# More Props :

```js

import Battery from 'react-battery-manager';


<Battery
  size={'xlarge'}
   ltr={true}  />
```

# Manage colors by props :

 - background .
 - color .
 - colorOnCharing .
 - colorOnCritical .  

# Retrieve the current level of battery :

Use `level` property to retrieve the current level of battery.

```js

console.log(this.refs.myCompo.level);

<Battery ref="myCompo" />
```
