var App = function(){
	return false;
}

$.extend(App.prototype, {
	init : function(){
		this.menu();
		$.mobile.defaultPageTransition = "none";
	},
	menu : function(){
		$("#menu").panel();
		$(".menu").click(function(){
			$("#menu").panel("toggle");
		});
		$("#menu ul li").click(function(){
			$("#menu ul li").removeClass("active");
			$(this).addClass("active");
		});
	}
});

$(function(){
	var app = new App();
	app.init();	
})



