angularjs-color-picker
=====================

AngularJS Color Picker Directive

Requirements
=====
NO requirement for jQuery!
* tinycolor.js - looking at removing in future versions if requested enough (33kb not minified)

Installation
=====
* Include tinycolor.js, angularjs-color-picker.js and angularjs-color-picker.css
* Add the module line
```javascript
angular.module('app', ['color-picker']);
```
* Include in your view
```javascript
<input type="text" ng-model="myColor" color-picker>
```

Options
=====
If a list is given then choose one of the items. The first item in the list will be the default.
```javascript
ng-model=""
format="hsl, hsv, rgb, hex"
alpha="true, false"
swatch="true, false"
swatch-pos="left, right"
pos="bottom left, bottom right, top left, top right"
case="upper, lower"
```

Inspiration and code taken from projects like
* http://kaihenzler.github.io/angular-minicolors/
* http://mjolnic.github.io/bootstrap-colorpicker/
* https://github.com/buberdds/angular-bootstrap-colorpicker/
