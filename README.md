angularjs-color-picker
=====================

AngularJS Color Picker Directive

Installation
=====
* Get through bower
```shell
bower install angularjs-color-picker --save-dev
```

* Include tinycolor.js, angularjs-color-picker.js and angularjs-color-picker.css
```html
    <link rel="stylesheet" href="bower_components/angularjs-color-picker/angularjs-color-picker.min.css" />

    <script src="bower_components/tinycolor/tinycolor"></script>
    <script src="bower_components/angularjs-color-picker/angularjs-color-picker.min.js"></script>
```


* Add the module to your app
```javascript
angular.module('app', ['color.picker']);
```

* Include in your view
```html
<color-picker ng-model="myColor"></color-picker>
```

Options
=====
If a list is given then choose one of the items. The first item in the list will be the default.
```html
<color-picker
    ng-model="" <!-- only required field -->
    color-picker-format="'hsl', 'hsv', 'rgb', 'hex', 'hex8'"
    color-picker-alpha="true, false"
    color-picker-swatch="true, false"
    color-picker-swatch-pos="'left', 'right'"
    color-picker-swatch-bootstrap="true, false"
    color-picker-swatch-only="true, false"
    color-picker-pos="'bottom left', 'bottom right', 'top left', 'top right'"
    color-picker-case="'upper', 'lower'"
></color-picker>
```

Requirements
=====
* angularjs
* bootstrap - looking at removing in future versions if requested enough (currently only used for styling the input text box)
* tinycolor.js - looking at removing in future versions if requested enough (33kb not minified)

NO requirement for jQuery!

Inspiration
=====
Inspiration and code taken from projects like
* http://kaihenzler.github.io/angular-minicolors/
* http://mjolnic.github.io/bootstrap-colorpicker/
* https://github.com/buberdds/angular-bootstrap-colorpicker/
