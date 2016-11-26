![Battery React](https://raw.githubusercontent.com/rathath/bucket/master/img/react-battery-manager-optimized.gif)

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
or you can use `onChange` prop for realtime tracking :

```js

const batteryOnChange = (event) => console.log(event.currentTarget.level);

<Battery onChange={batteryOnChange} />
```

# All props :

------------------------------
### 1. ltr

### 2. size
### 3. width
### 4. height

### 5. background:
### 6. color
### 7. colorOnCharing
### 8. colorOnCritical

### 9. onChange
