angular-colour-picker
=====================

AngularJS Colour Picker Directive

Requirements
=====
* tinycolor.js - looking at removing in future versions
NO requirement for jQuery!

Installation
=====
* Include tinycolor.js, angular-color-picker.js and angular-color-picker.css
* Add the module line
```javascript
angular.module('app', [
        'color-picker'
    ]);
```
* Include in your view
```javascript
<color-picker ng-model="myColor"></color-picker>
```


Inspiration and code taken from projects like
* http://kaihenzler.github.io/angular-minicolors/
* http://mjolnic.github.io/bootstrap-colorpicker/
* https://github.com/buberdds/angular-bootstrap-colorpicker/
