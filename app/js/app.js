var App = function(){
	this.pages = new Pages(this);
	this.books = new Books(this);

	this.setMenu();
	this.loadBooks();
	this.setLinks();
	this.closePage();
	this.closeBook();
	this.openPage('#home');
	this.setScroll();
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
	    	//e.preventDefault();
	    });

	    $("#home").on("click", ".book", function(){
	    	self.books.setCurrent($(this).attr("book"));
	    	self.openBook(self.books.currentBook.src);
	    });
	    $("#menu a").add("#back").on("click", function(){
	    	self.openPage(this.href);
	    });
	},
	openPage : function(href){
		this.closePage();
		this.closeBook();
		$("#back").add("#index").hide();
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
			$("#main").children().not("#book").hide();
		}
	},
	openBook : function(href, chapter){
        var self = this;
        
        // Set header icons
        $("#menu-toggle").hide();
        $("#back").add("#index").show();

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
        	//$("header").text(self.books.currentBook);
        });

        // Update the location
        window.location = "#book";
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
	}

});

var app = new App();