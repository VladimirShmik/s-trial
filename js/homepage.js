/*
 * Replace all SVG images with inline SVG
*/
jQuery( window ).on( "load",function(){
	gsap.registerPlugin(ScrollTrigger);
	function pathAnimation(options){

		this.Defaults={
			svg_el:'',
			wrapper_el:'',
			needScroll:true,
			start:"top 95%",
			end:"bottom 95%"
		};
		this.options=jQuery.extend({},this.Defaults, options);
		this.resetPath=function (){

			var path  = document.querySelector(this.options.svg_el);
			var pathLength = path.getTotalLength();
			path.style.strokeDasharray = pathLength + ' ' + pathLength;
			path.style.strokeDashoffset= pathLength;
			path.getBoundingClientRect();
		}

		this.setPath =function (){

			var path  = document.querySelector(this.options.svg_el);
			var pathLength = path.getTotalLength();
			var start={strokeDashoffset: pathLength};
			var end ={
				strokeDashoffset: 0,
				ease: "none",
				duration: 1,
			};
			if(this.options.needScroll){
				end.scrollTrigger={
					trigger: this.options.wrapper_el,
					scrub: true,
					start: this.options.start,
					end: this.options.end,
				};
			}
			gsap.fromTo(
				this.options.svg_el,
				start,end
			);
		}

		this.init = function (){
			this.resetPath();
			this.setPath();
		}
		this.init();
	}


	// //*business-animation*//
	// new pathAnimation({svg_el:'#hobby_arrow path',wrapper_el:'.hobby-section',needScroll:false});
	// new pathAnimation({svg_el:'#hobby_arrow_2 path',wrapper_el:'.hobby-section',needScroll:true, end:"bottom 170%"});
	// new pathAnimation({svg_el:'#passport_arrow path',wrapper_el:'.passport-section',needScroll:true,start:"top 80%", end:"bottom 70%"});
	// new pathAnimation({svg_el:'#plane_arrow path',wrapper_el:'.plane-section',needScroll:true,start:"top 50%", end:"bottom 50%"});
	// new pathAnimation({svg_el:'#start_arrow path',wrapper_el:'.start-section',needScroll:true,start:"top 50%", end:"bottom 50%"});
	// new pathAnimation({svg_el:'#freedom_arrow path',wrapper_el:'.freedom-section',needScroll:true,start:"top 80%"});
	// new pathAnimation({svg_el:'#ready_arrow path',wrapper_el:'.ready-section',needScroll:true,start:"top 100%"});
	// new pathAnimation({svg_el:'#ready_arrow_2 path',wrapper_el:'.ready-section',needScroll:true,start:"top 20%", end:"bottom 110%"});
	// new pathAnimation({svg_el:'#work_arrow path',wrapper_el:'.work-section',needScroll:true,start:"top 50%", end:"bottom -150%"});
	// new pathAnimation({svg_el:'#partners_arrow path',wrapper_el:'.partners-section',needScroll:true,start:"top 220%", end:"bottom 10%" });
	// new pathAnimation({svg_el:'#last-arrow path',wrapper_el:'.last-section',needScroll:true,start:"top 100%", end:"bottom 150%" });
	// /**
	//  * раскоментишь все
	//  * проставь айди на свг и классы на секции
	//  * потом продублируй пазанимайшн
	//  * и методом тыка выстави старт и стоп в виде высоты в процентах
	//  * */

	/*new pathAnimation({svg_el:'#Layer_2 path',wrapper_el:'.record_wrapper',needScroll:true,start:"top 70%",
		end:"bottom 120%"});
	new pathAnimation({svg_el:'#Layer_3 path',wrapper_el:'.notes_wrapper .draw_outline',needScroll:true,start:"top 80%",
		end:"bottom 80%"});
	new pathAnimation({svg_el:'#Layer_4 path',wrapper_el:'.lifestyle_wrapper',needScroll:true,needScroll:true,start:"top 50%",
		end:"bottom 50%"});
	new pathAnimation({svg_el:'#Layer_5 path',wrapper_el:'.service_highlights',needScroll:true,start:"top 50%",
		end:"bottom 50%"});
	new pathAnimation({svg_el:'#Layer_5a path',wrapper_el:'.drums_5a_wrap',needScroll:true,start:"top 50%",
		end:"bottom 50%"});
	new pathAnimation({svg_el:'#Layer_5b path',wrapper_el:'.drums_5b_wrap',needScroll:true,start:"top 50%",
		end:"bottom 50%"});
	new pathAnimation({svg_el:'#Layer_5c path',wrapper_el:'.drums_5c_wrap',needScroll:true,start:"top 50%",
		end:"bottom 50%"});
	new pathAnimation({svg_el:'#Layer_6 path',wrapper_el:'.contact_featured',needScroll:true,start:"top 50%",
		end:"bottom 50%"});
*/

/*



	//text animation
	function hide(elem,direction) {
		direction = direction | 1;
		gsap.to(elem, {autoAlpha: 0});
	}

	function animateTextUp(elem,direction){
		direction = direction | 1;

		var from={y:-100,autoAlpha:0,};
		var to={y:0,autoAlpha:1,};

		if(elem.classList.contains("animate-from-left")){
			from={x:-100,autoAlpha:0,};
			to={x:0,autoAlpha:1,};
		}

		var duration=1;
		var ease="power1.out";
		if(direction==1){
			to.duration=duration;
			to.ease= ease;
			gsap.fromTo(elem,from, to);
		}
		else{
			from.duration=duration;
			from.ease= ease;
			gsap.fromTo(elem,to, from);
		}
	}

	function animateTextDown(elem,direction){
		direction = direction | 1;
		var from={y:100,autoAlpha:0,};
		var to={y:0,autoAlpha:1,};

		if(elem.classList.contains("animate-from-left")){
			from={x:-100,autoAlpha:0,};
			to={x:0,autoAlpha:1,};
		}

		var duration=1;
		var ease="power1.out";
		if(direction==1){
			to.duration=duration;
			to.ease= ease;
			gsap.fromTo(elem,from, to);
		}
		else{
			from.duration=duration;
			from.ease= ease;
			gsap.fromTo(elem,to, from);
		}
	}

	gsap.utils.toArray(".animate-text-wrapper").forEach((section1, i) => {
		section1.texts = section1.querySelectorAll(".animate-text");
		section1.texts.forEach((textel, i) => {
			hide(textel); // assure that the element is hidden when scrolled into view

			ScrollTrigger.create({
				trigger: section1,
				onEnter: function() { animateTextDown(textel) },
				onLeaveBack: function() { animateTextDown(textel,-1) },
				onLeave: function() { animateTextUp(textel, -1) }, // assure that the element is hidden when scrolled into view
				onEnterBack: function() { animateTextUp(textel) },

				start: "top 85%",
				end: "bottom 8%",
			});
		})


	})



*/



});


/*jQuery(document).ready(function(){
	function fixRatioSize(){
		var body= jQuery('body');
		var site_wrapper_outer= jQuery('.site_wrapper_outer');

		var ww= jQuery(window).width();
		if(ww<=767){
			jQuery('#map-scale').attr('style','');
			site_wrapper_outer.attr('style','');
			jQuery('.site_wrapper, .site_header').attr('style','');
		}else{

			var fw=body.width();
			var mw=1700;
			var mh=parseInt(body.attr('max_height'));
			var scale=fw/mw;
			site_wrapper_outer.height(mh*scale);
			jQuery('.site_wrapper, .site_header').css({
				'-webkit-transform' : 'scale(' + scale + ')',
				'-moz-transform'    : 'scale(' + scale + ')',
				'-ms-transform'     : 'scale(' + scale + ')',
				'-o-transform'      : 'scale(' + scale + ')',
				'transform'         : 'scale(' + scale + ')',
				'-webkit-transform-origin': '-1px 0 0',
				'-moz-transform-origin': '-1px 0 0',
				'-ms-transform-origin': '-1px 0 0',
				'-o-transform-origin': '-1px 0 0',
				'transform-origin': '-1px 0 0',
			})
		}
	}
	jQuery(window).resize(fixRatioSize);
	fixRatioSize();
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (!isMobile) {
		luxy.init({
			wrapper: '#full-wrapper',
			wrapperSpeed:  0.06
		});
		window.scrollTo(0, 0);
	}
	$(".navigation.page_nav").find("a").not('.dropdown-menu a, .login_link').click(function(e) {
		e.preventDefault();
		var page_section = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(page_section).offset().top
		});
	});

	$(".readmore, .requestaccess, .anchor").click(function(e) {
		e.preventDefault();
		var page_section = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(page_section).offset().top
		});
	});

	/!*	$(".navigation").find("a").click(function(e) {
            e.preventDefault();
            var page_section = $(this).attr("href");
            $("html, body").animate({
                scrollTop: $(page_section).offset().top
            });
        });

        $(".readmore").click(function(e) {
            e.preventDefault();
            var page_section = $(this).attr("href");
            $("html, body").animate({
                scrollTop: $(page_section).offset().top
            });
        });
        *!/

	/!*===== on scrollup navigation get fixed ===*!/
	/!* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar *!/
	/!*	var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
          var currentScrollPos = window.pageYOffset;
          if (prevScrollpos > currentScrollPos) {
              jQuery(".site_header").addClass("fixed");
              jQuery(".site_header").removeClass("remove");
          } else {
              jQuery(".site_header").addClass("remove");
          }
          prevScrollpos = currentScrollPos;
        };
        *!/

	jQuery('.login_link').click(function() {
		jQuery('#login').removeClass("open");
		jQuery('#login').addClass("open");
		jQuery('body').addClass("hidden");
	});
	jQuery('#login .close').click(function() {
		jQuery('#login').removeClass("open");
		jQuery('body').removeClass("hidden");
	});

	jQuery('#apply_link').click(function() {
		jQuery('#request_access').removeClass("open");
		jQuery('#request_access').addClass("open");
		jQuery('body').addClass("hidden");
	});
	jQuery('#request_access .close').click(function() {
		jQuery('#request_access').removeClass("open");
		jQuery('body').removeClass("hidden");
	});

	jQuery('body').off('click').click(function(event){
		if (jQuery(event.target).hasClass('alert') || jQuery(event.target).is("a")) {
			return;
		} else {
			jQuery(".alert").closest('#flash_notice').find('.alert-cont').remove();
		}
	});

});*/


