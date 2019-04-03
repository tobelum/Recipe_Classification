$(document).ready(function() {
	
	if (!inCodePenEditor()) {
		$("#search-input").focus();
	}

	// mode of form elements changes on input
	$("#search-input").on('input', function() {
		if (isEmpty($("#search-input").val())) {
			inputInactive();
		} else {
			inputActive();
		}
	});

	// update button tooltip on hover
	$("#search-btn").hover(function() {
		if (isEmpty($("#search-input").val())) {
			$(this).attr("title", "Open a random Wikipedia article.");
		} else {
			$(this).attr("title", "Search Wikipedia for '" + $("#search-input").val() + "'.");
		}
	});

	// main search functionality
	$("#search-btn").on("click", function(e) {
		e.preventDefault();
		clearCurrentCards();
		searchWikipedia($("#search-input").val());
		$("#search-clear").focus();
	});

	// bind input cancel functionality to click
	$("#search-clear").on("click", function() {
		cancelInput();
	});

	// bind input cancel functionality to escape key press
	$("#search-form").keyup(function(e) {
		if (e.keyCode == 27) {
			cancelInput();
		}
	});

	// bind window resize to manually adjust card image height, in order to maintain required aspect ratio of card images
	$(window).resize(function() {
		setCardImgHeight();
	});

});

function inCodePenEditor() {
	return !/full|debug/.test(window.location.pathname);
}

// initialise site view
function cancelInput() {
	clearInputField();
	showViewInitial();
	inputInactive();
	$("#search-input").focus();
}

function isEmpty(value) {
	return 0 === value.length;
}

function inputInactive() {
	$("#search-form").removeClass("hasInput");
}

function inputActive() {
	$("#search-form").addClass("hasInput");
}

function clearCurrentCards() {
	$("#cards").empty();
}

function clearInputField() {
	$("#search-input").val('');
}

function showViewInitial() {
	$("#container").removeClass("view-results");
	$("#container").addClass("view-initial");
}

function showViewResults() {
	$("#container").removeClass("view-initial");
	$("#container").addClass("view-results");
}

function searchWikipedia(searchTerm) {
	if (isEmpty(searchTerm)) {
		openRandomArticle();
	} else {
		getSearchResults(searchTerm);
		showViewResults();
	}
}

function openRandomArticle() {
	var win = window.open('https://google.com');
	if (win) {
		win.focus(); // Browser has allowed link to be opened
	} else {
		alert('Please allow popups for this website'); // Browser has blocked link from opening
	}
}

function getRecipeComplete(xhr, status, error){
	//alert(status);
	//alert(xhr.responseText);
	// if(status!="success"){
	// 	alert(status);
	// }

	var obj = $.parseJSON(xhr.responseText);
	//console.log(xhr.responseText);
	//alert(obj);

	if(obj.result==0){
		//alert(obj.message);
		$("#cards").append(encapsulate("No results found", "p", ""));
	}else{
		//alert(obj.result);
		$("#cards").append(resultCardHtml(obj.pool));
		setCardImgHeight();
		//var html = ""
		//var length = obj.pool.
	}
}

         //    function viewRidesComplete(xhr, status){
         //        //alert("status is" + status);
         //        if(status!="success"){
         //            alert("status is "+status);
         //            alert("Rides could not be displayed");
         //            return;
         //        }
                
         //        var obj= $.parseJSON(xhr.responseText);
                
         //        //alert("hey");
         //        if(obj.result==0){
         //            alert("server response: "+obj.message);
                    
         //            spanSignup.innerHTML=obj.message;
         //            console.log(obj.message);
         //        }else{   
         //      var result="";
              
         //      var length=obj.pool.length;
         //      var seats = obj.pool[length-1].numseats-obj.pool[length-1].numpeople;
         //      var numpeople = obj.pool[length-1].numpeople;
         //      var rideid = obj.pool[length-1].rideid;
         //      var isjoined = obj.pool[length-1].isJoined;
         //      while(length>0){
         //        //alert("there");
                  
         //            //alert(length);                   
         //            result+="<div class='row'><div class='col-sm-12 col-md-12 col-xs-12'><div class='page-sub-title textcenter'><h2>Join new ride</h2><div class='line'></div></div></div><div class='col-sm-12 col-md-12 col-xs-12'><div class='page-content add-new-ride'><div class='field'>First Name : "+obj.pool[length-1].firstname+"</div><div class='field'>Last Name : "+obj.pool[length-1].lastname+"</div><div class='field'>From : "+obj.pool[length-1].origin+"</div><div class='field'>To : "+obj.pool[length-1].destination+"</div><div class='field'>Date : "+obj.pool[length-1].leavedate+"</div><div class='field'>Time : "+obj.pool[length-1].leavetime+"</div><div class='field'>Contribution per person : "+obj.pool[length-1].contribution+"</div><div class='field'>Vehicle type : "+obj.pool[length-1].vehicletype+"</div><div class='field'>Vehicle model : "+obj.pool[length-1].vehiclemodel+"</div><div class='field'>Number of seats available : "+obj.pool[length-1].numseats+"</div><div class='field'>Number of people joined : "+obj.pool[length-1].numpeople+"</div><div class='field'>Lisence plate number : "+obj.pool[length-1].lisencenum+"</div><div class='field buttons'><button type='submit' class='btn btn-lg green-color' onclick='joinPool("+rideid+","+numpeople+","+isjoined+","+seats+")' id='joinbutton'>Join</button></div></div></div></div>";
         //         // window.location.href="#joinpool";
         //   //     }
         //        length-=1;
         //        //alert("see");
         //      }
             
         //      joinRide.innerHTML=result;
                    
         //    }
         // }


// Query Wikipedia api for search term
function getSearchResults(searchTerm) {
	//var endPoint = "https://en.wikipedia.org/w/api.php";
	
	var recipe = searchTerm;
	var pageUrl="http://myprojecthome.x10host.com/brecipesajax.php?cmd=1&Name="+recipe;
	//alert(pageUrl);
	$.ajax(pageUrl,{async:true,complete:getRecipeComplete});

	// get url encoded query parameter string
	// var params = "?" + $.param({
	// 	action: "query",
	// 	generator: "search",
	// 	gsrsearch: searchTerm,
	// 	gsrnamespace: 0,
	// 	gsrlimit: 12, // search limit
	// 	prop: "pageimages|extracts|info",
	// 	pithumbsize: 200, // size of pageimages
	// 	pilimit: "max", // should be 'max' to get all the available relevant page images
	// 	exsentences: 1, // number of sentences to retrieve
	// 	exintro: 1, // retrieve only introductory content
	// 	explaintext: 1, // retrieve content in plain text
	// 	exlimit: "max", // should be 'max' to get all the available page extracts
	// 	inprop: "url",
	// 	format: "json",
	// 	formatversion: 2 // retrieves properly formatted json array
	// });

	// $.getJSON(endPoint + params + "&callback=?", function(data) {
	// 	alert(data)
	// 	if ('undefined' !== typeof data.query) {
	// 		$("#cards").append(resultCardHtml(data.query.pages));
	// 		// manually set height of card images, since the width is already known
	// 		setCardImgHeight();
	// 	} else {
	// 		$("#cards").append(encapsulate("No results found", "p", ""));
	// 	}

	// }).fail(function(jqXHR, status, error) {
	// 	console.log(jqXHR.responseText);
	// });
}

		// alert(data)
		// if ('undefined' !== typeof data.query) {
		// 	$("#cards").append(resultCardHtml(data.query.pages));
		// 	// manually set height of card images, since the width is already known
		// 	setCardImgHeight();
		// } else {
		// 	$("#cards").append(encapsulate("No results found", "p", ""));
		// }


// Build cards elements from 'pages' array
// function resultCardHtml(pages) {
// 	var html = "";
// 	pages.forEach(function(page) {
// 		//var imgSrc = 'undefined' !== typeof page.thumbnail ?
// 			//page.thumbnail.source : "https://placehold.it/200x150/e6e6e6?text=Image+unavailable";
// 		// build elements to be appended to #cards
// 		//var image = encapsulate(false, "img", "src='" + imgSrc + "' alt='Main Wikipedia image for " + page.title + "'");
// 		//var imageDiv = encapsulate(image, "div", "class='card-image'");
// 		var title = encapsulate(page.Name, "h2", "");
// 		var titleDiv = encapsulate(Name, "div", "class='card-title'");
// 		var text = encapsulate(page.energy, "p", "");
// 		var textDiv = encapsulate(energy, "div", "class='card-text'");
// 		//var action = encapsulate("READ MORE", "a", "href='" + page.canonicalurl + "' target='_blank'");
// 		//var actionDiv = encapsulate(action, "div", "class='card-actions'");
// 		//html = html + encapsulate(imageDiv + titleDiv + textDiv + actionDiv, "div", "class='card'");
// 		html = html + encapsulate(titleDiv + textDiv, "div", "class='card'");
// 	});

// 	return html;
// }

// function resultCardHtml(pages) {
// 	//alert(pages);
// 	var html = "";
// 	pages.forEach(function(page) {
// 		alert(page.Name);
// 		var title = encapsulate(page.Name, "h2", "");
// 		alert(title);
// 		var titleDiv = encapsulate(Name, "div", "class='card-title'");
// 		alert(titleDiv);
// 		//var text = encapsulate(page.energy, "p", "");
// 		//alert(text);
// 		//var textDiv = encapsulate(energy, "div", "class='card-text'");
// 		//alert(textDiv);
// 		html = html + encapsulate(titleDiv ,"div", "class='card'");
// 		alert(html);
// 	});

// 	alert(html);
// 	return html;
// }

// Build cards elements from 'pages' array
function resultCardHtml(pages) {
	var html = "";
	pages.forEach(function(page) {
		var imgSrc = 'undefined' !== typeof page.thumbnail ?
			page.thumbnail.source : "https://placehold.it/200x150/e6e6e6?text=Image+unavailable";
		// build elements to be appended to #cards
		//var image = encapsulate(false, "img", "src=pic.jpeg");
		//var imageDiv = encapsulate(image, "div", "class='card-image'");
		var title = encapsulate(page.Name, "h2", "");
		var titleDiv = encapsulate(title, "div", "class='card-title'");
		var text = encapsulate(page.energy, "p", "");
		var textDiv = encapsulate("Energy:" + text, "div", "class='card-text'");
		var text1 = encapsulate(page.fat, "p", "");
		var textDiv1 = encapsulate("Fat:" +text1, "div", "class='card-text'");
		var text2 = encapsulate(page.saturatedfat, "p", "");
		var textDiv2 = encapsulate("Saturated Fat:" +text2, "div", "class='card-text'");
		var text3 = encapsulate(page.transfat, "p", "");
		var textDiv3 = encapsulate("Transfat:" +text3, "div", "class='card-text'");
		var text4 = encapsulate(page.cholestrol, "p", "");
		var textDiv4 = encapsulate("Cholestrol:" +text4, "div", "class='card-text'");
		var text5 = encapsulate(page.carbohydrates, "p", "");
		var textDiv5 = encapsulate("Carbohydrates:" +text5, "div", "class='card-text'");
		var text6 = encapsulate(page.sugars, "p", "");
		var textDiv6 = encapsulate("Sugars:" +text6, "div", "class='card-text'");
		var text7 = encapsulate(page.fiber, "p", "");
		var textDiv7 = encapsulate("Fiber:" +text7, "div", "class='card-text'");
		var text8 = encapsulate(page.proteins, "p", "");
		var textDiv8 = encapsulate("Proteins:" +text8, "div", "class='card-text'");
		var text9 = encapsulate(page.salt, "p", "");
		var textDiv9 = encapsulate("Salt:" +text9, "div", "class='card-text'");
		var text10 = encapsulate(page.sodium, "p", "");
		var textDiv10 = encapsulate("Sodium:" +text10, "div", "class='card-text'");
		var text11 = encapsulate(page.vitamina, "p", "");
		var textDiv11 = encapsulate("Vitamin A:" +text11, "div", "class='card-text'");
		var text12 = encapsulate(page.vitaminc, "p", "");
		var textDiv12 = encapsulate("Vitamin C:" +text12, "div", "class='card-text'");
		var text13 = encapsulate(page.calcium, "p", "");
		var textDiv13 = encapsulate("Calcium:" +text13, "div", "class='card-text'");
		var text14 = encapsulate(page.iron, "p", "");
		var textDiv14 = encapsulate("Iron:" +text14, "div", "class='card-text'");
		var action = encapsulate("READ MORE", "a", "href='" + page.canonicalurl + "' target='_blank'");
		var actionDiv = encapsulate(action, "div", "class='card-actions'");
		html = html + encapsulate(titleDiv + textDiv + textDiv1+ textDiv2+ textDiv3+ textDiv4+ textDiv5+ textDiv6+ textDiv7+ textDiv8+ textDiv9+ textDiv10+ textDiv11+ textDiv12+ textDiv13 + textDiv14 + actionDiv, "div", "class='card'");
	});
	//alert(html);
	return html;
}
// wrap content in given html tags, with given attributes
function encapsulate(content, tag, attr) {
	if (false === content) {
		return "<" + tag + " " + attr + " />";
	} else {
		return '<' + tag + " " + attr + '>' + content + '</' + tag + '>';
	}
}

// Manually set height of card image element
function setCardImgHeight() {
	$(".card-image img", "#cards").css('height', function() {
		return Math.round($(this).width() * 0.75);
	});
}