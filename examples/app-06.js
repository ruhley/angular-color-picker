var app = angular.module('app', ['ui.bootstrap', 'color.picker']);

app.controller('AppCtrl', function () {
  var modal = this;

  // Tile model properties, coming from the API
  modal.edit = {
    style: {
      color: 'rgb(255, 255, 255)'
    }
  };

  // Default (selected) colour format
  modal.colorFormatFg = 'hex';

  // Available colour formats (dropdown options)
  modal.colorFormats = ['hex', 'rgb', 'hsl'];

  modal.options = {
      format: 'hex',
      swatchPos: 'right',
      swatchBootstrap: false
  }

});
