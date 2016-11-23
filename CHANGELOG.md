# Changelog

## v2.7.1

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  *  Bug #127 add default lightness for round color picker

## v2.7.0

#### Breaking Changes
  * None

#### New Features
  * Feature #126 Add open/closed class
  * Feature #125 add show/hide control

#### Bug Fixes
  *  None

## v2.6.2

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  *  Bug #124 remove some rounding that could interfere when translating between color types

## v2.6.1

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Bug #123 Add type to buttons to not interfere with form submit buttons

## v2.6.0

#### Breaking Changes
  * None

#### New Features
  * New saturation and lightness options

#### Bug Fixes
  * Bug #120 - Set $touched on blur
  * Fixing up color calculation in the differences between square and round

## v2.5.0

#### Breaking Changes
  * None

#### New Features
  * Improvement #116 Allow access to $scope

#### Bug Fixes
  * None

## v2.4.8

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Bug #115 - Touch events not getting proper position

## v2.4.7

#### Breaking Changes
  * None

#### New Features
  * Pressing escape will close the popup panel

#### Bug Fixes
  * Bug #113 - Tab focus opens panel, tab blur does not close it

## v2.4.6

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Bug #109 - Properly remove event listeners on destroy

## v2.4.5

#### Breaking Changes
  * None

#### New Features
  * Added `id` and `name` to the options object

#### Bug Fixes
  * None

## v2.4.4

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Bug - First change event was not firing if mouse drag

## v2.4.3

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Bug #103 error creating options if none provided

## v2.4.2

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Bug #102 non assign error if options was set in html

## v2.4.1

#### Breaking Changes
  * None

#### New Features
  * New `required` option

#### Bug Fixes
  * None

## v2.4.0

#### Breaking Changes
  * None

#### New Features
  * New `ColorPickerOptions` decorator

#### Bug Fixes
  * Add import for `tinycolor` for webpack

## v2.3.0

#### Breaking Changes
  * None

#### New Features
  * New `round` option to show a round color picker

#### Bug Fixes
  * None

## v2.2.0

#### Breaking Changes
  * None

#### New Features
  * New `hue` option to show or hide the hue selector
  * New `close`, `clear` and `reset` options to show extra buttons

#### Bug Fixes
  * Bug #82 Support touch events

## v2.1.6

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Bug #92 Fire click would trigger onChange twice

## v2.1.5

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Bug #91 setDirty being called on instantiation

## v2.1.4

#### Breaking Changes
  * None

#### New Features
  * New `placeholder` option

#### Bug Fixes
  * None

## v2.1.3

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Don't presume a default color

## v2.1.2

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * Delaying init until directive link function, to fix a bug in complex multi color picker pages

## v2.1.1

#### Breaking Changes
  * None

#### New Features
  * None

#### Bug Fixes
  * #87 fixing onBlur and onClose
  * #88 Fixing hue updating when moving in grid on rgb and hex

## v2.1.0

#### Breaking Changes
  * Seperated the `api` into `api` and `eventApi`. This allows for shared event handling
    * `api` now has `open`, `close`, and `getElement`
    * `eventApi` now has `onOpen`, `onClose`, `onChange`, `onBlur`, and `onDestroy`

#### New Features
  * `api` has a new `getElement` function
  * `eventApi` functions now all have `api` and `color` passed in as the first arguments, and `event` if it is available

#### Bug Fixes
  * None

## v2.0.0

#### Breaking Changes

  * All the directive bindings are now passed in as an `options` object. The functionality has stayed the same and the names are the same but without `color-picker` at the front (e.g. `color-pick-swatch-pos` is now just `swatchPos`).

#### New Features
  * New `api` binding is available. It exposes `open` and `close` and can handle `onOpen`, `onClose`, `onChange`, `onBlur`, and `onDestroy` events.

#### Bug Fixes
  * None
