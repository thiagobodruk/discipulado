var App = function(){
	this.pages = new Pages();
	this.books = new Books();
	this.menuState = false;
	this.indexState = false;

	this.setMenu();
	this.setIndex();
	this.setBlack();
	this.loadBooks();
	this.setLinks();
	this.closePage();
	this.closeBook();
	this.openPage('#home');
	//this.openPage('#settings');
	this.setScroll();
}
	
$.extend(App.prototype, {
	toggleIndex : function(){
		if(this.indexState){
			this.indexState = false;
			$("#index").velocity({
				right : "-100%"
			});
			$("#black").hide();
		}else{
			this.indexState = true;
			$("#index").velocity({
				right : "0px"
			});
			$("#black").fadeIn();
		}
	},
	setIndex : function(){
		var self = this;
		// Set index
	    $("#index-toggle").add("#index .close").on("click", function(){
	    	self.toggleIndex();
	    });
	    $("#index").on("click", "li", function(){
	    	self.openBook(self.books.currentBook.src, parseInt($(this).attr("chapter")) + 1);
	    	self.toggleIndex();
	    });
	},
	toggleMenu : function(){
		if(this.menuState){
			this.menuState = false;
			$("#menu").velocity({
				left : "-100%"
			});
			$("#black").hide();
		}else{
			this.menuState = true;
			$("#menu").velocity({
				left : "0"
			});
			$("#black").fadeIn();
		}
	},
	setMenu : function(){
		var self = this;
		$("#menu li a").click(function(){
			$("#menu li").removeClass("active");
			$(this).parent().addClass("active");
			self.toggleMenu();
		});
		$("<div/>").attr("id", "black").appendTo("#outer");
		
		$(".menu").on("click", function(){
			self.toggleMenu();
		});
	},
	setBlack : function(){
		var self = this;
		$("#black").on("click", function(){
			if(self.menuState){
				self.toggleMenu();
			}
			if(self.indexState){
				self.toggleIndex();
			}
		});
	},
	setLinks : function(){
		var self = this;
	    $("a").on("click", function(e){
	    	//e.preventDefault();
	    });

	    $("#home").on("click", ".book", function(){
	    	self.books.setCurrent($(this).attr("book"));
	    	self.openBook(self.books.currentBook.src);
	    });
	    $("#menu a").add("#back").on("click", function(){
	    	self.openPage(this.href);
	    });
	    $("#previous").on("click", function(){
	    	self.previousChapter();
	    });
	    $("#next").on("click", function(){
	    	self.nextChapter();
	    });
	},
	openPage : function(href){
		this.closePage();
		this.closeBook();
		$("#back").add("#index-toggle").hide();
		$("#menu-toggle").show();

		var id = href.split("#")[1];

		// Set the page's title
		$("header").removeClass("light");
		$("header h1").text($("#" + id).attr("title"));

		// Set the page's footer
		$("footer").hide();
		
		// Fix the windows scroll
		$("#main #" + id).show();
		setTimeout(function(){
			window.scrollTo(0, 0);
		}, 1);
	},
	closePage : function(id){
		if(id){
			$("#main #" + id).hide();
		}else{
			$("#main").children().not("#book").not("#index").hide();
		}
	},
	openBook : function(href, chapter){
        var self = this;
        
        // Set header icons
        $("#menu-toggle").hide();
        $("#back").add("#index-toggle").show();

        // Define the chapter id
        if(chapter){
        	chapter = "#chapter" + chapter;
        }else{
        	chapter = (href.split("#")[1]) ? "#"+href.split("#")[1] : "#chapter1";
        }

        // Set the page's title
        $("header h1").text(this.books.currentBook.name);
        $("header").addClass("light");

        // Set the page's footer
		$("footer").show();

        // Load the book content
        $("#book").load(href, function(){
        	self.closePage();
        	self.paginate(chapter);
        });

        // Set currentChapter
        var c = parseInt(chapter.split("#chapter")[1]);
        this.books.currentBook.currentChapter = c;
        if(this.books.currentBook.currentChapter){
        	chapter = "#chapter" + this.books.currentBook.currentChapter;
        }
        if(c < 2){
        	$("#previous").hide();
        }else{
        	$("#previous").show();
        }
        if(c >= this.books.currentBook.length){
        	$("#next").hide();
        }else{
        	$("#next").show();
        }

        // Update the location
        window.location = "#book";

        // Populate index
        $("#index ul").empty();

        for(i in this.books.currentBook.chapters){
        	var t = this.books.currentBook.chapters[i].name;
        	$("<li />").text(t).attr("chapter", i).appendTo("#index ul");
        }

        setTimeout(function(){
			window.scrollTo(0, 0);
		}, 1);

		$(".verse").jVerse();

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
	},
	setScroll : function(){
		var lastScrollTop = 0;
		$(window).scroll(function(event){
			var st = $(this).scrollTop();
			if (st > lastScrollTop){
				$("header.light").hide();
			}else{
				$("header.light").show();
			}
			lastScrollTop = st;
		});
	},
	toast : function(message){
		$("<div />").text(message).addClass("toast").fadeIn(400).delay(3000).fadeOut(400).appendTo("#outer");
	},
	previousChapter : function(){
		if(this.books.currentBook.currentChapter > 0){
			this.openBook(this.books.currentBook.src, this.books.currentBook.currentChapter - 1);	
		}
	},
	nextChapter : function(){
		if(this.books.currentBook.currentChapter < this.books.currentBook.length){
			this.openBook(this.books.currentBook.src, this.books.currentBook.currentChapter + 1);	
		}
	}

});

var app = new App();