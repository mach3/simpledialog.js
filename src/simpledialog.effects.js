(function($){

	/**
	 * Effect functions for $.SimpleDialog
	 * Add new effect by extending $.SimpleDialog.prototype.effects
	 */
	var effects = $.SimpleDialog.prototype.effects;

	effects.slide = function(open){
		var options = this.getEffectOptions(open);
		if(open){
			options.always = function(){
				$(this).css("overflow", "visible");
			};
			this.dialog.stop().css({
				visibility: "visible",
				overflow: "hidden",
				top: this.offset.top + this.offset.height / 2,
				height: 0
			})
			.animate({
				top: this.offset.top,
				height: this.offset.height
			}, options);
		} else {
			options.always = function(){
				$(this).css({
					visibility: "hidden",
					height: "auto"
				});
			};
			this.dialog.stop().animate({
				top: this.offset.top + this.offset.height / 2,
				height: 0
			}, options);
		}
	};

}(jQuery));