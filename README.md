# Angular Color Picker

Vanilla AngularJS Color Picker Directive with no requirement on jQuery

## Installation

#### Bower

```shell
bower install angularjs-color-picker --save
```

#### Npm
```shell
npm install angularjs-color-picker --save
```

#### Usage

* Include files

    * Bower

    ```html
    <link rel="stylesheet" href="bower_components/angular-color-picker/dist/angularjs-color-picker.min.css" />
    <!-- only include if you use bootstrap -->
    <link rel="stylesheet" href="bower_components/angular-color-picker/dist/themes/angularjs-color-picker-bootstrap.min.css" />

    <script src="bower_components/tinycolor/dist/tinycolor-min.js"></script>
    <script src="bower_components/angular-color-picker/dist/angularjs-color-picker.min.js"></script>
    ```

    * Node

    ```html
    <link rel="stylesheet" href="node_modules/angularjs-color-picker/dist/angularjs-color-picker.min.css" />
    <!-- only include if you use bootstrap -->
    <link rel="stylesheet" href="node_modules/angularjs-color-picker/dist/themes/angularjs-color-picker-bootstrap.min.css" />

    <script src="node_modules/tinycolor2/dist/tinycolor2-min.js"></script>
    <script src="node_modules/angular-color-picker/dist/angularjs-color-picker.min.js"></script>
    ```


* Add the module to your app
```javascript
angular.module('app', ['color.picker']);
```

* Include in your view
```html
<color-picker ng-model="myColor"></color-picker>
```

## Options

HTML - Only ```ng-model``` is required. If supplying an api it must be a unique object per color picker. However the event api can be shared among color pickers.

```html
<color-picker
    ng-model="color"
    options="options"
    api="api"
    event-api="eventApi"
></color-picker>
```
Javascript

```js
$scope.color = '#FF0000';

// options - if a list is given then choose one of the items. The first item in the list will be the default
$scope.options = {
    disabled: [false, true],
    format: ['hsl', 'hsv', 'rgb', 'hex', 'hex8'],
    alpha: [true, false],
    swatch: [true, false],
    swatchPos: ['left', 'right'],
    swatchBootstrap: [true, false],
    swatchOnly: [true, false],
    pos: ['bottom left', 'bottom right', 'top left', 'top right'],
    case: ['upper', 'lower'],
    inline: [false, true],
};

// exposed api functions
$scope.api.open();
$scope.api.close();
$scope.api.getElement();

// api event handlers
$scope.eventApi = {
    onChange: function(api, color, $event) {},
    onBlur: function(api, color, $event) {},
    onOpen: function(api, color, $event) {},
    onClose: function(api, color, $event) {},
    onDestroy: function(api, color) {},
};
```

## Requirements

* angularjs (v1.3 and higher)
* tinycolor.js (18.8 KB minified)

NO requirement for jQuery!

## Inspiration

Inspiration and code taken from projects like
* http://kaihenzler.github.io/angular-minicolors/
* http://mjolnic.github.io/bootstrap-colorpicker/
* https://github.com/buberdds/angular-bootstrap-colorpicker/
