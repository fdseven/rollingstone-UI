// JavaScript Document

$(function () {
	
	//ACCORDION
	$('.panel-heading a').on('click',function(e) {
		if($(this).parents('.panel').children('.panel-collapse').hasClass('in')) {
			e.stopPropagation();
		}
	});

 $('body').on('click', "a[rel='nextprevpopup']", function()
    {
        pageurl = $(this).attr('href');
        var n = pageurl.indexOf("?");
        var simbol = (n == -1)? '?' : '&';

        if(pageurl!="#"){

            //to get the ajax content and display in div with id 'content'
            $.ajax({
                url: pageurl+ simbol +'rel=nextprevpopup',
                dataType: "json",
                success: function (response) {
                    console.log(response.htmlbodyt);
                    $('#entrytitlemore').html(response.titlee);
                    $('#popupmodalmore').html(response.htmlbodyt);
                    // for conten
                    $('#contentmore').html(response.htmlcontents);
                }
            });
            //to change the browser URL to 'pageurl'
            if(pageurl!=window.location){
                urlpath = pageurl+ simbol +'v=popup';
                window.history.pushState({path:urlpath},'',urlpath);
            }
        }
        return false;

    });


   // $("a[rel='nextprev']").click(function(e){
    $('body').on('click', "a[rel='nextprev']", function()
        {

        //get the link location that was clicked
        pageurl = $(this).attr('href');

        if(pageurl!="#"){
            var n = pageurl.indexOf("?");
            var simbol = (n == -1)? '?' : '&';

            //to get the ajax content and display in div with id 'content'
            $.ajax({
                url: pageurl+ simbol +'rel=nextprev',
                dataType: "json",
                success: function (response) {
                    $('#contentmore').html(response.htmlcontents);
                }
            });

            //to change the browser URL to 'pageurl'
            if(pageurl!=window.location){
                window.history.pushState({path:pageurl},'',pageurl);
            }
        }

        return false;

    });	
	//NAVBAR MOBILE SLIDE
	var sideslider = $('[data-toggle=collapse-side]');
	var sel = sideslider.attr('data-target');
	var sel2 = sideslider.attr('data-target-2');
	sideslider.click(function(event){
		$(sel).toggleClass('in');
		$(sel2).toggleClass('out');
		$(document.body).toggleClass("nav_open");
	});
	
	//MOBILE HEADER SHOW/HIDE
	var sq = window.matchMedia('(max-width: 767px)');
		if (sq.matches) {
		/*DETECT SCROLL UNTUK MOBILE TOP NAVBAR*/
			var iScrollPos = 0;
			
			$(window).scroll(function () {
				var iCurScrollPos = $(this).scrollTop();
				if (iCurScrollPos > iScrollPos) {
					$("header .navbar").css("top",-50);
					$(".artist_sticky_wrap.row.is_stuck").css("top",0);
				} else {
					$('header .navbar').css("top",0);
					$(".artist_sticky_wrap.row.is_stuck").css("top",50);
				}
				iScrollPos = iCurScrollPos;
			});
			
			$(".title_category").stick_in_parent({
				offset_top: 0
			});
		}
	
	// S:ACCORDION MOBILE MENU
	$(document).ready(function() {
	  $(".nav .menu-large .toggle").click(function() {
		if($(this).next("ul").is(":visible")) {
			  $(".nav .menu-large .toggle i").removeClass("glyphicon-menu-up");
			  $(this).next("ul").slideUp("fast");
			  $(this).next("ul").removeClass("open");
		  } 
		  else 
		  {
			  $(".nav .menu-large .dropdown-menu").slideUp("fast");
			  $(".nav .menu-large .toggle i").removeClass("glyphicon-menu-up");
			  $(this).children(".nav .menu-large .toggle i").addClass("glyphicon-menu-up");
			  $(this).next("ul").slideToggle("fast");
			  $(this).next("ul").addClass("open");
		  }
		  var offset = $('.menu-large .dropdown-menu.open').offset();
		  if(offset) {
			  $('.side-collapse').animate({
				  scrollTop: $('.menu-large a').offset().top -54
			  }, 1000); 
		  }
	  });
	});
	// E:ACCORDION
	
	//IMAGE LIQUID
    $(".lqd").imgLiquid();
	
	//IFRAME CONTENT
	$(".article_content iframe, .article_content embed, .article_content object, .article_content video").wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
	
	//DROPDOWN MENU
	/*
	"Hovernav" navbar dropdown on hover
	Uses jQuery Media Query - see http://www.sitepoint.com/javascript-media-queries/
	*/
	var mq = window.matchMedia('(min-width: 768px)');
	if (mq.matches) {
	  $('ul.navbar-nav > li').addClass('hovernav');
	  $('.artist_dropdown > li').removeClass('open_nav');
	  
	  $(window).load(function(){
		  //STICKY NAV
		  $(".navbar_stuck").stick_in_parent({parent:"body"});
		  
		  return $("[data-sticky_column]").stick_in_parent({
			parent: "[data-sticky_parent]",
			offset_top: 80
		  })
		  .on('sticky_kit:bottom', function(e) {
			  $(this).parent().css('position', 'static');
		  })
		  .on('sticky_kit:unbottom', function(e) {
			  $(this).parent().css('position', 'relative');
		  });
	  });
	  
	} else {
	  $('ul.navbar-nav > li').removeClass('hovernav');
	  $('.submenu li').removeClass('hovernav');
	  $('.artist_dropdown > li').removeClass('hovernav');
	  $('.artist_dropdown > li').addClass('open_nav');
	  $('.open_nav').click(function () {
		  $(this).toggleClass('buka');
	  });
	};
	/*
	The addClass/removeClass also needs to be triggered
	on page resize <=> 768px
	*/
	if (matchMedia) {
	  var mq = window.matchMedia('(min-width: 768px)');
	  mq.addListener(WidthChange);
	  WidthChange(mq);
	}
	function WidthChange(mq) {
	  if (mq.matches) {
		$('ul.navbar-nav > li').addClass('hovernav');
		$('.artist_dropdown > li').removeClass('open_nav');
		// Restore "clickable parent links" in navbar
		$('.hovernav a').click(function () {
		  window.location = this.href;
		});
		$(".hovernav").hover(
			function() {
			$(this).addClass("aktif");
			},
			function() {
			$(this).removeClass("aktif");			
		});
	  } else {
		$('ul.navbar-nav > li').removeClass('hovernav');
		$('.artist_dropdown > li').addClass('open_nav');
	  }
	};
	
	// Restore "clickable parent links" in navbar
	$('.hovernav a').click(function () {
	  window.location = this.href;
	});
	$(".hovernav").hover(
		function() {
		$(this).addClass("aktif");
		},
		function() {
		$(this).removeClass("aktif");			
	});
	
	//TABS MENU
	$(".idTabs").idTabs("!mouseover", function(id,list,set){
		$("a",set).removeClass("selected") 
		.filter("[href='"+id+"']",set).addClass("selected"); 
		for(i in list)
			$(list[i]).hide();
			$(id).fadeIn(200);
		return false;
	});
	$(".idTabs a").click(function(){
		var url = $(this).attr('url');
		if(url){
		 window.location = url;
		}
	});
	
	//COVER STORY
	$(window).scroll(function () {
		var scrolled = $(this).scrollTop();
		if (scrolled > 80) {
			$('header figure').fadeOut();
		} else {
			$('header figure').fadeIn();
		}
	});
	
	//SLIDER
	$('#carousel').carouFredSel({
		responsive: true,
		auto: false,
		scroll: {
			items: 2,
			pauseOnHover: true
		},
		items: {
			visible: {
			max: 5,
			min: 1
			}
		},
		swipe: {
			 onMouse: true,
			 onTouch: true
		},
		prev: '#prev',
		next: '#next'
	});
	
	$('#slide').carouFredSel({
		//circular: false,
		responsive: true,
		scroll: {
			items: 1,
			pauseOnHover: true
		},
		items: {
			visible: {
			max: 1,
			min: 1
			}
		},
		swipe: {
			 onMouse: true,
			 onTouch: true
		},
		pagination: '#page_dot'
	});
	
	//SEARCH
	var hahay = document.body
	var morphSearch = document.getElementById( 'morphsearch' ),
	input = morphSearch.querySelector( 'input.morphsearch-input' ),
	ctrlClose = morphSearch.querySelector( 'span.morphsearch-close' ),
	isOpen = isAnimating = false,
	// show/hide search area
	toggleSearch = function(evt) {
		// return if open and the input gets focused
		if( evt.type.toLowerCase() === 'focus' && isOpen ) return false;

		var offsets = morphsearch.getBoundingClientRect();
		if( isOpen ) {
			classie.remove( morphSearch, 'open' );
			classie.remove( hahay, 'unscroll' );
			$(this).siblings('.morphsearch-form').children('.morphsearch-input').removeAttr('placeholder');
			$(this).siblings('.morphsearch-content').css('height', 0);
			$(this).siblings('.morphsearch-content').children('.latest').children('.list').css('height', 0);

			// trick to hide input text once the search overlay closes 
			// todo: hardcoded times, should be done after transition ends
			if( input.value !== '' ) {
				setTimeout(function() {
					classie.add( morphSearch, 'hideInput' );
					setTimeout(function() {
						classie.remove( morphSearch, 'hideInput' );
						input.value = '';
					}, 300 );
				}, 500);
			}
			
			input.blur();

			pageurl = $('#search-keyword').attr('data-urlBack');
            console.log(pageurl);

            if(pageurl!=window.location){
                window.history.pushState({path:pageurl},'',pageurl);
            }
		}
		else {
			classie.add( morphSearch, 'open' );
			classie.add( hahay, 'unscroll' );
			$(this).attr('placeholder', 'Enter keyword');
			$(".morphsearch.open").css({
				"max-width": 1065,
				margin: "0 auto"
			});
		}
		isOpen = !isOpen;
		
		rescale();
		
	};

	// events
	input.addEventListener( 'focus', toggleSearch );
	ctrlClose.addEventListener( 'click', toggleSearch );
	// esc key closes search overlay
	// keyboard navigation events
	document.addEventListener( 'keydown', function( ev ) {
		var keyCode = ev.keyCode || ev.which;
		if( keyCode === 27 && isOpen ) {
			toggleSearch(ev);
		}
	} );
	
	/***** for demo purposes only: don't allow to submit the form *****/
	morphSearch.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault(); } );
		
	//BOOTSTRAP MODAL BOX
	function rescale(){
		var size = {width: $(window).width() , height: $(window).height() }
		/*var img_size = {height: jQuery('.slides li img').height() }*/
		
		/*CALCULATE SIZE*/
		/*var offset = 58;
		var offset_w = 20;
		var offsetBody = 70;
		$('#myModal').css('height', size.height - offset );
		$('.modal-body').css('height', size.height - (offset + offsetBody));
		$('#myModal').css('top', 58);	
		$('.modal-body .img_container .table-cell').css('height', size.height - (offset + offsetBody));
		$('.modal-body .img_container .table-cell').css('width', size.width);
		$('.modal-body .img_container img').css('max-height', size.height - (offset + offsetBody));
		$('.modal-body .img_container img').css('max-width', size.width - offset_w);*/
		$('.morphsearch.open .morphsearch-content .latest .list, .morphsearch.open .morphsearch-content').css('height', size.height/1.8 );	
	}
	
	$('body').on('click', '.mod', function()
    {
        var id = $(this).data('ref'); //here i got the id of the clicked link
        var titlebox = '.title'+id;
        var title = $(titlebox).html(); //here i got the content from the content div.
        var imagebox = '.image'+id;
        var image = $(imagebox).html(); //here i got the content from the content div.
        var infobox = '.image_info'+id;
        var info = $(infobox).html(); //here i got the content from the content div.
        var creditbox = '.credit'+id;
        var credit = $(creditbox).html(); //here i got the content from the content div.
        var urlprev = $('#prevurl').attr('href');
        var urlnext = $('#nexturl').attr('href');

        $('#myModal').modal('show'); // here manually load the model
        $('#myModal').css('top', 58);
        $(".modal-body a.prev").attr("href", urlprev);
        $(".modal-body a.next").attr("href", urlnext);
        $('.modal-header .entry-title').html(title); // here manually inject the text taken from the hidden field to the modal text area.
        $('.modal-body .image').html(image); // here manually inject the text taken from the hidden field to the modal text area.
        $('.modal-body .image_info').html(info); // here manually inject the text taken from the hidden field to the modal text area.
        $('.modal-body .credit').html(credit); // here manually inject the text taken from the hidden field to the modal text area.
        //$('.modal-body').css('height',$( window ).height()*0.8);
        //jQuery('.modal-body .metaslider img').css('max-height',jQuery( window ).height()*0.8);
        rescale();
    });
	
	$(window).bind("resize", rescale);

	//SHOW / HIDE LIST LATEST
	$(".more_less").click(function() {
		$(".expand_less_5 li:nth-of-type(n+6):nth-last-of-type(n+2)").slideToggle(10);
		$(this).toggleClass("more_hide");
	});
	
});


/* the below code is to override back button to get the ajax content without reload*/
$(window).bind('popstate', function() {
    urlNowhref = location.href;
    var nowHref = urlNowhref.indexOf("v=popup");
    if(nowHref != -1){
        //alert(location.pathname+'?rel=nextprevpopup');
        $.ajax({
            url: location.pathname+'?rel=nextprevpopup',
            dataType: "json",
            success: function (response) {
                console.log(response.htmlbodyt);
                $('#entrytitlemore').html(response.titlee);
                $('#popupmodalmore').html(response.htmlbodyt);
                // for conten
                $('#contentmore').html(response.htmlcontents);
            }
        });
    }else{
        $.ajax({
            url: location.pathname+ '?rel=nextprev',
            dataType: "json",
            success: function (response) {
                $('#contentmore').html(response.htmlcontents);
            }
        });
    }

  
});


//STICKY
$(window).load(function(){

//STICKY ARTIST TIMELINE
$(".artist_sticky_wrap").stick_in_parent({
	parent:"body",
	offset_top: 57
})
.on('sticky_kit:stick', function(e) {
	Modernizr.mq("only screen and (min-width: 768px)") ? ($(this).find(".artist_dropdown li").addClass("hovernav")) : ($(this).find(".artist_dropdown li").removeClass("hovernav"));
})
.on('sticky_kit:unstick', function(e) {
	Modernizr.mq("only screen and (min-width: 768px)") ? ($(this).find(".artist_dropdown li").removeClass("hovernav")) : ($(this).find(".artist_dropdown li").removeClass("hovernav"));
});

var title_head = $(".article_head .artist_sticky_wrap").outerHeight(true);
$(".stick_ads_lists").css("margin-top", title_head);

//STICKY SHARE
$(".article_content,.essay_content").height() >= 200 && Modernizr.mq("only screen and (min-width: 992px)") ? ($(".social_stick").show()) : ($(".social_stick").hide() ), $(".social_stick").stick_in_parent({
	offset_top: 80
})
.on('sticky_kit:bottom', function(e) {
    $(this).parent().css('position', 'static');
	$(this).fadeOut("fast");
})
.on('sticky_kit:unbottom', function(e) {
    $(this).parent().css('position', 'relative');
	$(this).fadeIn("fast");
});

}),
$(window).on("resize", function() {
	Modernizr.mq("only screen and (max-width: 991px)") ? ($(".social_stick").hide()) : ($(".social_stick").show())
	Modernizr.mq("only screen and (max-width: 767px)") ? ($(".artist_dropdown li").removeClass("hovernav")) : ($(".artist_dropdown li").addClass("hovernav"));
});




var  myElementkk = document.id('contentsearch');
var  searchboxx = document.id('searchboxx');
myElementkk.scrollTo(0, 999);

myElementkk.addEventListener('scroll', showScrollPosition);
showScrollPosition();
function showScrollPosition() {
    var scroll = searchboxx.getSize().y;
    var scrollreal = scroll - 196;
    var scrolload = scrollreal -1150;
    var posisinow =myElementkk.scrollTop;
    var more = $('#spageMore').val();
    var getData = $('#getData').val();
    if(posisinow > scrolload && more == 1 && getData == 1){
        var el = document.id('formsearch');
        getFormObj(el,'nextpage');
    }
    //console.log(scrollreal);
    //console.log(myElementkk.scrollTop);
}

function getSearchObj(el) {
    $('#spageRecent').val('1');
    $('#spagePhotos').val('1');
    $('#spageMore').val('0');
    $('#pagenum').val('1');
    $('#getData').val('1');

    $('#datanews').html('');
    $('#dataphoto').html('');

    getFormObj(el,'loadpage');
    $('#contentsearch').scrollTop(0);
}

function getFormObj(el, statuss) {
    var q = $('#search-keyword').val();


    var querystring = '';
    if(q !=''){
        querystring = '?q='+q;
    }
    pageurl = $(el).attr('action')+querystring;

    if(pageurl!=window.location){
        window.history.pushState({path:pageurl},'',pageurl);
    }

    if(q !='') {
        $('#loaddataimg').css('display','block');
        $('#getData').val('0');
        var pagenum =  parseInt($('#pagenum').val()) +1;
        console.log('page' +pagenum);
        $.ajax({
            url: $(el).attr('action'),
            type: $(el).attr('method'),
            dataType: "json",
            data: $(el).serialize(),
            success: function (response) {
                //console.log(response.htmlnews);
                if(statuss == 'loadpage'){
                    $('#datanews').html(response.htmlnews);
                    $('#dataphoto').html(response.htmlphoto);
                }else{
                    $('#datanews').append(response.htmlnews);
                    $('#dataphoto').append(response.htmlphoto);
                }
                $('#spageRecent').val(response.statusNews);
                $('#spagePhotos').val(response.statusPhoto);
                $('#spageMore').val(response.smore);
                $('#pagenum').val(pagenum);
                $('#getData').val(1);
                $('#loaddataimg').css('display','none');
            }
        });
        return false;
    }


}
