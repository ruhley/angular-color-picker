# Changelog

## v2.1.1

#### Breaking Chnages
  * None

#### New Features
  * None

#### Bug Fixes
  * #87 fixing onBlur and onClose
  * #88 Fixing hue updating when moving in grid on rgb and hex

## v2.1.0

#### Breaking Chnages
  * Seperated the `api` into `api` and `eventApi`. This allows for shared event handling
    * `api` now has `open`, `close`, and `getElement`
    * `eventApi` now has `onOpen`, `onClose`, `onChange`, `onBlur`, and `onDestroy`

#### New Features
  * `api` has a new `getElement` function
  * `eventApi` functions now all have `api` and `color` passed in as the first arguments, and `event` if it is available

#### Bug Fixes
  * None

## v2.0.0

#### Breaking Chnages

  * All the directive bindings are now passed in as an `options` object. The functionality has stayed the same and the names are the same but without `color-picker` at the front (e.g. `color-pick-swatch-pos` is now just `swatchPos`).

#### New Features
  * New `api` binding is available. It exposes `open` and `close` and can handle `onOpen`, `onClose`, `onChange`, `onBlur`, and `onDestroy` events.

#### Bug Fixes
  * None
