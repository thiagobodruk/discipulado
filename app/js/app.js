$(function(){
	lang = getLang();
	setMenu("#nav-mobile");
});

var preload = function(){
	
}

var setLang = function(l){
	localStorage.setItem("lang", l);
}

var getLang = function(){
	var myLang = localStorage.getItem("lang");
	var l = (myLang) ? myLang : "pt";
	return l;	
}

var setMenu = function(menu){
	$(".button-collapse").sideNav();
	$(menu + " a").click(function(){
		loadContent($(this).attr("data-book"));
	});
}

var loadContent = function(book){
	var path = "xml/" + lang + ".xml book#" + book;
	console.log(path);
	$("#main h2").load(path + " name");
	$("#main article").load(path + " content");
}