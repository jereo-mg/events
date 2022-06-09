(function($){
    "use strict";

    console.log("clubio-1-2-1");

    /*
    $(document).ready(function(){
        $("#ch_menu_close").trigger('click');
    });
    */

    var ptBackToTop =  $('#js-backtotop'),
        $window = $(window);

    if (ptBackToTop.length){
        initbacktotop();
    };
    function initbacktotop(){
        ptBackToTop.on('click',  function(e) {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
        $window.scroll(function(){
            $window.scrollTop() > 500 ? ptBackToTop.stop(true.false).addClass('pt-show') : ptBackToTop.stop(true.false).removeClass('pt-show');
        });
    };


    var $html = $('html'),
        $body = $('body');



    var cssFix = function(){
        var u = navigator.userAgent.toLowerCase(),
            is = function(t) {
                return (u.indexOf(t) != -1)
            };
        $html.addClass([
            (!(/opera|webtv/i.test(u)) && /msie (\d)/.test(u)) ? ('ie ie' + RegExp.$1) :
                is('firefox/2') ? 'gecko ff2' :
                    is('firefox/3') ? 'gecko ff3' :
                        is('gecko/') ? 'gecko' :
                            is('opera/9') ? 'opera opera9' : /opera (\d)/.test(u) ? 'opera opera' + RegExp.$1 :
                                is('konqueror') ? 'konqueror' :
                                    is('applewebkit/') ? 'webkit safari' :
                                        is('mozilla/') ? 'gecko' : '',
            (is('x11') || is('linux')) ? ' linux' :
                is('mac') ? ' mac' :
                    is('win') ? ' win' : ''
        ].join(''));
    }();

    function is_touch_device(){
        return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
    };
    if(is_touch_device()){
        $html.addClass('touch-device');
        $body.addClass('touch-device');
    };
    if (/Edge/.test(navigator.userAgent)){
        $html.addClass('edge');
    };


    (function ptInitCountdown(){
        $('#modalBayTickets').find('.pt-countdown').each(function(){
            var $this = $(this),
                showZero = showZero || false,
                date = $this.data('date'),
                set_year = $this.data('year') || 'Yrs',
                set_month = $this.data('month') || 'Mths',
                set_week = $this.data('week') || 'Wk',
                set_day = $this.data('Days') || 'Days',
                set_hour = $this.data('Hours') || 'Hours',
                set_minute = $this.data('Min') || 'Min',
                set_second = $this.data('second') || 'Sec';


            var define_title = $this.prev('.pt-countdow-title'),
                define_title_value = define_title.data('title') || 'Offer Will End Through';

            if(define_title.length){
                define_title.html(define_title_value);
            };


            if (date = date.split('-')){
                date = date.join('/');
            } else return;

            $this.countdown(date , function(e) {
                var format = '<span class="countdown-row">';

                function addFormat(func, timeNum, showZero) {
                    if(timeNum === 0 && !showZero) return;

                    func(format);
                };

                addFormat(function() {
                    format += '<span class="countdown-section">'
                        + '<span class="countdown-amount">' + e.offset.totalDays + '</span>'
                        + '<span class="countdown-period">' + set_day + '</span>'
                        + '</span>';
                }, e.offset.totalDays, showZero);

                addFormat(function() {
                    format += '<span class="countdown-section">'
                        + '<span class="countdown-amount">' + e.offset.hours + '</span>'
                        + '<span class="countdown-period">' + set_hour + '</span>'
                        + '</span>';
                }, e.offset.hours, showZero);

                addFormat(function() {
                    format += '<span class="countdown-section">'
                        + '<span class="countdown-amount">' + e.offset.minutes + '</span>'
                        + '<span class="countdown-period">' + set_minute + '</span>'
                        + '</span>';
                }, e.offset.minutes, showZero);

                format += '</span>';

                $(this).html(format);
            });
        });
    }());

    var ttSelect = $('#lang_choice_1');
    if (ttSelect.length) {
        ttSelect.each( function() {
            $(this).SumoSelect();
        });
    };

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


    var nav = $('#tt-nav'),
        navLine = $('#tt-nav__line');

    if(!nav.length && !navLine.length) return false;

    var determineSybMenu = (function(){
        nav.find('> ul > li').each(function(){
            if ($(this).children('ul').length != 0){
                $(this).addClass('subMenu');
            }
        });
    }());


    var determineActive = (function(){
        var location = window.location.href.split('#')[0],
            last_link = location.split('/'),
            cur_url = last_link[last_link.length - 2];

        console.log(cur_url);

        nav.find('li').each(function(){
            var menu_link = $(this).find('a').attr('href');

            var menu_link_array = menu_link.split('/');
            var menu_link_last = menu_link_array[menu_link_array.length - 2];

            if (cur_url == menu_link_last){

                console.log("we are here 111");

                $(this).addClass('active').closest('.subMenu').addClass('active');
                nav.addClass('defined-item');
            }
        });
    }());

    var missingItemActive = (function(){
        if(!nav.hasClass('defined-item')){
            nav.find('> ul > li:first-child').addClass('fake-active');
        }
    }());

    var fNav = $('#f-nav');

    if(!fNav.length) return false;

    var determineActiveFooter = (function(){
        var location = window.location.href.split('#')[0],
            cur_url = location.split('/').pop() || 'index.php';

        fNav.find('li').each(function(){
            var link = $(this).find('a').attr('href');
            if (cur_url == link){
                $(this).addClass('active').closest('.subMenu').addClass('active');
                fNav.addClass('defined-item');
            }
        });
    }());

    var missingItemActiveFooter = (function(){
        if(!fNav.hasClass('defined-item')){
            fNav.find('> ul > li:first-child').addClass('active');
        }
    }());

    var searchWrapper =  $('#js-search');

    if (searchWrapper.length){
        var searchInput = $('#js-search-input'),
            searchResults = $('#js-search-results');

        initSearchPopup();
        initShowAjaxRequest();
    };
    function initSearchPopup(){
        var searchBtn = searchWrapper.find('.tt-obj__btn'),
            searchDropdown = searchWrapper.find('.tt-dropdown-menu');

        $('body').on('click', '#js-search', function(e){
            var target = e.target;

            if ($('.tt-obj__btn').is(target)){
                $('#js-search').toggleClass('active');
                return false;
            };
            if ($('.tt-btn-close').is(target)){
                objSearchClose();
            };
            if ($('.tt-btn-close').is(target)){
                objSearchClose();
            };

            $(document).mouseup(function(e){
                if (!$(this).is(e.target) && $('#js-search').has(e.target).length === 0){
                    objSearchClose();
                };
            });

        });
        $('body').on('click', '#js-search-results li a', function(e){
            objSearchClose();
        });

        function objSearchClose(){
            $('#js-search').removeClass('active');
            searchResults.blur();
            return false;
        };

    };
    function initShowAjaxRequest(){
        searchInput.on("input",function(ev){
            if($(ev.target).val()){
                searchResults.fadeIn("250");
                var searchInclude = $('#js-search-results');
                if(!searchInclude.hasClass('tt-is-include')){
                    searchInclude.addClass('tt-is-include');
                    $.ajax({
                        url: 'ajax-content/search-results.html',
                        success: function(data){
                            var $item = $(data);
                            searchInclude.append($item);
                        }
                    });
                }
            };
        });
        searchInput.blur(function(){
            searchResults.fadeOut("250");
        });
    };

    $('#tt-pageContent [data-slick]').slick({
        dots: true,
        arrows: false
    });

    /*
    var SliderSlick01 = $('#tt-pageContent .js-slick01');
    if (SliderSlick01.length) {
        SliderSlick01.slick({
            lazyLoad: 'progressive',
            dots: true,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 2,
            adaptiveHeight: true,
            autoplay:true,
            autoplaySpeed:2500,
            responsive: [
                {
                    breakpoint: 1220,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 791,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    };

    */

    function initSliderCarusel(){
        if ($(window).width() < 791){
            var slick02 = $('#tt-pageContent .js-slick02');
            if (slick02.length) {
                slick02.slick({
                    lazyLoad: 'progressive',
                    dots: true,
                    arrows: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    adaptiveHeight: true,
                    autoplay:true,
                    autoplaySpeed:2000,
                    responsive: [
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            };
        }
    };
    initSliderCarusel();
    $(window).resize(debouncer(function(e){
        initSliderCarusel();
    }));

    var slick01 = $('#tt-pageContent .js-slick03');
    if (slick01.length) {
        slick01.slick({
            lazyLoad: 'progressive',
            dots: true,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            adaptiveHeight: true,
            autoplay:true,
            autoplaySpeed:3000,
            responsive: [
                {
                    breakpoint: 791,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1

                    }
                }

            ]
        });
    };

    var ticketsColSlick04 = $('#tt-pageContent .js-init-slick04');
    if (ticketsColSlick04.length) {
        ticketsColSlick04.slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            nextArrow: '.parallax__navleft',
            prevArrow: '.parallax__navright',
            autoplay:true,
            autoplaySpeed:5500
        });
    };

    if ($("body").hasClass("rtl")) {
        //$(SliderSlick01).attr('dir', 'rtl');
        var $rtlActive = true;
    } else {
        var $rtlActive = false;
    }


    var ticketsColCalendar = $('#js-ttcalendar');
    if (ticketsColCalendar.length) {
        ticketsColCalendar.slick({
            rtl:$rtlActive,
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            nextArrow: '.ttcalendar__navleft',
            prevArrow: '.ttcalendar__navright'
        });
    };


    $.fn.datepicker.language['en'] = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yyyy',
        timeFormat: 'hh:ii aa',
        firstDay: 0
    };


    var startDate = new Date(2020, 22, 1);

    var dp = $('.j_datepicker-1').datepicker({
        startDate: startDate,
        language: 'en'
    }).data('datepicker');

    var ttcalendar = $('#js-ttcalendar');
    if (ttcalendar.length && ttcalendar.hasClass('ttcalendar-layout01')){
        if(window.innerWidth <= 1024 && !!('ontouchstart' in window) || !!('onmsgesturechange' in window)){
            initOneClickBtn();
        };
    };
    if (ttcalendar.length && ttcalendar.hasClass('ttcalendar-layout02')){
        if(window.innerWidth <= 1024 && !!('ontouchstart' in window) || !!('onmsgesturechange' in window)){
            initOneClickBtn02();
        };
    };
    function initOneClickBtn(){
        $('body').on('touchstart click', '#js-ttcalendar .tt-day-grid > *', function(e){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            watchClosingModal();
        });
        $('body').on('touchstart touchend', '#js-ttcalendar .tt-day-event__bg > *', function(e){
            $(this).focus();
        });
    };
    function initOneClickBtn02(){
        console.log("initOneClickBtn02");
        $('body').on('click', '#js-ttcalendar .tickets-col', function(e){
            $('#js-ttcalendar').find('.tickets-col').removeClass('active');
            $(this).addClass('active');
        });
    };
    function watchClosingModal(){
        $('body').on('click', '.modal .close', function(e){
            $('#js-ttcalendar .tt-day-grid > .active').removeClass('active');
        });
    };

    var videoPopup = $('#tt-pageContent .js-video-popup');

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


(function($){
    "use strict";
    var $body = $('body');
    setTimeout(function (){
        $body.addClass('loaded');
    }, 1500);
    $(window).on('load', function(){
        $body.addClass('loaded');
        return false;
    });

    setTimeout(function() {
        $('body.single-product .woocommerce-notices-wrapper').fadeOut(400);
    }, 2000);

})(jQuery);


(function($){
    "use strict";
    var jsShowLayout = $('#js-show-btn');
    if (jsShowLayout){
        $('body').on('click touchstart', '#js-show-btn', function(e){
            $('#js-show-layout').find('.tt-table-hide').removeClass('tt-table-hide');
            jsShowLayout.remove();
            return false;
        });
    };

    var header = $('#tt-header'),
        $window = $(window);
    if(header.length){
        stuck();
        initStuck();
    };
    function stuck(){
        $window.scroll(function(){
            initStuck();
        });
    };
    function initStuck(){
        if($window.scrollTop() > 0){
            header.addClass('stuck');
        } else {
            header.removeClass('stuck');
        }
    };
})(jQuery);

(function($){
    "use strict";
    var delay_tab = 300,
        delay_show_mm = 300,
        delay_hide_mm = 300;


    $("body").append(getFullscreenBg());

    $.fn.initMM = function() {
        var mmpanel = {
            $mobilemenu: $(".panel-menu"),
            mm_close_button: 'Close',
            mm_back_button: 'Back',
            mm_breakpoint: 1024,
            mm_enable_breakpoint: false,
            mm_mobile_button: false,
            remember_state: false,
            second_button: false, // class
            init: function($button, data){
                var _this = this;
                if(!_this.$mobilemenu.length){
                    console.log('You not have <nav class="panel-menu">menu</nav>. See Documentation')
                    return false;
                }

                arguments[1] != undefined && _this.parse_arguments(data);
                _this.$mobilemenu.parse_mm(mmpanel);//_this.mm_close_button, _this.mm_back_button);
                _this.$mobilemenu.init_mm(mmpanel);
                _this.mm_enable_breakpoint && _this.$mobilemenu.check_resolution_mm(mmpanel);//_this.mm_breakpoint);
                $button.mm_handler(mmpanel);
            },
            parse_arguments: function(data){
                var _this = this;
                if(Object(data).hasOwnProperty("menu_class")) _this.$mobilemenu = $("."+data.menu_class);

                $.each(data, function( k, v ) {
                    switch(k) {
                        case 'right':
                            v && _this.$mobilemenu.addClass("mm-right");
                            break;
                        case 'close_button_name':
                            _this.mm_close_button = v;
                            break;
                        case 'back_button_name':
                            _this.mm_back_button = v;
                            break;
                        case 'width':
                            _this.$mobilemenu.css("width", v);
                            break;
                        case 'breakpoint':
                            _this.mm_breakpoint = v;
                            break;
                        case 'enable_breakpoint':
                            _this.mm_enable_breakpoint = v;
                            break;
                        case 'mobile_button':
                            _this.mm_mobile_button = v;
                            break;
                        case 'remember_state':
                            _this.remember_state = v;
                            break;
                        case 'second_button':
                            _this.second_button = v;
                            break;
                    };
                });
            },
            show_button_in_mobile: function($button){
                var _this = this;
                if(_this.mm_mobile_button) {
                    window.innerWidth > _this.mm_breakpoint ? $button.hide() : $button.show();
                    $(window).resize(function(){
                        window.innerWidth > _this.mm_breakpoint ? $button.hide() : $button.show();
                    })
                }
            }
        }
        mmpanel.init($(this), arguments[0]);
        mmpanel.show_button_in_mobile($(this));
    }

    $.fn.check_resolution_mm = function(mmpanel) {
        var _this = $(this);
        $(window).resize(function(){
            if(!$("body").hasClass("mm-open") || !_this.hasClass("mmitemopen")) return false;
            window.innerWidth > mmpanel.mm_breakpoint && _this.closemm(mmpanel);
        });
    }
    $.fn.mm_handler = function(mmpanel){
        $(this).click(function(e){
            e.preventDefault();
            mmpanel.$mobilemenu.openmm();
        });

        if(mmpanel.second_button != false){
            $(mmpanel.second_button).click(function(e){
                e.preventDefault();
                mmpanel.$mobilemenu.openmm();
            });
        };
    }

    $.fn.parse_mm = function(mmpanel) {
        var $mm_curent = $(this).clone(),
            $mm_new = $(get_mm_parent()),
            $mm_block = false,
            count = 0,
            _this = false,
            $btnBack = false,
            $ul;
        $(this).empty();

        $mm_curent.find('a').each(function(){
            _this = $(this);
            $ul = _this.parent().find("ul").first();
            if($ul.length) {
                count++;
                $ul.prepend("<li></li>").find("li").first().append(_this.clone().addClass("mm-original-link"));
                _this.attr("href", "#mm"+count).attr("data-target", "#mm"+count).addClass("mm-next-level");
            }
        });
        $mm_curent.find('ul').each(function(index){
            $btnBack = false;
            $mm_block = $(get_mm_block()).attr("id", "mm"+index).append($(this));
            if (index == 0) {
                $mm_block.addClass("mmopened").addClass("mmcurrent").removeClass("mmhidden");
                $btnBack = getButtonClose($mm_curent.find(".mm-closebtn").html(), mmpanel.mm_close_button);
                $mm_block.find("ul").first().prepend($btnBack);
            }
            else {
                $btnBack = getButtonBack($mm_curent.find(".mm-backbtn").html(), mmpanel.mm_back_button);
                $mm_block.find("ul").first().prepend($btnBack);
            }
            $mm_new.append($mm_block);
        });

        $(this).append($mm_new);
    }
    $.fn.init_mm = function(mmpanel) {
        var _parent = $(this);
        _parent.find("a").each(function(){
            $(this).click(function(e){
                var _this = $(this);
                var $panel = false;
                var $currobj = false;
                var lv = '';
                if(_this.hasClass("mm-next-level")){
                    e.preventDefault();
                    lv = _this.attr("href");
                    $currobj = _parent.find(".mmcurrent");
                    $currobj.addClass("mmsubopened").removeClass("mmcurrent");
                    _parent.find(lv).removeClass("mmhidden");
                    setTimeout(function(){_parent.find(lv).scrollTop(0).addClass("mmcurrent").addClass("mmopened");}, 0);
                    setTimeout(function(){$currobj.addClass("mmhidden")}, delay_tab);
                    return false;
                }
                if(_this.hasClass("mm-prev-level")){
                    e.preventDefault();
                    lv = _this.attr("href");
                    $currobj = _parent.find(".mmcurrent");
                    $currobj.removeClass("mmcurrent").removeClass("mmopened");
                    _parent.find(".mmsubopened").last().removeClass("mmhidden").scrollTop(0).removeClass("mmsubopened").addClass("mmcurrent");
                    setTimeout(function(){$currobj.addClass("mmhidden")}, delay_tab);
                    return false;
                }
                if(_this.hasClass("mm-close")){
                    _parent.closemm(mmpanel);
                    return false;
                }
            })
        });
        $(".mm-fullscreen-bg").click(function(e){
            e.preventDefault();
            _parent.closemm(mmpanel);
        });
    }
    $.fn.openmm = function(){
        var _this = $(this);
        _this.show();
        setTimeout(function(){$("body").addClass("mm-open");_this.addClass("mmitemopen");$(".mm-fullscreen-bg").fadeIn(delay_show_mm);}, 0);
    }
    $.fn.closemm = function(mmpanel){
        var _this = $(this);
        _this.addClass("mmhide");
        $(".mm-fullscreen-bg").fadeOut(delay_hide_mm);
        setTimeout(function(){ mm_destroy(_this, mmpanel); }, delay_hide_mm);
    }
    function mm_destroy(_parent, mmpanel){
        if(!mmpanel.remember_state) {
            _parent.find(".mmpanel").toggleClass("mmsubopened mmcurrent mmopened", false).addClass("mmhidden");
            _parent.find("#mm0").addClass("mmopened").addClass("mmcurrent").removeClass("mmhidden");
        }
        _parent.toggleClass("mmhide mmitemopen", false).hide();
        $("body").removeClass("mm-open");
    }
    function get_mm_parent(){
        return '<div class="mmpanels"></div>';
    }
    function get_mm_block(){
        return '<div class="mmpanel mmhidden">';
    }
    function getButtonBack(value, _default) {
        value = value == undefined ? _default : value;
        return '<li><a href="#" data-target="#" class="mm-prev-level">'+value+'</a></li>';
    }
    function getButtonClose(value, _default) {
        value = value == undefined ? _default : value;
        return '<li class="mm-close-parent"><a id="ch_menu_close" href="#close" data-target="#close" class="mm-close">'+value+'</a></li>';
    }
    function getFullscreenBg() {
        return '<div class="mm-fullscreen-bg"></div>';
    }

    var $ttDesctopMenu = $('#tt-nav'),
        mobileMenuToggle = $('.tt-menu-toggle');

    if ($ttDesctopMenu && mobileMenuToggle){
        var ttDesktopMenu = $ttDesctopMenu.find('ul').first().children().clone();
        $('#mobile-menu').find('ul').append(ttDesktopMenu);
        mobileMenuToggle.initMM({
            enable_breakpoint: true,
            mobile_button: true,
            breakpoint: 1025
        });
    };

})(jQuery);


(function($){
    "use strict";
    document.addEventListener('lazybeforeunveil', function(e){
        var bg = e.target.getAttribute('data-bg');
        if(bg){
            e.target.style.backgroundImage = 'url(' + bg + ')';
        }
    });
})(jQuery);


(function($){
    "use strict";
    $(window).on('load', function(){
        $('#tt-pageContent').find('.bliss_loadmore').each(function(index){
            var text = $(this).html();
            $(this).empty();
            $(this).append('<span>' + text + '</span>');
        });

        $('#primary').find('.single_add_to_cart_button').each(function(index){
            //$(this).addClass("tt-btn-default");

            var text = $(this).html();
            $(this).empty();
            $(this).append('<span>' + text + '</span>');
        });


    });
})(jQuery);


(function($){
    "use strict";
    $("#tt-pageContent .post-password-form input[type='submit'], .woocommerce #review_form #respond .form-submit input[type='submit']").each(function(){
        var value = $(this).attr('value'),
            insertBtn = '<a href="#" class="tt-btn-default tt-btn-pass"><span>' + value + '</span></a>';

        $(this).wrap('<div class="check-btn"></div>');
        $(this).closest('.check-btn').append(insertBtn);
    });


   var themeBlocks = {
        productImage: $("#mainImage"),
        prdCarousel: $('.prd-carousel'),
        similarSlider: $(".product-list")

    };


    if (themeBlocks.productImage.length) {
        var zoomPos = $('body').hasClass('rtl') ? 11 : 1;
        themeBlocks.productImage.elevateZoom({
            gallery: 'productPreviews',
            cursor: 'crosshair',
            galleryActiveClass: 'active',
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 500,
            lensFadeIn: 500,
            lensFadeOut: 500,
            zoomType: "inner",
            scrollzoom: true,
            responsive:true

        });
        var ezApi = themeBlocks.productImage.data('elevateZoom');
        if ((window.innerWidth || $window.width()) < 1025) {
            ezApi.changeState('disable');
        }
        $(window).on('resize', function () {
            if ((window.innerWidth || $window.width()) < 1025) {
                ezApi.changeState('disable');
            } else {
                ezApi.changeState('enable');
            }
        });
        $('#productPreviews > a').on('click', function () {
            themeBlocks.productImage.attr({
                src: $(this).attr('data-image'),
                'data-zoom-image': $(this).attr('data-zoom-image')
            });
        });
    }




})(jQuery);



(function($){
    'use strict';
    $(window).on('load', function () {
        if ($(".pre-loader").length > 0)
        {
            $(".pre-loader").fadeOut("fast");


        }
    });
})(jQuery);


(function($){
    'use strict';
    var SliderSlick01 = $('#tt-pageContent .js-slick01');

    if ($("body").hasClass("rtl")) {
        $(SliderSlick01).attr('dir', 'rtl');
        var $rtlActive = true;
    } else {
        var $rtlActive = false;
    }


    if (SliderSlick01.length) {
        SliderSlick01.slick({
            rtl:$rtlActive,

            lazyLoad: 'progressive',
            dots: true,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 2,
            adaptiveHeight: true,
            autoplay:true,
            autoplaySpeed:2500,
            responsive: [
                {
                    breakpoint: 1220,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 791,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    };
})(jQuery);



/*slider for Elementor pages*/
(function($) {
    "use strict";



    var blocks = {
        mainSliderEl: $("#js-mainSlider-el")
    };

    if ($("body").hasClass("rtl")) {
        $(mainSliderEl).attr('dir', 'rtl');
        var $rtlActive = true;
    } else {
        var $rtlActive = false;
    }


    var $body = $('body');


    // main slider
    if (blocks.mainSliderEl.length) {
        mainSliderEl();
    };


    function mainSliderEl() {
        if ($("body").hasClass("rtl")) {
            $(blocks.mainSliderEl).attr('dir', 'ltr');
        }


        var $el = blocks.mainSliderEl;
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
            rtl:$rtlActive,
            autoplaySpeed: 5500,
            pauseOnHover: false,
            pauseOnDotsHover: true,
            autoplay:true,
            //autoplay:false,

            fade: true,
            speed: 1000,
            arrows: false,
            dots: false,

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
        blocks.mainSliderEl.find(el).each(function(){
            var $this = $(this),
                bg = $this.attr('data-bgslide');
            $this.css({
                'background-image': 'url(' + bg + ')'
            });
        });
    };


    /*tilt*/
    var objMainSlider =  $("#js-mainSlider-el");


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


/*gallery for Elementor scripts*/
(function($) {
    "use strict";



    var filterNav = $('#filter-nav'),
        filterLayout = $('#filter-layout'),
        navLine = $('#tt-filternav__line');

    if(!filterNav.length && !filterLayout.length) return false;

    var initFilter = (function(){
        var valueFilter = filterNav.find('.active a').attr('href');
        filterLayout.find('.' + valueFilter).addClass('show');
    }());

    $('body').on('click touchstart', '#filter-nav .gallery-navitem', function(e){
        e.preventDefault();
        if($(this).closest('li').hasClass('active')){
            return false
        } else {
            $(this).closest('li').addClass('active').siblings().removeClass('active');
            var valueFilter = filterNav.find('.active a').attr('href');
            filterLayout.find('.show').removeClass('show');
            filterLayout.find('.' + valueFilter).addClass('show');
        };
    });
    $(window).resize(debouncer(function(e){
        changePosition(filterNav.find('.active'));
    }));

    var setValue = (function(){
        changePosition(filterNav.find('.active'));
    }());
    var hoverLi = (function(){
        filterNav.find('> ul > li').on("mouseenter", function(){
            changePosition($(this));
        }).on('mouseleave', function() {
                changePosition(filterNav.find('> ul > li.active'));
            });
    }());
    function changePosition(obj){
        var $this = obj.find('span');
        navLine.css({
            'top': parseInt($this.position().top + $this.height(), 10),
            'left': parseInt($this.position().left, 10),
            'width': parseInt($this.width(), 10),
            'opacity': 1
        });
    };

    var moreWrapper = $('#js-more-include');
    if(!moreWrapper.length) return false;
    var includeValue = moreWrapper.attr('data-include');

    $('body').on('click touchstart', '#js-more-include > *', function(e){
        e.preventDefault();
        $.ajax({
            url: 'ajax-content/more-gallery-innerlayout.php',
            success: function(data) {
                var $item = $(data);
                var ajaxInclude = (function(){
                    moreWrapper.parent().append($item);
                    moreWrapper.remove();
                }());
            }
        });
    });

})(jQuery);
/*
 Debouncer
 */
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