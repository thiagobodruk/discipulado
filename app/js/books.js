var Books = function(){
	this.collection = [];
	this.currentBook = null;
}
$.extend(Books.prototype, {

	loadBooks : function(){
		var self = this;
		$.ajax({
			url : "books.json",
			dataType : "json",
			success : function(d){
				for(i in d){
					self.collection.push(new Book(d[i].name, d[i].cover, d[i].chapters, d[i].src));
				}
			},
			error : function(){
				return false;
			}
		});
	},
	setBook : function(name, cover, chapters, src){
		this.collection.push(new Book(name, cover, chapters, src));
	},
	getBook : function(n){
		return this.collection[n];
	},
	setCurrent : function(n){
		return this.currentBook = this.collection[n];
	}

});

var Book = function(name, cover, chapters, src){
	this.name = name;
	this.cover = cover;
	this.chapters = chapters;
	this.src = src;
	this.content = null;
	this.currentChapter = null;
	this.setContent();
}
$.extend(Book.prototype, {
	setContent : function(){
		var self = this;
		$.get(self.src, function(data){
			self.content = data;
		});
	},
	setChapter : function(n){
		this.loadChapter(n);
		return this.currentChapter = n;
	}
});