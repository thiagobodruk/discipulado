var App = function(){
	this.pages = new Pages(this);
	this.books = new Books(this);

	this.setMenu();
	this.loadBooks();
	this.setLinks();
	this.closePage();
	this.closeBook();
	this.openPage('#home');
}
	
$.extend(App.prototype, {
	setMenu : function(){
		var self = this;
		$("#menu li a").click(function(){
			$("#menu li").removeClass("active");
			$(this).parent().addClass("active");
			self.bs.view.toggleClose();
		});
		$("<div/>").attr("id", "black").appendTo("#outer");
		this.bs = $(".menu").add("#black").bigSlide({
			afterOpen : function(){
				$("#black").fadeIn();
			},
			afterClose : function(){
				$("#black").fadeOut();	
			}
		}).bigSlideAPI;
	},
	setLinks : function(){
		var self = this;
	    $("a").on("click", function(e){
	    	e.preventDefault();
	    });

	    $("#home").on("click", ".book", function(){
	    	self.books.setCurrent($(this).attr("book"));
	    	self.openBook(self.books.currentBook.src);
	    });
	    $("#menu a").on("click", function(){
	    	self.openPage(this.href);
	    });
	},
	openPage : function(href){
		this.closePage();
		this.closeBook();
		var id = href.split("#")[1];
		$("#main #" + id).show();
		console.log(id);
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
		if(self.books.getChapter()){
			//
		}else{
			self.books.setChapter();
		}
        if(chapter){
        	chapter = "#chapter" + chapter;
        }else{
        	chapter = (href.split("#")[1]) ? "#"+href.split("#")[1] : "#chapter1";
        }
        $("#book").load(href, function(){
        	self.closePage();
        	self.paginate(chapter);
        	//$("header").text(self.books.currentBook);
        });
	},
	closeBook : function(){
		$("#book").hide();
		$("#book").children().hide();
	},
	paginate : function(chapter){
		this.closeBook();
		$("#book").show();
		$("#book").children(chapter).show();
	},
	loadBooks : function(){
		var self = this;
		$.ajax({
			url : "books.json",
			dataType : "json",
			success : function(d){
				for(i in d){
					self.books.collection.push(new Book(d[i].name, d[i].cover, d[i].chapters, d[i].src, d[i].info));
				}
				self.pages.home(self.books.collection);
			},
			error : function(){
				return false;
			}
		});
	}

});

var app = new App();