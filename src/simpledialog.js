(function($, win, doc){

	/**
	 * SimpleDialog class
	 * ------------------
	 */
	$.SimpleDialog = function($node){
		this.initialize($node);
	};
	(function(){

		/**
		 * Attributes:
		 * - node:jQueryObject 
		 * - dialog:jQueryObject
		 * - overlay:jQueryObject
		 * - offset:Object
		 */
		this.node = null;
		this.dialog = null;
		this.overlay = null;
		this.offset = null;

		/**
		 * Actions available in $.fn.dialog()
		 */
		this.actions = [
			"init",
			"open", 
			"close",
			"destroy"
		];

		/**
		 * Options:
		 * - className:String = CSS class name set for dialog
		 * - width:Integer = Dialog width
		 * - overlayColor:String = Overlay background color
		 * - overlayOpacity:Number = Overlay opacity
		 * - effect:String = Effect method name for opening/closing dialog
		 * - openEasing:String = Easing function name for opening dialog
		 * - openDuration:Integer = Duration time for opening dialog
		 * - closeEasing:String = Easing function name for closing dialog
		 * - closeDuration:Integer = Duration time for closing dialog
		 * - closeButton:String = Selector expression for close button
		 * - closeOnClickOverlay:Boolean = Whether close dialog when overlay is clicked or not
		 */
		this.options = {
			className: "simple-dialog",
			width: 640,
			overlayColor: "#000",
			overlayOpacity: 0.8,

			effect: "fade",
			openEasing: "swing",
			openDuration: 300,
			closeEasing: "swing",
			closeDuration: 100,

			closeButton: ".button-close",
			closeOnClickOverlay: true
		};

		/**
		 * Effects for opening/closing dialog
		 * These are assigned $.SimpleDialog instance as "this"
		 * An argument passed is boolean for opening or closeing dialog
		 */
		this.effects = {
			"fade": function(open){
				var options = this.getEffectOptions(open);
				if(open){
					this.dialog.css({
						visibility: "visible",
						opacity: 0
					})
					.animate({ opacity: 1 }, options);
				} else {
					this.dialog.animate({ opacity: 0 }, options);
				}
			},
			"none": function(open){
				var visible = open ? "visible" : "hidden";
				this.dialog.css("visibility", visible);
			}
		};

		/**
		 * Initialize instance
		 * @constructor
		 * @param jQueryObject node
		 */
		this.initialize = function(node){
			this.node = node;
			this.options = $.extend({}, this.options);
		};

		/**
		 * Initialize dialog and overlay
		 * @param Object options
		 */
		this.init = function(options){
			this.config(options);
			this.getOverlay();
			this.getDialog();
		};

		/**
		 * Open the dialog
		 * @param Object options
		 */
		this.open = function(options){
			this.init(options);
			this.overlay.show();
			this.dialog.css(this.getOffset());
			this.effects[this.get("effect")].call(this, true);
		};

		/**
		 * Close the dialog
		 */
		this.close = function(){
			this.effects[this.get("effect")].call(this, false);
			this.overlay.hide();
		};

		/**
		 * Remove overlay and dialog node
		 */
		this.destroy = function(){
			this.overlay.remove();
			this.dialog.remove();
		};

		/**
		 * Configure options
		 * @param Object options
		 */
		this.config = function(options){
			$.extend(this.options, options);
		};

		/**
		 * Get value from options by key
		 * @param String key
		 */
		this.get = function(key){
			return this.options[key];
		};

		/**
		 * Get or create overlay node, set it as instance member
		 * @return jQueryObject
		 */
		this.getOverlay = function(){
			if(! this.overlay){
				this.overlay = $("<div>")
				.css({
					display: "none",
					position: "absolute",
					left: 0,
					top: 0,
					width: "100%",
					height: "100%",
					backgroundColor: this.get("overlayColor"),
					opacity: this.get("overlayOpacity")
				})
				.prependTo("body");
				if(this.get("closeOnClickOverlay")){
					this.overlay.on("click", $.proxy(this.close, this));
				}
			}
			return this.overlay;
		};

		/**
		 * Get or create dialog node, set it as instance member
		 * @return jQueryObject
		 */
		this.getDialog = function(){
			if(! this.dialog){
				this.dialog = $("<div>")
				.css({
					position: "absolute",
					visibility: "hidden",
					width: this.get("width")
				})
				.addClass(this.get("className"))
				.append(this.node)
				.insertAfter(this.overlay)
				.on("click", this.get("closeButton"), $.proxy(this.close, this));
			}
			return this.dialog;
		};

		/**
		 * Calculate width, height and position, set them as instance member
		 * @retnrn Object
		 */
		this.getOffset = function(){
			var client = {
				scroll: $(window).scrollTop(),
				width: win.innerWidth || doc.documentElement.clientWidth,
				height: win.innerHeight || doc.documentElement.clientHeight
			};
			this.offset = {
				width: this.dialog.width(),
				height: this.dialog.height()
			};
			this.offset.left = (client.width - this.offset.width) / 2;
			this.offset.top = ((client.height - this.offset.height) / 2) + client.scroll;
			return this.offset;
		};

		/**
		 * Get options for $.fn.animate()
		 * Duration, easing and callback set in options
		 * `open` is opening or closing dialog
		 * @param Boolean open
		 */
		this.getEffectOptions = function(open){
			var prefix, my;
			prefix = open ? "open" : "close";
			my = this;
			return {
				duration: this.get(prefix + "Duration"),
				easing: this.get(prefix + "Easing"),
				complete: function(){
					my.node.trigger("dialog" + my._capitalize(prefix));
				}
			};
		};

		/**
		 * Capitalize string
		 * @param String str
		 * @return String
		 */
		this._capitalize = function(str){
			return str.replace(/^[a-z]/, function(s){
				return s.toUpperCase();
			})
		};

	}).call($.SimpleDialog.prototype);


	/**
	 * Create dialog or operate dialog by passing named action
	 * @param String action
	 * @param Object options
	 * @return jQueryObject
	 */
	$.fn.dialog = function(action, options){
		var dialog;
		if(! this.data("dialog")){
			this.data("dialog", new $.SimpleDialog(this));
		}
		dialog = this.data("dialog");
		if($.inArray(action, dialog.actions) >= 0){
			dialog[action](options);
		}
		return this;
	};

}(jQuery, window, document));