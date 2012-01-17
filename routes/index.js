
/*
 * GET home page.
 */
var request = require('request');
var jsdom = require('jsdom');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};
exports.sapea = function(req,res){
	var uri = "http://www2.chileautos.cl/cemagic.asp?region=0&ciudad=0&tipo=Todos&carroceria=&maresp=4&Modelo=&combustible=0&kilom=&c_otros=&cili=0&cilf=0&vendedor=0&ai=1928&af=2012&pi=0&pf=1000000000&fecha_ini=&fecha_fin=&disp=1&dea=50&pag=1&formulario=Busqueda_Avanzada";
	
	request({uri: uri}, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	jsdom.env(
				{
			  		html: body,
				  	scripts: [
				    	'http://code.jquery.com/jquery-1.7.1.min.js'
			  		]
				}, function (err, window) {
		  			var $ = window.jQuery;
					var autos = [];

			  		//$('body').append("<div class='testing'>Hello World</div>");
			  		//console.log($(".testing").text()); // outputs Hello World
			$(".desS").each(function(){
				autos.push({
					name: $("td:eq(1)", this).text().trim(),
					price: $("td:eq(3)", this).text().trim()
				});
			});
					res.send(autos);
				});
	    }
		else res.send("no compadre...");
	  })
	

	
	
//res.render('sapea',{name:'agusto',title:'yeah baby'})

};