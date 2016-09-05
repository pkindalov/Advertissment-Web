/*
The following lines of code are for the constants such as kinvey credentials!
 */
// const kinveyBaseUrl = "https://baas.kinvey.com/";
// const kinveyAppKey = "kid_ryHiPwBO";
// const kinveyAppSecret = "aadba16ca0234bce98eaf44e0298adb0";
// const guestCredentials = "e9009d50-666a-47ea-b846-d7304a158b97.SYD6TI7agCiKtP18tYa6oCqha5Bt3VQ5LWLyER+xe1I=";
// var currentlyLoggedUser = "";


const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_H1aq14Os";
const kinveyAppSecret = "329525a861524b64b93bc9c41250b4cf";
const guestCredentials = "7ef6fe4d-7758-40bb-9aa2-a632cef9d98b.v4uzW2d03vHg4x71nnUD2BVVKocUpKHaMoR9jlUK+Js=";
var currentlyLoggedUser = "";
/*
------------------------------------------------------
 */

/*
view functions!
 */

function showView(viewName) {
    $('main>section').hide();
    $('#' + viewName).show();
}

function showHideMenuLinks() {
    $("#linkHome").show();
    $("#linkAbout").show();
    if(sessionStorage.getItem('authToken') == null){
        $("#linkLogin").show();
        $("#linkRegister").show();
        $("#linkMyAdds").hide();
        $("#linkListAdds").show();
        $("#linkCreateAdd").hide();
        $("#linkLogout").hide();
    }
    else{
        $("#linkLogin").hide();
        $("#linkRegister").hide();
        $("#linkMyAdds").show();
        $("#linkListAdds").show();
        $("#linkCreateAdd").show();
        $("#linkLogout").show();
    }

}

function showInfo(message) {
    $('#infoBox').text(message);
    $('#infoBox').show();
    setTimeout(function () { $('#infoBox').fadeOut()},3000);
}

function showErrorMsg(errorMsg) {
    $('#errorBox').text(errorMsg);
    $('#errorBox').show();
}

$(function () {

    showHideMenuLinks();
    showView('viewHome');

    currentlyLoggedUser = localStorage.getItem('username');
    if(currentlyLoggedUser != null){ $('#greetingsHeading').html("Greetings, " + "<span class='helloUsername'>"+ currentlyLoggedUser + "</span>");}
    else{$('#greetingsHeading').text("Greetings");}

    $('#linkHome').click(showHomeView);
    $('#linkAbout').click(showAboutView);
    $('#linkLogin').click(showLoginView);
    $('#linkRegister').click(showRegisterView);
    $('#linkMyAdds').click(showMyAddsView);
    $('#linkListAdds').click(listAdds);
    $('#linkCreateAdd').click(showCreateAddView);
    $('#linkLogout').click(logout);


    $("#formLogin").submit(function (e) {
        e.preventDefault();
        login();
    });
    $("#formRegister").submit(function (e) {
        e.preventDefault();
        register();
    });
    $("#formCreateAdd").submit(function (e) {
        e.preventDefault();
        createAdd();
    });
    $("#formModifyAdd").submit(function (e) {
        e.preventDefault();
        modifyAdd();
    });
    $(document).on({
        ajaxStart: function(){ $("#loadingBox").show()},
        ajaxStop: function() { $("#loadingBox").hide()}
    });

})

function showHomeView() {
    showView('viewHome');

    if(currentlyLoggedUser != null){ $('#greetingsHeading').html("Greetings, " + "<span class='helloUsername'>"+ currentlyLoggedUser + "</span>");}
    else{$('#greetingsHeading').text("Greetings");}

}
function showAboutView() {
    showView('viewAbout');
    $('.contacts').hide();
    $('.map').hide();
}

function showLoginView() {
    showView('viewLogin');
}

function showRegisterView() {
    showView('viewRegister');
}

function showCreateAddView() {
    showView('viewCreateAdd');
}

function showModifyAddView() {
    showView('viewModifyAdd');
}

/*Here we get the entire collection of advertisments posted by all users and in the loadSuccess function we select those whose
author is the same with the currentlyLoggedUser
 */
function showMyAddsView() {
    $('#myAdds').empty();
	$('#page-selection').empty();
    showView('viewMyAdds');

    const kinveyAddsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Advertisments?query={}&sort={\"_kmd.lmt\": -1}";

    const kinveyAuthHeaders = {
        'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),

    };

   $('body').on("click", ".buttonEdit", editAdd);
   $('body').on("click", ".buttonDelete", deleteAdd);

    $.ajax({
        method: "GET",
        url:kinveyAddsUrl,
        headers: kinveyAuthHeaders,
        success: loadMyAddsSuccess,
        error: handleAjaxError
    });


    function loadMyAddsSuccess(allAds) {
        showInfo('Your personal adds are loaded.');
        if(allAds.length == 0)
            $('#myAdds').text('No adds in the database.');

        else{

          var sd = allAds.filter(function(data){return data.author === currentlyLoggedUser});


            if(sd.length ===0){
                $('#myAdds').text('No adds published by you.');
            }
			else
			{
				var ADS_PER_PAGE = 5;
				var userAdsCount = 0;
				var pages = [];
				pages[0] = $('<div class="page" id="page-1">');
				var pageIndex = 0;
				for(let add of allAds){
					if(add.author === currentlyLoggedUser){
						let adds = $('<div class="singleAdd panel-body" style="width: 90%; min-width: 200px; margin-left: 7%;" id=' +add._id + '>');

						if(userAdsCount % ADS_PER_PAGE == 0 && userAdsCount != 0)
						{
							pageIndex++;
							pages[pageIndex] = $('<div class="page" id="page-' + (pageIndex+1) +'">');
						}
						userAdsCount++;

						let singleAddHeading = $('<h1>').html(add.title);
						let singleAddAuthor = $('<p>').html("posted by " +
							"<span class='helloUsername'>" + add.author + "</span>");


					let fullText = add.description;
                    let shortTxt = add.description.substring(0, 101);

                    let singleAddText = $('<p class="short">').html(shortTxt + "...");
                    let singleFullText = $('<p class="full">').html(fullText);


                    let postId = add._id;

                    let zoomIn = $('<button class="zoomInZoomOutButtons btn btn-success" onclick="magnifieTextPost(this)"><img class="zoomInZooMOut" src="media/zoom-in.png" alt="zoom in text" />Zoom in</button>').attr('id', postId);
                    let zoomOut = $('<button class="zoomInZoomOutButtons btn btn-success" onclick="decreaseTextPost(this)"><img class="zoomInZooMOut" src="media/zoom-out.png" alt="zoom out text" />Zoom out</button>').attr('id', postId);
                    let date = add.from_date;


                    let readMore = $('<button class="readMore btn btn-success" onclick="readMore(this)"><img class="zoomInZooMOut" src="media/cursor.png" alt="read more icon" />Read More..</button>').attr('id', postId);

                    let hideText = $('<button class="hide btn btn-success" onClick="hide(this)"><img class="zoomInZooMOut" src="media/hide.png" alt="hide text" />Hide...</button>').attr('id', postId);

                    let btn_edit = $('<button class="buttonEdit btn btn-primary" data-id="'+add._id+'"><img class="zoomInZooMOut" src="media/edit.png" alt="edit post" />Edit</button>');
                    let btn_delete = $('<button class="buttonDelete btn btn-danger" data-id="'+add._id+'"><img class="zoomInZooMOut" src="media/delete.png" alt="delete post" />Delete</button>');

                    var singleAdd = '';


                    if(fullText.length <= 50){
                        singleFullText = $('<p class="short">').html(fullText);

                        let copyButton = $('<button class="copyButton btn btn-success" onclick="copy(this)"><img class="zoomInZooMOut" src="media/copy.png" alt="hide text" />Copy</button>').attr('id', postId);
                        let printButton = $('<button class="copyButton btn btn-success" onclick="printDiv(this)"><img class="zoomInZooMOut" src="media/printer.png" alt="hide text" />Print</button>').attr('id', postId);

                        singleAdd = [singleAddHeading,singleAddAuthor,singleFullText,btn_edit,btn_delete, zoomIn, zoomOut, copyButton, printButton];

                    }else{
                        shortTxt = add.description.substring(0, 51);
                        singleAddText = $('<p class="short">').html(shortTxt + "...");
                        let copyButton = $('<button class="copyButton btn btn-success" onclick="copyLongPosts(this)"><img class="zoomInZooMOut" src="media/copy.png" alt="hide text" />Copy</button>').attr('id', postId);
                        let printButton = $('<button class="copyButton btn btn-success" onclick="printLongDiv(this)"><img class="zoomInZooMOut" src="media/printer.png" alt="hide text" />Print</button>').attr('id', postId);
                        singleAdd = [singleAddHeading,singleAddAuthor,singleAddText, singleFullText, readMore, hideText,btn_edit, btn_delete, zoomIn, zoomOut, copyButton, printButton];


                    }
						adds.append(singleAdd);
						pages[pageIndex].append(adds);
					}
				}
				for(var index = 0; index< pages.length; index++){
					$('#myAdds').append(pages[index]);
					$('#page-selection').append('<button class="btn btn-success" style="margin-top: 10px;" onClick="showPage(' + (index+1) + ')">' + (index+1) + '</button>');
				}
			}
        }
    }
}
function showPage(pageIndex){
	$('.page').hide();
	$('#page-'+pageIndex).show();
}
/*
-----------------------------------------------------------
 */

/*
Functions suchs as login, logout and register
 */
function login() {

    const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    const kinveyAuthHeaders = {
        'Authorization': "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };
    let userData = {
        username: $('#loginUser').val(),
        password: $('#loginPassword').val()
    };
    $.ajax({
        method: "POST",
        url: kinveyLoginUrl,
        headers: kinveyAuthHeaders,
        data: userData,
        success: loginSuccess,
        error: handleAjaxError
    });
    function loginSuccess(response) {

        localStorage.clear();
        localStorage.setItem('username',response.username);

        let userAuth = response._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);

        showHideMenuLinks();
        showView('viewHome');
        showInfo('Login successful.');
        location.reload();

    }
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if(response.readyState ===0)
        errorMsg = "Cannot connect due to network error.";
    if(response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    showErrorMsg(errorMsg);
}



function register() {
    const kinveyRegisterUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/";
    const kinveyAuthHeaders = {
        'Authorization': "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };

    let userName = $('#registerUser').val();
    let password = $('#registerPassword').val();
    let confirm = $('#confirmPassword').val();

    function validateForm() {
        if(userName.length <= 3){
            showErrorMsg("Username is too short. Minimum 3 characters");
            return false;
        }

        if(!userName[0].match(/[a-z]/)){
            showErrorMsg("Username can`t begin with digit.");
            return false;
        }

        if(!userName.match(/^[a-zA-Z0-9- ]*$/)){
            showErrorMsg("You have entered forbidden sign. Please check for @, !, ., - , and remove them");
            return false;
        }


        if(password.length < 3){
            showErrorMsg("The password is too short. Minimum 3 characters")
            return false;
        }

        if(password != confirm){
            showErrorMsg("Passwords does not match.");
            return false;
        }

        return true;
    }


    if(!validateForm()){
        return;
    }else {
        showInfo("Congratulations. Successful registration");
    }




    let userData = {
        username: $('#registerUser').val(),
        password: $('#registerPassword').val()
    };
    $.ajax({
        method: "POST",
        url: kinveyRegisterUrl,
        headers: kinveyAuthHeaders,
        data: userData,
        success: registerSuccess,
        error: handleAjaxError
    });
    function registerSuccess(response) {

        localStorage.clear();
        localStorage.setItem('username',response.username);

        let userAuth = response._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        showHideMenuLinks();
        showView('viewHome');
        showInfo('User registration successful.');
        location.reload();
    }
}

function logout() {
    sessionStorage.clear();
    localStorage.clear();
    showHideMenuLinks();
    showView('viewHome');
    location.reload();
}

/*
-------------------------------------------------------------
 */

/*
Functions for the advertisments such as listing, deleting, editing etc.
 */

function redirectMyAdvert(event){
    event.preventDefault();
    showView('viewMyAdds');
}


function showHideContacts(){
    $('.contacts').toggle();
}

function showHideMap(){
    $('.map').toggle();
}




function magnifieText(view){
    let increase   = 1;
    let currentView = "#" + view;
    let currentSize = parseInt($(currentView + ' p').css("font-size"));

    if(currentSize > 30){
        alert('You have reached maximum size.');
        currentSize = 30;
    }

     currentSize = currentSize + increase + "px";


    $(currentView + ' p').css({"font-size": currentSize});


}


function decreaseText(view){
    let decrease   = 1;
    let currentView = "#" + view;
    let currentSize = parseInt($(currentView + ' p').css("font-size"));

    if(currentSize < 11){
        alert('You have reached minimal size.');
        currentSize = 11;
    }

     currentSize = currentSize - decrease + "px";

    $(currentView + ' p').css({"font-size": currentSize});
}

function readMore(postId){
    let fullId = '#' + postId.id;

    $(fullId + ' .short').hide();
    $(fullId + ' .full').show();
    $(fullId + ' .full').addClass('fullVisibilOn');
    $(fullId + ' .readMore').hide();
    $(fullId + ' .hide').addClass('fullVisibilOn');
    $(fullId + ' .hide').show();

}

function hide(postId){
    let fullId = '#' + postId.id;

    $(fullId + ' .short').show();
    $(fullId + ' .full').hide();
    $(fullId + ' .hide').hide();
    $(fullId + ' .readMore').show();
}


function magnifieTextPost(postId){
    let increase   = 1;
    let currentView = "#" + postId.id;
    let currentSize = parseInt($(currentView + ' p').css("font-size"));

    if(currentSize > 30){
        alert('You have reached maximum size');
        currentSize = 30;
    }

     currentSize = currentSize + increase + "px";

    // let spanElement = $('#viewAbout span');
    // document.write(spanElement);
    // magnifieTextHTMLelement(spanElement);
    $(currentView + ' p').css({"font-size": currentSize});


}



function magnifieTextHTMLelement(element){
  let increase = 1;
  let currentSize = parseInt($(element).css("font-size"));
  //document.write(currentSize);

  if(currentSize > 30){
      //alert('You have reached maximum size');
      currentSize = 30;
  }

  currentSize = currentSize + increase + "px";

  $(element).css({"font-size": currentSize});


}


function decreaseTextHTMLelement(element){
  let increase = 1;
  let currentSize = parseInt($(element).css("font-size"));
  //document.write(currentSize);

  if(currentSize < 16){
      //alert('You have reached minimum size');
      currentSize = 16;
  }

  currentSize = currentSize - increase + "px";

  $(element).css({"font-size": currentSize});


}


function whichButton(event, currentElement){
  let mouseButton = event.button;

  switch (mouseButton) {
    case 0:
      magnifieTextHTMLelement(currentElement);
      break;
    case 1:
        $(window).bind('mousewheel DOMMouseScroll', function(event){
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
          // scroll up
          magnifieTextHTMLelement(currentElement);
        }
        else {
          // scroll down
          decreaseTextHTMLelement(currentElement);
        }
    });
      break;
    case 2:
      decreaseTextHTMLelement(currentElement);
      break;
    default:

  }

  // if(mouseButton == 0){
  //   magnifieTextHTMLelement(currentElement);
  // }else if (mouseButton == 1) {
  //     event.preventDefault();
  //     $(window).bind('mousewheel DOMMouseScroll', function(event){
  //     if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
  //       // scroll up
  //       magnifieTextHTMLelement(currentElement);
  //     }
  //     else {
  //       // scroll down
  //       decreaseTextHTMLelement(currentElement);
  //     }
  // });
  // }else if (mouseButton == 2) {
  //   decreaseTextHTMLelement(currentElement);
  // }



}




function decreaseTextPost(postId){

    let increase   = 1;
    let currentView = "#" + postId.id;
    let currentSize = parseInt($(currentView + ' p').css("font-size"));

    if(currentSize < 12){
        alert('You have reached minimal size');
        currentSize = 12;
    }

     currentSize = currentSize - increase + "px";


    $(currentView + ' p').css({"font-size": currentSize});
}

function copy(postId){
     let target = '#' + postId.id;
     let text = $(target + " p:nth-child(3)" ).text();
     window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function copyLongPosts(postId){
     let target = '#' + postId.id;
     let text = $(target + " p:nth-child(4)" ).text();
     window.prompt("Copy to clipboard: Ctrl+C, Enter", text);

}

function printDiv(divName) {

        let divToPrint = '#' + divName.id;


        var restorepage = document.body.innerHTML;
        var printcontent = $(divToPrint + ' p:nth-child(2)').html();
        var printcontent2 = $(divToPrint + ' p:nth-child(3)').html();

        document.body.style.backgroundColor = "#E9E9E9";
        document.body.innerHTML = "<div class='printfriendly'>" + "<h3>" + printcontent + "</h3>" + "<hr />" + "<br />" + "<p>" + printcontent2 + "</p>" +  "</div>";

        window.print();
        document.body.innerHTML = restorepage;

        location.reload();

}



function printLongDiv(divName) {

        let divToPrint = '#' + divName.id;

        var restorepage = document.body.innerHTML;
        var printcontent = $(divToPrint + ' p:nth-child(2)').html();
        var printcontent2 = $(divToPrint + ' p:nth-child(4)').html();

        document.body.style.backgroundColor = "#E9E9E9";
        document.body.innerHTML = "<div class='printfriendly'>" + "<h3>" + printcontent + "</h3>" + "<hr />" + "<br />" + "<p>" + printcontent2 + "</p>" + "</div>";

        window.print();
        document.body.innerHTML = restorepage;
        location.reload();
}




function quotes(){


    var quotes = [
        "My mother said to me, \"If you are a soldier, you will become a general. If you are a monk, you will become the Pope.\"  Instead, I was a painter, and became Picasso. -- Pablo Picasso.",

        "Murphy\'s Fourth Law: If there is a possibility of several things going wrong, the one that will cause the most damage will be the one to go wrong.",

        "\"If you live long enough, you\'ll see that every victory turns into a defeat.\" -- Simone de Beauvoir",

        "\"The purpose of law is to prevent the strong from always having their way.\" -- Ovid ",

        "\"Patriotism means to stand by the country. It does not mean to stand by the president or any other public official...\"  -- Theodore Roosevelt",

        "\"Politicians are like diapers. They should be changed often, and for the same reason.\"-- Anonymous",

        "My opinions might have changed, but not the fact that I am right.",

        "\"Chaos is found in greatest abundance wherever order is being sought. It always defeats order, because it is better organized.\" -- Terry Pratchett (Interesting Times)",

        "\"Democracy does not guarantee equality of conditions - it only gurantees equality of opportunity\" -- Irving Kristol",

        "\"The best preparation for tomorrow is doing your best today.\" -- H. Jackson Brown, Jr. ",

        "\"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.\" -- Helen Keller",

        "\"What we think, we become.\" -- Buddha",

        "\"I can't change the direction of the wind, but I can adjust my sails to always reach my destination.\" -- Jimmy Dean",

        "\"Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.\" -- Francis of Assisi",

        "\"Happiness is not something you postpone for the future; it is something you design for the present.\" -- Jim Rohn",

        "\"Try to be a rainbow in someone's cloud.\" -- Maya Angelou",

        "\"Perfection is not attainable, but if we chase perfection we can catch excellence.\" -- Vince Lombardi",

        "\"Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.\" -- Steve Jobs",

        "\"If opportunity doesn't knock, build a door.\" -- Milton Berle",

        "\"Let us sacrifice our today so that our children can have a better tomorrow.\" -- A. P. J. Abdul Kalam",

        "\"Change your thoughts and you change your world.\" -- Norman Vincent Peale",

        "\"Nothing is impossible, the word itself says 'I'm possible'!\" -- Audrey Hepburn",

        "\"We know what we are, but know not what we may be.\" -- William Shakespeare",

        "\"Believe you can and you're halfway there.\" -- Theodore Roosevelt",

        "\"Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky.\" -- Rabindranath Tagore",

        "\"Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.\" -- Buddha",

        "\"Put your heart, mind, and soul into even your smallest acts. This is the secret of success.\" -- Swami Sivananda"


    ];


    //var randNum = Math.floor(Math.Rand() * quotes.length);
    var randNum = Math.floor((Math.random() * quotes.length));

    //alert(quotes[randNum]);
    $('.quotes').html('<p onclick="quotes()">' + quotes[randNum] + '</p>');

}










function listAdds() {
    $('#AllAdds').empty();
    $('#page-selectionAllAdds').empty();

    showView('viewAdds');

    const kinveyAddsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Advertisments?query={}&sort={\"_kmd.lmt\": -1}";
    if(sessionStorage.getItem('authToken')){
        var authToken = sessionStorage.getItem('authToken');
    }
    else{
        var authToken = guestCredentials;
    }

    const kinveyAuthHeaders = {
        'Authorization': "Kinvey " + authToken,
    };

    $.ajax({
        method: "GET",
        url:kinveyAddsUrl,
        headers: kinveyAuthHeaders,
        success: loadAddsSuccess,
        error: handleAjaxError
    });

    function loadAddsSuccess(adds) {
        showInfo('Adds loaded.');
        if(adds.length == 0)
            $('#AllAdds').text('No adds in the database.');

    else{

            var ADS_PER_PAGE = 5;
            var userAdsCount = 0;
            var pages = [];
            pages[0] = $('<div class="page" id="page-1">');
            var pageIndex = 0;
            for(let add of adds){

                    let adds = $('<div class="singleAdd panel-body" style="width: 90%; min-width: 200px; margin-left: 7%;" id=' +add._id + '>');

                    if(userAdsCount % ADS_PER_PAGE == 0 && userAdsCount != 0)
                    {
                        pageIndex++;
                        pages[pageIndex] = $('<div class="page" id="page-' + (pageIndex+1) +'">');
                    }
                    userAdsCount++;

                    let singleAddHeading = $('<h1>').html(add.title);
                    let singleAddAuthor = $('<p>').html("posted by " +
                        "<span class='helloUsername'>" + add.author + "</span>");

                    let fullText = add.description;
                    let shortTxt = add.description.substring(0, 101);

                    let singleAddText = $('<p class="short">').html(shortTxt + "...");
                    let singleFullText = $('<p class="full">').html(fullText);


                    let postId = add._id;
                    let zoomIn = $('<button class="zoomInZoomOutButtons btn btn-success" onclick="magnifieTextPost(this)"><img class="zoomInZooMOut" src="media/zoom-in.png" alt="zoom in text" />Zoom in</button>').attr('id', postId);
                    let zoomOut = $('<button class="zoomInZoomOutButtons btn btn-success" onclick="decreaseTextPost(this)"><img class="zoomInZooMOut" src="media/zoom-out.png" alt="zoom out text" />Zoom out</button>').attr('id', postId);

                    let readMore = $('<button class="readMore btn btn-success" onclick="readMore(this)"><img class="zoomInZooMOut" src="media/cursor.png" alt="read more icon" />Read More..</button>').attr('id', postId);
                    let hideText = $('<button class="hide btn btn-success" onClick="hide(this)"><img class="zoomInZooMOut" src="media/hide.png" alt="hide text" />Hide...</button>').attr('id', postId);

                    var singleAdd = '';


                    if(fullText.length <= 50){
                        singleFullText = $('<p class="short">').html(fullText);

                        let copyButton = $('<button class="copyButton btn btn-success" onclick="copy(this)"><img class="zoomInZooMOut" src="media/copy.png" alt="hide text" />Copy</button>').attr('id', postId);
                        let printButton = $('<button class="copyButton btn btn-success" onclick="printDiv(this)"><img class="zoomInZooMOut" src="media/printer.png" alt="hide text" />Print</button>').attr('id', postId);



                        singleAdd = [singleAddHeading,singleAddAuthor,singleFullText, zoomIn, zoomOut, copyButton, printButton];


                    }else{
                        shortTxt = add.description.substring(0, 51);
                        singleAddText = $('<p class="short">').html(shortTxt + "...");
                        let copyButton = $('<button class="copyButton btn btn-success" onclick="copyLongPosts(this)"><img class="zoomInZooMOut" src="media/copy.png" alt="hide text" />Copy</button>').attr('id', postId);
                        let printButton = $('<button class="copyButton btn btn-success" onclick="printLongDiv(this)"><img class="zoomInZooMOut" src="media/printer.png" alt="hide text" />Print</button>').attr('id', postId);

                        singleAdd = [singleAddHeading,singleAddAuthor,singleAddText, singleFullText, readMore, hideText, zoomIn, zoomOut, copyButton, printButton];
                    }



                    adds.append(singleAdd);


                    pages[pageIndex].append(adds);

            }
            for(var index = 0; index< pages.length; index++){
                $('#AllAdds').append(pages[index]);
                $('#page-selectionAllAdds').append('<button class="btn btn-success" style="margin-top: 10px;" onClick="showPage(' + (index+1) + ')">' + (index+1) + '</button>');
            }

        }

    }

    function showPage(pageIndex){
        $('.page').hide();
        $('#page-'+pageIndex).show();
    }

}

function createAdd() {
    const kinveyAddsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Advertisments";
    const kinveyAuthHeaders = {
      'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
    };

    let authorTitle = $('#addTitle').val();

    function validateForm() {
        if(authorTitle.length <= 3){
            showErrorMsg("Title is too short. Minimum 3 characters");
            return false;
        }

        return true;
    }

    if(!validateForm()){
        return;
    }

    let addData = {
        title: $('#addTitle').val(),
        author: currentlyLoggedUser,
        description: $('#addDescription').val(),
        from_date: new Date()
    }

    $.ajax({
        method: "POST",
        url: kinveyAddsUrl,
        headers: kinveyAuthHeaders,
        data: addData,
        success: createAddSuccess,
        error: handleAjaxError
    });

    function createAddSuccess(response) {
        showMyAddsView();
        showInfo('Add created.');
    }
}

function modifyAdd() {
    var id = $('#addModifyId').val();
    const kinveyAddsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey+ "/Advertisments/"+id;
    const kinveyAuthHeaders = {
        'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
    };

    let addData = {
        title: $('#addModifyTitle').val(),
        author: currentlyLoggedUser,
        description: $('#addModifyDescription').val()
    }

    $.ajax({
        method: "PUT",
        url: kinveyAddsUrl,
        headers: kinveyAuthHeaders,
        data: addData,
        success: modifyAddSuccess,
        error: handleAjaxError
    });

    function modifyAddSuccess(response) {
        showMyAddsView();
        showInfo('Add modified.');
    }
}

function deleteAdd(event) {
    event.preventDefault();

    let confirmation = confirm("Do you really want to delete this post ?");
    if(!confirmation){
        return;
    }

    let id = $(this).attr('data-id');


    const kinveyAddsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Advertisments";
    const kinveyAuthHeaders = {
        'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
    };

    $.ajax({
        method: "DELETE",
        url:kinveyAddsUrl + "/" + id,
        headers: kinveyAuthHeaders,
        success: deleteAddSuccess,
        error: handleAjaxError
    });

    function deleteAddSuccess() {
        location.reload();
        showMyAddsView();
    }
}

function editAdd(event) {
    event.preventDefault();
    let id = $(this).attr('data-id');
    const kinveyAddsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Advertisments/"+id;
    const kinveyAuthHeaders = {
        'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
    };
    var getData = {'_id': id};
    $.ajax({
        method: "GET",
        url: kinveyAddsUrl,
        headers: kinveyAuthHeaders,
        data: null,
        success: getAddSuccess,
        error: handleAjaxError
    });
    function getAddSuccess(data) {
        $('#addModifyTitle').val(data.title);
        $('#addModifyDescription').val(data.description);
        $('#addModifyId').val(data._id);
        showModifyAddView();
    }
}
