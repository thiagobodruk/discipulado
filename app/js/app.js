var App = function(){
	this.menuState = false;
}

var app = new App();
$.extend(App.prototype, {
	init : function(){
		this.setMenu();
		this.setBooks();
		this.loadPage("#home");
		$(".menu").click(function(){
			app.toggleMenu();
		});
		$("#black").click(function(){
			app.toggleMenu();
		});
		$("#menu a").not("header a").click(function(){
			var id = $(this).attr("href");
			app.loadPage(id);
			app.toggleMenu();
		});
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
		$("#menu ul li").click(function(){
			$("#menu ul li").removeClass("active");
			$(this).addClass("active");
		});
		$("<div/>").attr("id", "black").appendTo("#outer");
	},
	setBooks : function(){
		var d = null;
		$.ajax({
			url: "books.xml",
			dataType: "text",
			success: function(data){
				$(data).find("book").appendTo("#main");
				$("book").each(function(){
					$(this).prepend($("<h2/>").text($(this).attr("name")));
				});
				$("chapter").each(function(){
					$(this).prepend($("<h3/>").text($(this).attr("name")));
				});
				$("book").hide();
			}
		});
	},
	loadPage : function(id){
		$("#main").children().hide();
		$(id).show();
		$(window).scrollTop(0);
	},
});

$(function(){
	app.init();	
});



