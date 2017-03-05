(function($) {
    $.fn.jVerse = function(version) {
    	
    	var version = version || "nvi";
    	var selector = this;
    	var texts = [];

		$.ajax({
        	type : "GET",
        	url : version+".json",
        	dataType : "json",
        	success : function(data){

        		$(selector).each(function(){

        			var ref = $(this).attr("data-verse");
        			var reg = new RegExp('([0-9]?[a-zA-Z]{2,3})([0-9]+)[\.|:]([0-9]+)-?([0-9]{1,3})?');
					var regex = reg.exec(ref);
					
					var myBook = null;
					var obj = {
						ref : ref,
						book : regex[1].toLowerCase(),
						chapter : parseInt(regex[2]),
						text : ""
					};

					for(i in data){
						if(data[i].abbrev == obj.book){
							myBook = data[i];
						}
					}

					/*
					console.log({
						ref : obj.ref,
						myBook : myBook
					});
					*/


					var start = parseInt(regex[3]);
					var end = parseInt(regex[4]) || parseInt(regex[3]);

					for(var i = start; i <=  end; i++){
						try{
							obj.text += myBook.chapters[obj.chapter - 1][obj.chapter][i] + " ";
						}catch(e){
							console.log("Error parsing " + obj.ref);
						}
					}

					// console.log(obj);
					console.log(this);
        			// $("<span />").text(obj.text).insertBefore(this);'

        		});

        	}
        });

    }
}(jQuery));