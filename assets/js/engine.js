$(function(){

	// localStorage.clear();
	
	// Recupera as configurações
	var t, f, setup, config = localStorage.getItem("config");
	var setConfig = function(){
		setup = $("#config form").serialize();
		localStorage.setItem("config", setup);
	}
	
	// Recupera as Configurações
	var getConfig = function(){
		config = localStorage.getItem("config");
		return setup;
	}
	
	// Configura a aplicação
	var configApp = function(){
		setup = (localStorage.getItem("config")) ? localStorage.getItem("config") : "fonte=roboto&tamanho=normal";
		split = setup.split("&");
		f = split[0].split("=");
		t = split[1].split("=");
		$("article, article a, blockquote").not("footer, footer a").removeClass("tahoma times roboto").addClass(f[1]).removeClass("small normal big").addClass(t[1]);
	}
	
	// Ajustas as opções da tela de Configurações
	var configOptions = function(){
		$("#fonte option").prop("selected", false);
		$("#tamanho option").prop("selected", false);
		$("#fonte option[value=" + f[1] + "]").prop("selected", true);
		$("#tamanho option[value=" + t[1] + "]").prop("selected", true);
	}
	
	// Configura os eventos dos botões
	$("#config :button:eq(0)").click(function(){
		setConfig();
		configApp();
	});
	$("#config :button:eq(1)").click(function(){
		loadPage(0);
	});
	
	// Verifica a versão do Android
	var version;
	var checkVersion = function(){
		var ua = navigator.userAgent;
		if(ua.indexOf("Android") >= 0){
			version = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
		}else{
			version = null;
		}
		// console.log(version);
		// version = 2.3;
		return version;
	}
	
	// Configura a array de páginas
	var pages;
	var page = parseInt(localStorage.getItem("page"));
	var setPages = function(){
		var p = $("article").not("article#config");
		pages = jQuery.makeArray(p);
		pages[-1] = $("article#config");
		pages[-1].id = "config";
		// Define a página inicial
		if(!page){
			page = 0;
		}
		// console.log(pages);
	}
	
	// Checa se é o #index e esconde o menu
	var checkPage = function(n){
		if(n < 1){
			$(".menu").hide();
		}else{
			$(".menu").show();
		}
	}
	
	// Carrega as páginas
	var loadPage = function(n){
		configApp();
		checkPage(n);
		$("article").hide();
		localStorage.setItem("page", n);
		$(window).scrollTop(0);
		$(pages[n]).show();
		console.log("pages[" + n + "] : " + pages[n].id);
	}
	
	// Configura o Menu
	var setMenu = function(){
		
		$("<nav></nav>").addClass("menu").insertBefore("#page");
		
		// Verifica a versão
		if(checkVersion() >= 3.0 || !checkVersion()){
			$(".menu").addClass("menu-fixed");
		}else{
			$("<nav></nav>").addClass("menu").insertAfter("#page");
			$(".menu").addClass("menu-relative");
		}
		
		// Configura o menu
		var menu = $(".menu");
		$("<a>&lt;</a>").addClass("backward").appendTo(menu);
		$("<a>&equiv;</a>").addClass("home").appendTo(menu);
		$("<a>Aa</a>").addClass("config").appendTo(menu);
		$("<a>&gt;</a>").addClass("forward").appendTo(menu);	
		
		// Configura o evento que esconde/revela o menu
		$("#page").dblclick(function(){
			$(".menu").fadeToggle();
		});
		
		// Configura a navegação do menu
		$(".menu a").click(function(){
			switch($(this).attr("class")){
				case 'backward':
					page = (page==0) ? pages.length-1 : page-1;
					break;
				case 'home':
					page = 0;
					break;
				case 'config':
					page = -1;
					configOptions();
					break;
				case 'forward':
					page = (page==pages.length-1) ? 0 : page+1;
					break;
			}
			loadPage(page);
		});
		
		// Numera os capítulos do menu
		var i = 1;
		$("ol.index li a").each(function(){
			$(this).attr("chap", i++);
		});
		
		// Fecha os menus
		$("ol.index").hide();
		
		// Abre os menus
		$("#index h2").click(function(){
			$(this).next("ol.index").siblings("ol.index").slideUp();
			$(this).next("ol.index").slideToggle();
			$(window).scrollTop(0);
		});
		
		// Configura o evento de clique do menu inicial
		$("ol.index li a").click(function(){
			page = parseInt($(this).attr("chap"));
			loadPage(page);
		});	
	}
	setPages();
	setMenu();
	loadPage(page);
});