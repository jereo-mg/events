(function($) {
    "use strict";

    var blocks = {
        mainSlider: $("#" + rsObject['el_id'])
    };

    var $body = $('body');


    // main slider
    if (blocks.mainSlider.length) {
        mainSlider();
    };


    function mainSlider() {
        if ($("body").hasClass("rtl")) {
            $(blocks.mainSlider).attr('dir', 'ltr');
        }


        var $el = blocks.mainSlider;
        $el.find('.slide').first().imagesLoaded({
            background: true
        }, function(){
            setTimeout(function () {
                $el.parent().find('.loading-content').addClass('disable');
                $body.addClass('load-mainslider');
            }, 700);
        });
        $el.on('init', function (e, slick) {
            var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        $el.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]');
            var $animatingElements = $currentSlide.find('[data-animation]');
            doAnimations($animatingElements);
        });
        $el.slick({
            rtl:!!(rsObject['rtl'] == 'false'),

            autoplaySpeed:rsObject['autoplayspeed'],
            pauseOnHover: false,
            pauseOnDotsHover: true,

            arrows:!!(rsObject['arrows'] == 'true'),
            dots:!!(rsObject['dots'] == 'true'),
            autoplay:!!(rsObject['autoplay'] == 'true'),
            fade:!!(rsObject['fade'] == 'true'),

            speed:rsObject['speed'],

            //rtl:!!(rsObject['rtl'] == 'true'),
            //rtl:$rtlActive,


            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            },{
                breakpoint: 1025,
                settings: {
                    dots: false,
                    arrows: false
                }
            }]
        });
    };
    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
            var $this = $(this);
            var $animationDelay = $this.data('animation-delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function () {
                $this.removeClass($animationType);
            });
            if ($this.hasClass('animate')) {
                $this.removeClass('animation');
            }
        });
    };

    // background image inline
    dataBg('[data-bgslide]');
    function dataBg(el) {
        blocks.mainSlider.find(el).each(function(){
            var $this = $(this),
                bg = $this.attr('data-bgslide');
            $this.css({
                'background-image': 'url(' + bg + ')'
            });
        });
    };


    /*tilt*/
    var objMainSlider = $("#" + rsObject['el_id']);

    function debouncer(func, timeout) {
        var timeoutID, timeout = timeout || 500;
        return function() {
            var scope = this,
                args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() {
                func.apply(scope, Array.prototype.slice.call(args));
            }, timeout);
        }
    };

    function initTilt(){
        if(window.innerWidth > 1024){
            objMainSlider.find('.js-rotation').tilt({
                perspective: 2000
            });
        }
    };
    if (objMainSlider.length){
        initTilt();
        $(window).resize(debouncer(function(e){
            initTilt();
        }));
    };


    var videoPopup = $('.js-video-popup');

    if(!videoPopup.length) return;
    videoPopup.each(function(){
        $(this).magnificPopup({
            type: 'iframe',
            iframe: {
                patterns: {
                    dailymotion: {
                        index: 'dailymotion.com',
                        id: function(url) {
                            var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                            if (m !== null) {
                                if(m[4] !== undefined){
                                    return m[4];
                                }
                                return m[2];
                            }
                            return null;
                        },
                        src: 'https://www.dailymotion.com/embed/video/%id%'
                    }
                }
            }
        });
    });



})(jQuery);
