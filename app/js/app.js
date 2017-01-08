var App = function(){
	this.menuState = false;
	this.setMenu();
	this.setLinks();
	books.loadBooks();
}
	
$.extend(App.prototype, {
	setMenu : function(){
		var self = this;
		$("#menu li a").click(function(){
			$("#menu li").removeClass("active");
			$(this).parent().addClass("active");
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
	},
	setLinks : function(){
		var self = this;
	    $("a").on("click", function(e){
	    	e.preventDefault();
	    });
	    $("a").not("icon").not(".menu").not("#menu a").on("click", function() {
        	self.openBook(this.href);
	    });
	    $("#menu a").on("click", function(){
	    	console.log(this.href);
	    });
	},
	openPage : function(){
		
	},
	closePage : function(id){
		if(id){
			$("#main #" + id).hide();
		}else{
			$("#main").children().not("#book").hide();
		}
	},
	openBook : function(href, chapter){
        var self = this;
        if(chapter){
        	chapter = "#chapter" + chapter;
        }else{
        	chapter = (href.split("#")[1]) ? "#"+href.split("#")[1] : "#chapter1";
        }
        $("#book").load(href, function(){
        	self.closePage();
        	self.paginate(chapter);
        });
        console.log(chapter);
	},
	closeBook : function(){
		$("#book").children().hide();
	},
	paginate : function(chapter){
		this.closeBook();
		$("#book").children(chapter).show();
	}

});

var pages = new Pages();
var books = new Books();
var app = new App();