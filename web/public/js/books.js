var Books = function(){ 
	this.collection = [];
	this.currentBook = null;
	this.currentChapter = null;
}
$.extend(Books.prototype, {

	setBook : function(name, cover, chapters, src, info){
		this.collection.push(new Book(name, cover, chapters, src, info));
	},
	getBook : function(n){
		return this.collection[n];
	},
	setCurrent : function(n){
		return this.currentBook = this.collection[n];
	},
	getChapter : function(){
		//
	},
	setChapter : function(n){
		this.currentChapter = n;
	}
});

var Book = function(name, cover, chapters, src, info){
	this.name = name;
	this.cover = cover;
	this.chapters = chapters;
	this.src = src;
	this.content = null;
	this.info = info;
	this.currentChapter = null;
	this.length = this.chapters.length;
	// this.setContent();
}
$.extend(Book.prototype, {
	setContent : function(){
		var self = this;
		$.get(self.src, function(data){
			self.content = data;
		});
	}
});