# Changelog

## v2.0.0

Major breaking changes

  * `ng-model` has stayed the same.
  * All the directive bindings are now passed in as an `options` object. The functionality has stayed the same and the names are the same but without `color-picker` at the front (e.g. `color-pick-swatch-pos` is now just `swatchPos`).
  * New `api` binding is available. It exposes `open` and `close` and can handle `onOpen`, `onClose`, `onChange`, `onBlur`, and `onDestroy` events.
