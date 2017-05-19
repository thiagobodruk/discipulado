var Pages = function(parent){
	var parent = parent;
}

$.extend(Pages.prototype, {

	home : function(books){
		var name = null;
		var cover = null;
		var src = src;
		for(i in books){
			i = parseInt(i);
			name = books[i].name;
			cover = books[i].cover;
			src = books[i].src;
			info = books[i].info;
			
			var book = $("<div/>").attr("book", i).addClass("book");
			var img = $("<img />").addClass("cover").attr("src", cover).appendTo(book);
			var description = $("<div />").addClass("description").appendTo(book);
			var title = $("<h3 />").text(name).appendTo(description);
			var info = $("<p />").text(info).appendTo(description);
			$(book).appendTo("#home");
		}
	}

});