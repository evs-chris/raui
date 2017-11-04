# Ractive Material-ish Components

This collection of components and plugins is handy for making desktop- and mobile-friendly frontend applications with [Ractive](https://ractive.js.org). They try to stay somewhat close to [Material](https://material.io/) where it makes sense.

__Note:__ This is still very much a work in progress. The components here are fairly complete and in use in a number of projects, but the documentation, build, and testing setups are certainly incomplete to missing entirely.

## Building

* Clone the repository e.g. `git clone https://github.com/evs-chris/ractive-materialish.git ractive-materialish`
* `cd ractive-materialish` or wherever you cloned
* `npm install`
* `npm run build`

If you happen to have `http-server`, you can run it in the project root to play with the demo.

## The List of Components

### Shell

Every app needs a good wrapper, and this aims to be it. The Shell provides three sections, `<left>`, `<center>`, and `<right>`, which are managed responsively, so the left and right containers are automatically shown and hidden based on the available width of the window, whereas the center is always rendered. The Shell also exposes hooks to dynamically show and hide the left and right sides.

The Shell also contains support for toasting, because most apps also need a convenient way to give the user feedback.

### Tabs

Your fairly standard tab component that allows a good bit of control over presentation. Tabs are specified as child content elements named `tab` e.g.

```html
<tabs>
  <tab title="First">I am tab one.</tab>
  <tab title="Second">I am tab two.</tab>
</tabs>
```

At construction time, the content tabs are gathered up into a list structure that is available to be manipulated at runtime, and there's a full tab management API available for dynamically adding and removing tabs.

### Windows

This is a slightly (okay, very) unusual set of interdependent components for a modern webapp. It consists of two components, the Host and the Window, where the Host is meant to be included directly in your template and the Window is meant to be extended.

#### Host

A Host contains a list of Windows for which it manages positioning, sizing, and stacking. The Host also manages blocking (modality) of windows that prevent other windows from being the target of interaction. Blocking can take place globally as well, so you can easily implement, for instance, a message box that blocks the entire host until it is closed.

The Host has special support for maximized windows that allows you to render special content at the top of the Host while a window is maximized. This is typically used to integrate the window controls and title into an AppBar. Additionally, there is a mode, controlled by `@style.window.maxFrom`, that will automatically maximize windows when its environment gets narrower than the set value.

The Host _also_ has support for toasting because with windowed applications, it's much easier to get to the Host that it may be to access a Shell above it.

#### Window

Windows are instantiated and attached to Host, where they are displayed within the Host's bounds. Windows may be movable, resizable, closable, maximizable, and minify-able.  Once a window is minimized, there's no built-in UI to restore it, but you can hook the Host's window list into a Menu fairly easily to provide access to raise and restore windows.

### Menu

This is a vertical menu that supports items with nested children, sections, and containers with any old content. Horizontal menus tend not to scale well at all below a certain width, and nobody likes horizontal scrolling.

### Toggle

Your standard boolean toggle that looks like an on/off switch. This is actually a macro partial rather than a component, so it's fairly light weight. It also supports `null` or `undefined` states with an intermediate position for all of your parties with three-state booleans.

### Split

A two-sided splitter - either vertical or horizontal.

### Card

A Material card macro partial that is mostly a placeholder pending me actually needing full card functionality like headers, buttons, tabs, and image stuff. Right now I mostly just use them as convenient blocks for lists of items. They play really well with the grid decorator.

### JSONEditor

This is a tree-style data editor that allows managing objects and arrays filled with primitive values. It can be set up as read only to just display the data or as editable  to allow adding and removing keys and indices and changing values.

## The List of Decorators

### Grid

The grid decorator takes your usual CSS grid (no, not `display: grid`) and makes it container-aware, meaning that it will respond to its container changing sizes rather than just the window. It does so by listening to both window resize events and any Ractive resize events that happen to bubble up to its root instance.

You can also customize the breakpoints and sizes available in the grid fairly easily, as it provides a CSS function to be included in your main instance that handles the breakpoints and their corresponding sizes. The defaults cover a range from tiny (t at 0 to 20em) to ginormous (g at 150em+) and halves, thirds, quarters, fifths, and eighths for the smaller breakpoints up to tenths, twelfths, twentieths, twenty-fourths, thirty-seconds, and sixty-fourths for the largest.

### Forms

Material forms a little bit polarizing, but this decorator tries to take a fairly unobtrusive approach. You wrap your input element in a `label` with the `field` decorator, and the decorator handles the rest based on the content of the label. It also provides a CSS function to apply the styling at the root of your app.

## Theming

This collection leans heavily on Ractive's dynamic css support for theming, and it does so using a series of color quads like `fg1, fga1, bg1, and bga1`. Those stand for foreground, foreground alternate, background, and background alternate for the first quad. The second quad is suffixed with a 2 rather than a 1. The foregrounds and backgrounds in a quad are meant to be contrasted enough that they can safely be used in any fore/back combination and still be legible.
