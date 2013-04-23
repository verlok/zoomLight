(function() {

	var zoomOpenClass = 'zoomLayerVisible',
		$body = $('body'),
		$zoomLayer = $('#zoomLayer'),
		$mainImage = $('#mainImage'),
		$openZoomBtn = $mainImage.find('button'),
		$smallImage = $mainImage.find('img');

	$openZoomBtn
		.add($smallImage)
		.on('click', function() {
			$body.addClass(zoomOpenClass);
		});

	$zoomLayer
		.on('click', function() {
			$body.removeClass(zoomOpenClass);
		});

}());