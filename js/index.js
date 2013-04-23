(function() {

	var theClass = 'zoomLayerVisible',
			$body = $('body'),
			$zoomLayer = $('#zoomLayer'),
			$mainImage = $('#mainImage'),
			$openZoomBtn = $mainImage.find('button'),
			$smallImage = $mainImage.find('img');

	$openZoomBtn
		.add($smallImage)
		.on('click', function() {
			$body.addClass(theClass);
		});

	$zoomLayer
		.on('click', function() {
			$body.removeClass(theClass);
		});

}());