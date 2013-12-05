$(function(){

	var verse = function(ref, target){
		var set = {
			key: "372cc548ef24d8fd1bbd0c0c8ed9f7b3",
			type: "json",
			mode: "bibleTextOnly",
			ref: ref
		};
		$.ajax({
			url: "http://api.biblia.com/v1/bible/content/wbtc-ptbrnt." + set.type + "?passage=" + set.ref + "&style=" + set.mode + "&key=" + set.key,
			method: "GET",
			dataType: set.type	
		}).done(function(xhr){
			$('<span></span>').text('"' + xhr.text + '"').addClass('verse-txt').insertBefore($(target));
		});
	}
	
	$('.verse').click(function(){
		var v = $(this).attr('data-verse');
		var txt = $(this).prev('span[class=verse-txt]').text();
		if(!txt){
			verse(v, this);
		}else{
			$(this).prev('span[class=verse-txt]').detach();
		}
	});
	
});