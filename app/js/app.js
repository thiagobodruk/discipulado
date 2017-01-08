var App = function(){
	this.menuState = false;
	this.setMenu();
	books.loadBooks();
}
	
$.extend(App.prototype, {
	setMenu : function(){
		var self = this;
		$("#menu ul li").click(function(){
			$("#menu ul li").removeClass("active");
			$(this).addClass("active");
		});
		$("<div/>").attr("id", "black").appendTo("#outer");
		$(".menu").add("#black").bigSlide({
			afterOpen : function(){
				$("#black").fadeIn();
			},
			afterClose : function(){
				$("#black").fadeOut();	
			}
		});
	}

});

var pages = new Pages();
var books = new Books();
var app = new App();