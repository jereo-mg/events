jQuery(function($){
	var canBeLoaded = true, // this param allows to initiate the AJAX call only if necessary
	    bottomOffset = 2000, // the distance (in px) from the page bottom when you want to load more posts
	 	maindiv = bliss_loadmore_params.maindiv,
	 	innerdiv = bliss_loadmore_params.innerdiv,
	 	loadmore_image = bliss_loadmore_params.loadmore_image;
	$(window).scroll(function(){ 
		var data = {
			'action': 'loadmore',
			'query': bliss_loadmore_params.posts,
			'page' : bliss_loadmore_params.current_page
		};
		
		if( $(document).scrollTop() > ( $(document).height() - bottomOffset ) && canBeLoaded == true ){
			$.ajax({ 
				url : bliss_loadmore_params.ajaxurl,
				data:data,
				type:'POST',
				beforeSend: function( xhr ){

					// you can also add your own preloader here
					$(maindiv).parent().append('<span class="bliss-loading"><img src="'+loadmore_image+'"></span>');;
					// you see, the AJAX call is in process, we shouldn't run it again until complete
					canBeLoaded = false; 
				},
				success:function(data){ 
					if( data ) {
						$(maindiv).find(innerdiv + ':last-of-type').after( data ); // where to insert posts
						$(maindiv).parent().find('.bliss-loading').remove();
						canBeLoaded = true; // the ajax is completed, now we can run it again

						bliss_loadmore_params.current_page++;
					}else{
						$(maindiv).parent().find('.bliss-loading').remove();
					}
				}
			});
		}
	});
});
		