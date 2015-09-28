(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.ZoomLight = factory();
	}
}(this, function () {

	var _defaultSettings = {
			container: window,
			zoomLayer: ".zoomLayer",
			zoomImage: ".zoomImage",
			fullScreen: true // TODO: DETECT IF USAGE IS FULL SCREEN INSTEAD OF RELYING ON OPTIONS?
		},
		_supportsAddEventListener = !!window.addEventListener,
		_supportsAttachEvent = !!window.attachEvent,
		_originalOverflow,
		_bodyEl = document.querySelector('body');


	/*
	 * PRIVATE FUNCTIONS *NOT RELATED* TO A SPECIFIC INSTANCE OF ZOOM LIGHT
	 * --------------------------------------------------------------------
	 */

	function _addEventListener(element, eventName, callback) {
		// Use addEventListener if available
		if (_supportsAddEventListener) {
			element.addEventListener(eventName, callback);
			return;
		}
		// Otherwise use attachEvent, set this and event
		if (_supportsAttachEvent) {
			element.attachEvent('on' + eventName, (function (el) {
				return function () {
					callback.call(el, window.event);
				};
			}(element)));
			// Break closure and primary circular reference to element
			element = null;
		}
	}

	function _removeEventListener(element, eventName, callback) {
		// Use removeEventListener if available
		if (_supportsAddEventListener) {
			element.removeEventListener(eventName, callback);
			return;
		}
		// Otherwise use detachEvent
		if (_supportsAttachEvent) {
			element.detachEvent('on' + eventName, callback);
		}
	}

	function _merge_objects(obj1, obj2) {
		var obj3 = {}, propertyName;
		for (propertyName in obj1) {
			if (obj1.hasOwnProperty(propertyName)) {
				obj3[propertyName] = obj1[propertyName];
			}
		}
		for (propertyName in obj2) {
			if (obj2.hasOwnProperty(propertyName)) {
				obj3[propertyName] = obj2[propertyName];
			}
		}
		return obj3;
	}

	function _bind(fn, obj) {
		return function () {
			return fn.apply(obj, arguments);
		};
	}

	function _findPos(obj) {
		var curTop = 0,
			curLeft = 0;
		if (obj.offsetParent) {
			// NOT POSITION FIXED, NOT IE9
			do {
				curLeft += obj.offsetLeft;
				curTop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return [curLeft, curTop, false];
		} else {
			// POSITION FIXED
			return [obj.offsetLeft, obj.offsetTop, true];
		}
	}

	/*
	 * PRIVATE FUNCTIONS *RELATED* TO A SPECIFIC INSTANCE OF ZOOM LIGHT
	 * ---------------------------------------------------------------
	 */

	/**
	 * Stores zoom layer size
	 * @private
	 */
	ZoomLight.prototype._handleResizeFn = function () {
		var originalDisplay = this._zoomLayerEl.style.display,
			originalVisibility = this._zoomLayerEl.style.visibility;

		this._zoomLayerEl.style.visibility = "hidden";
		this._zoomLayerEl.style.display = "block";

		this._zoomLayerWidth = this._zoomLayerEl.clientWidth;
		this._zoomLayerHeight = this._zoomLayerEl.clientHeight;

		var zoomLayerPosition = _findPos(this._zoomLayerEl);
		this._zoomLayerLeft = zoomLayerPosition[0];
		this._zoomLayerTop = zoomLayerPosition[1];
		this._isPositionFixed = zoomLayerPosition[2];

		this._zoomLayerEl.style.display = originalDisplay;
		this._zoomLayerEl.style.visibility = originalVisibility;

	};

	ZoomLight.prototype._handleMouseMoveFn = function (evt) {

		var relativeMouseX = evt.clientX,
			relativeMouseY = evt.clientY;

		if (!this._settings.fullScreen) {

			relativeMouseX -= this._zoomLayerLeft;
			relativeMouseY -= this._zoomLayerTop;

			if (!this._isPositionFixed) {
				relativeMouseX += window.pageXOffset;
				relativeMouseY += window.pageYOffset;
			}
		}

		var toXPercent = relativeMouseX / this._zoomLayerWidth;
		var toYPercent = relativeMouseY / this._zoomLayerHeight;

		/*console.log(
		 'x: ' + toXPercent,
		 'y: ' + toYPercent,
		 //'||',
		 'windowScrollLeft: ' + windowScrollLeft,
		 'windowScrollTop: ' + windowScrollTop,
		 '||',
		 '_zoomLayerWidth: ' + this._zoomLayerWidth,
		 '_zoomLayerHeight: ' + this._zoomLayerHeight,
		 '||',
		 'evt.clientX: ' + evt.clientX,
		 'evt.clientY: ' + evt.clientY
		 );*/

		this._scrollZoomLayerInPercent(
			toXPercent,
			toYPercent
		);
	};

	ZoomLight.prototype._handleScrollFn = function (evt) {
		//console.log("SCROLL");
		if (this._isScrollingByCode) {
			//console.log("SCROLL > DO NOTHING (by code)");
			return;
		}
		// User scroll happened. Un-handle pointer movement for a while
		if (this._isListeningMouseMove) {
			//console.log("SCROLL > STOP LISTEN MOUSE MOVE (by user)");
			this._stopListenMouseMove();
			// After 50 ms since the last scroll, restart mouse handling pointer movement
			clearTimeout(this._scrollInertiaTimer);
			this._scrollInertiaTimer = setTimeout(_bind(function () {
				// TODO: FIX THIS!!!
				//console.log("SCROLL > RESTART LISTEN MOUSE MOVE (by user)");
				this._startListenMouseMove();
			}, this), 1000);
		}
	};

	/**
	 * Scrolls the element
	 * @param xPercent
	 * @param yPercent
	 * @private
	 */
	ZoomLight.prototype._scrollZoomLayerInPercent = function (xPercent, yPercent) {
		var xStroke = this._zoomImageWidth - this._zoomLayerWidth,
			yStroke = this._zoomImageHeight - this._zoomLayerHeight;

		// Setting _isScrollingByCode for the next 25 milliseconds
		this._isScrollingByCode = true;
		clearTimeout(this._scrollingByCodeTimer);
		this._scrollingByCodeTimer = setTimeout(_bind(function () {
			this._isScrollingByCode = false;
			//console.log('ScrollingByCode SET TO FALSE');
		}, this), 100);

		this._zoomLayerEl.scrollLeft = xStroke * xPercent;
		this._zoomLayerEl.scrollTop = yStroke * yPercent;
	};

	ZoomLight.prototype._startListenMouseMove = function () {
		this._isListeningMouseMove = true;
		_addEventListener(this._zoomLayerEl, "mousemove", _bind(this._handleMouseMoveFn, this));
	};

	ZoomLight.prototype._stopListenMouseMove = function () {
		this._isListeningMouseMove = false;
		_removeEventListener(this._zoomLayerEl, "mousemove", _bind(this._handleMouseMoveFn, this));
	};

	ZoomLight.prototype._startListenScroll = function () {
		_addEventListener(this._zoomLayerEl, "scroll", _bind(this._handleScrollFn, this));
	};

	ZoomLight.prototype._stopListenScroll = function () {
		_removeEventListener(this._zoomLayerEl, "mousemove", _bind(this._handleScrollFn, this));
	};

	/*
	 * PUBLIC FUNCTIONS
	 * ----------------
	 */

	ZoomLight.prototype.destroy = function () {
		_removeEventListener(window, "resize", _bind(this._handleResizeFn, this));
		this._queryOriginNode = null;
		this._settings = null;
	};

	ZoomLight.prototype.openZoom = function () {
		if (this._settings.fullScreen) {
			_originalOverflow = _bodyEl.style.overflow; // Save original overflow
			_bodyEl.style.overflow = "hidden"; // Overflow -> Hidden
		}
		this._zoomLayerEl.style.display = "block"; // Show the layer
		this._zoomImageWidth = this._zoomImageEl.clientWidth;
		this._zoomImageHeight = this._zoomImageEl.clientHeight;
		this._scrollZoomLayerInPercent(.5, .5);
		this._startListenMouseMove();
		this._startListenScroll();
	};

	ZoomLight.prototype.closeZoom = function () {
		this._zoomLayerEl.style.display = "none"; // Hide the layer
		_bodyEl.style.overflow = _originalOverflow;
		this._stopListenMouseMove();
		this._stopListenScroll();
	};

	/*
	 * INITIALIZER
	 * -----------
	 */

	function ZoomLight(instanceSettings) {

		// Merging arguments settings to override defaults
		this._settings = _merge_objects(_defaultSettings, instanceSettings);

		// Setting the query origin for the elements selectors
		this._queryOriginNode = this._settings.container === window ? document : this._settings.container;

		// Querying elements
		this._zoomLayerEl = this._queryOriginNode.querySelector(this._settings.zoomLayer);
		this._zoomImageEl = this._queryOriginNode.querySelector(this._settings.zoomImage);

		// Tells ZoomLight if scroll was caused by code (and not by the user)
		this._isScrollingByCode = false;

		// Saving original document overflow style ("scroll" in most cases)
		_originalOverflow = _bodyEl.style.overflow;

		// Listen to resize and execute resize handler now
		// TODO: THROTTLE / DEBOUNCE RESIZE HANDLER
		_addEventListener(window, "resize", _bind(this._handleResizeFn, this));
		this._handleResizeFn();

	}

	return ZoomLight;

}));
