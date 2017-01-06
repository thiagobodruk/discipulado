var App = function(){
	this.menuState = false;
}

$.extend(App.prototype, {
	init : function(){
		this.setMenu();
	},
	toggleMenu : function(){
		if(this.menuState){
			$("#menu").animate({
				left : "-100%"
			});
			$("#black").hide();
			this.menuState = false;
		}else{
			$("#menu").animate({
				left : 0
			});
			$("#black").fadeIn();
			this.menuState = true;
		}
	},
	setMenu : function(){
		console.log("Setting menu...");
		$("#menu ul li").click(function(){
			$("#menu ul li").removeClass("active");
			$(this).addClass("active");
		});
		$("<div/>").attr("id", "black").appendTo("#outer");
	}
});

var app = new App();
$(function(){
	app.init();	
	$(".menu").click(function(){
		app.toggleMenu();
	});
	$("#black").click(function(){
		app.toggleMenu();
	});
});



