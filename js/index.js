(function () {

	var $body = $('body'),
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
		scrollingByCode = false;

	function openZoom() {
		$body.css('overflow', 'hidden');
		$zoomLayer.show();
		zoomImageWidth = $zoomImage.width();
		zoomImageHeight = $zoomImage.height();
		scrollZoomLayerInPercent(0.5, 0.5);
		setTimeout(function () {
			handlePointerMovement();
			handleScroll();
		}, 0);

	}

	function closeZoom() {
		$zoomLayer.hide();
		$body.css('overflow', 'scroll');
		unHandlePointerMovement();
		unHandleScroll();
	}

	function scrollZoomLayerInPercent(xPercent, yPercent) {

		var corsaX = zoomImageWidth - zoomLayerWidth,
			corsaY = zoomImageHeight - zoomLayerHeight;

		scrollingByCode = true;

		$zoomLayer.scrollTop(corsaY * yPercent);
		$zoomLayer.scrollLeft(corsaX * xPercent);

		clearTimeout(scrollingByCodeTimeout);
		scrollingByCodeTimeout = setTimeout(function(){
			scrollingByCode = false;
		}, 25);

	}

	function mouseMoveHandler(evt) {
		//unHandleScroll();
		scrollZoomLayerInPercent(evt.clientX / zoomLayerWidth, evt.clientY / zoomLayerHeight)
	}

	function handlePointerMovement() {
		$zoomLayer.on('mousemove', mouseMoveHandler);
	}

	function unHandlePointerMovement() {
		$zoomLayer.off('mousemove', mouseMoveHandler);
	}

	function scrollHandler() {
		if (scrollingByCode) return;
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