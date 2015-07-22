(function () {

	var $body = $('body'),
		$window = $(window),
		$zoomLayer = $('#zoomLayer'),
		$mainImage = $('#mainImage'),
		$zoomImage = $('#zoomImage'),
		$openZoomBtn = $mainImage.find('button'),
		$smallImage = $mainImage.find('img'),
		scrollInertiaTimeout,
		scrollingByCodeTimeout,
		zoomLayerWidth = $zoomLayer.width(),
		zoomLayerHeight = $zoomLayer.height(),
		zoomImageWidth,
		zoomImageHeight,
		isScrollingByCode = false;

	function openZoom() {
		$body.css('overflow', 'hidden');
		$zoomLayer.show();
		zoomImageWidth = $zoomImage.width();
		zoomImageHeight = $zoomImage.height();
		scrollZoomLayerInPercent(0.5, 0.5);
		handlePointerMovement();
		handleScroll();
	}

	function closeZoom() {
		$zoomLayer.hide();
		$body.css('overflow', 'scroll');
		unHandlePointerMovement();
		unHandleScroll();
	}

	function scrollZoomLayerInPercent(xPercent, yPercent) {

		var xStroke = zoomImageWidth - zoomLayerWidth,
			yStroke = zoomImageHeight - zoomLayerHeight;

		isScrollingByCode = true;

		$zoomLayer.scrollTop(yStroke * yPercent);
		$zoomLayer.scrollLeft(xStroke * xPercent);

		clearTimeout(scrollingByCodeTimeout);
		scrollingByCodeTimeout = setTimeout(function(){
			isScrollingByCode = false;
		}, 25);

	}

	function mouseMoveHandler(evt) {
		//unHandleScroll();
		var scrollTargetOffset = $(evt.currentTarget).offset();
		scrollTargetOffset.top -= $window.scrollTop();
		scrollTargetOffset.left -= $window.scrollLeft();
		scrollZoomLayerInPercent((evt.clientX - scrollTargetOffset.left) / zoomLayerWidth, (evt.clientY - scrollTargetOffset.top) / zoomLayerHeight)
	}

	function handlePointerMovement() {
		$zoomLayer.on('mousemove', mouseMoveHandler);
	}

	function unHandlePointerMovement() {
		$zoomLayer.off('mousemove', mouseMoveHandler);
	}

	function scrollHandler() {
		if (isScrollingByCode) return;
		// Scroll happened. Un-handle pointer movement
		unHandlePointerMovement();
		// After 50 ms since the last scroll, restart mouse handling pointer movement
		clearTimeout(scrollInertiaTimeout);
		scrollInertiaTimeout = setTimeout(function () {
			handlePointerMovement();
		}, 100);

	}

	function handleScroll() {
		// When a scroll happens, stops pointer handling
		$zoomLayer.on('scroll', scrollHandler);
	}

	function unHandleScroll() {
		$zoomLayer.off('scroll', scrollHandler);
	}

	$openZoomBtn
		.add($smallImage)
		.on('click', openZoom);

	$zoomLayer
		.on('click', closeZoom);

	$(window).on('resize', function () {
		zoomLayerWidth = $zoomLayer.width();
		zoomLayerHeight = $zoomLayer.height();
	});

}());
