
# SimpleDialog.js

This is just light weight dialog script inspired by jQueyUI's dialog widget.

jQueryUI is awesome library, but quite heavy, then I wrote this for simple usage.  
This doesn't have much feature like image gallery, dragging, or iframe content.  
If you want them, use jQuery UI, colorbox or something better.


## Usage

### $.fn.dialog( action:String, options:Object )

```javascript
var $dialog = $( /* some element */ );

$dialog.dialog("show", {
    width: 320,
    overlayColor: "#fff",
    overlayOpacity: 0.5
});

$dialog.on("dialogClose", function(){
    console.log("Dialog is closed");
});
```

### Actions

- "init" : Initialize dialog, doesn't open yet.
- "show" : Open the dialog. Before opening, initialize if not yet.
- "close" : Close the dialog
- "destroy" : Remove dialog node and overlay.

"init" and "show" accept options as argument.

### Options

- className:String ("simple-dialog") : Class name which is set to dialog element
- width:Integer (640) : Dialog width
- overlayColor:String (#000) : Overlay color
- overlayOpacity:Number (0.8) : Overlay opacity
- effect:String ("fade") : Effect method name
- openEasing:String ("swing") : Easing function name for opening dialog
- closeEasing:String ("swing") : Easing function name for closing dialog
- openDuration:Integer (300) : Duration time for opening dialog
- closeDuration:Integer (100) : Duration time for closing dialog
- closeButton:String (".button-close") : Selector expression for close button
- closeOnClickOverlay:Boolean (true) : Whether close the dialog when overlay is clicked or not

### Effects

SimpleDialog has only 3 effects.

- "fade" : Fade in and out
- "slide" : Similar to jQueryUI's "Clip" effect, buy more simple
- "none" : Imidiately show the dialog without animation

### Events

The element which is initialized as SimpleDialog triggered two kinds of events.

- "dialogOpen" : Fired when the dialog opened
- "dialogClose" : Fired when the dialog closed


## Author

mach3 @ <http://github.com/mach3>

- [Blog](http://blog.mach3.jp)
- [Website](http://www.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)