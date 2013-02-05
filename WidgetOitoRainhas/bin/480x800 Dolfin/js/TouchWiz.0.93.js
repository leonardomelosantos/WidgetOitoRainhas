/*******************************************************************************
 * Copyright (c) 2009 SAMSUNG. All rights reserved.
 * 
 * The implementations here are only applicable to
 * an emulation environment.  We need to be careful
 * so that we don't override an emulator's native
 * widget object (or existing functions) if it exists.
 * We wrap every prototype in either a
 * 		if (window.widget)
 * or
 * 		if (typeof widget.<function> !== 'function')
 * 
 * Created on: 27 April 2009
 * By: jdance
 *******************************************************************************/

/*
 * This code snippit allows our widget to run in the Opera widget emulator
 * and is silently ignored in other browsers
 */
if (parent.emulator) {
	parent.emulator.begin(window);
}

/**
 * Object Widget() 
 * @constructor
 * @since TouchWiz 0.93
 */
function Widget() {
	// Set up preferences object
	this._prefs = new Object();
};

/**
 * Property widget
 * @type Widget
 * @memberOf Window
 * @addon
 */
if (!window.widget) {
	try {
		/*
		* Some browsers do not have a Window function, and thus no Window.prototype.
		* But Window.prototype is required for JavaScript content assistance.
		* The exception handling allows us to run this emulation library in both
		* types of browsers, with the fall back being to set widget as a property
		* on the window object itself.
		*/
		Window.prototype.widget = new Widget();
	}
	catch(err) {
		window.widget = new Widget();
	}

	/*
	* Handle load so that we have a body to manipulate.     
	* In emulation mode, all widgets start with no scroll bars.
	*/
	
	if (window.addEventListener) {
		// Most browsers
		window.addEventListener('load', function () { document.body.style.overflow = 'hidden'; }, false);
	}
	else if (window.attachEvent) {
		// Internet Explorer
		window.attachEvent('onload', function () { document.body.style.overflow = 'hidden'; });
	}
}

/**
 * Rather than handling networking differently in each
 * widget environment, we wrap XMLHttpRequest in all.	
 * Wrap XMLHttpRequest for abort functionality (record in widget._activeXHR)
 * and to check network access (override send())
 * HTML initializes window._networkAccess.
 * 
 * The following two lines are inline...
 */
var _nativeXHR = window.XMLHttpRequest;
window.XMLHttpRequest = function() {
	var xhr = new _nativeXHR();
	xhr._nativeSend = xhr.send;
	xhr.send = function(data) {
		var network = false;
		if (window._networkAccess) {
			network = true;
		}
		if (!network) {
			throw ('Network access is disabled. See network access in widget configuration.');
		} 
		else {
			xhr._nativeSend(data);
		}
	};
	widget._activeXHR = xhr;
	return xhr;
};

if (typeof widget.openURL !== 'function') {
	/**
	* function <code>openURL(url)</code>
	* opens the url in the browser.
	* @param {String} url
	* @memberOf Widget
	* @since TouchWiz 0.93
	*/
	Widget.prototype.openURL=function(url) {
		window.open(url,'Emulator_Browser'); 
	};
}

if (typeof widget.setPreferenceForKey !== 'function') {
	/**
	* function <code>setPreferenceForKey(pref, key)</code>
	* saves the given preference in a persistent store.
	* The preference can be retrieved by the <code>key</code>.
	* @param {String} pref
	* @param {String} key
	* @memberOf Widget
	* @since TouchWiz 0.93
	*/
	Widget.prototype.setPreferenceForKey=function(pref, key) { 
		this._prefs[key] = pref;
	};
}


if (typeof widget.preferenceForKey !== 'function') {
	/**
	* function <code>preferenceForKey(key)</code>
	* returns the preference previously saved by <code>key</code>
	* or the empty string if key is not found.
	* @param {String} key
	* @returns {String}
	* @memberOf Widget
	* @since TouchWiz 0.93
	*/
	Widget.prototype.preferenceForKey=function(key) {
		if (this._prefs[key]) { 
			return this._prefs[key];
		}
		else {
			return '';
		}
	};
}

if (!widget.sysInfo)
{
	/**
	 * Property sysInfo in <code>widget</code>
	 * contains the function <code>getLanguage()</code>
	 * and <code>network</code> object.
	 * @type WidgetSysInfo
	 * @memberOf Widget
	 * @since TouchWiz 0.93
	 */
	function WidgetSysInfo(){};
	Widget.prototype.sysInfo = new WidgetSysInfo();
	widget.sysInfo = new WidgetSysInfo();
}

if (typeof widget.sysInfo.getLanguage !== 'function') {
	/**
	* function <code>getLanguage()</code>
	* returns the language currently configured on the device.
	* The return value is the two letter language abbreviation
	* in the ISO 639-1 format. For example, 'en' for English.
	* @returns {String}
	* @memberOf WidgetSysInfo
	* @since TouchWiz 0.93
	*/
	WidgetSysInfo.prototype.getLanguage=function() { 
		return "en"; 
	};
}

if (!widget.sysInfo.network)
{
	/**
	 * Property network in <code>widget.sysInfo</code>
	 * contains the function <code>getIsNetworkAvailable()</code>.
	 * @type WidgetNetwork
	 * @memberOf Widget.WidgetSysInfo
	 * @since TouchWiz 0.93
	 */
	function WidgetNetwork(){};
	WidgetSysInfo.prototype.network = new WidgetNetwork();
	widget.sysInfo.network = new WidgetNetwork();
}

if (typeof widget.sysInfo.network.getIsNetworkAvailable !== 'function') {
	/**
	* function <code>getIsNetworkAvailable()</code>
	* returns true if the device is allowed to use the network.
	* @returns {Boolean}
	* @memberOf WidgetNetwork
	* @since TouchWiz 0.93
	*/
	WidgetNetwork.prototype.getIsNetworkAvailable=function() { 
		return true; 
	};
}

if (!widget.error)
{
	/**
	 * Property error
	 * @type WidgetError
	 * @memberOf Widget
	 */
	function WidgetError(){};
	Widget.prototype.error = new WidgetError();
	widget.error = new WidgetError();
}

if (typeof widget.error.notify !== 'function') {
	/**
	* function <code>notify(param)</code>
	* cancels current network operation. Use <code>1</code> to cancel during
	* a refresh. Use <code>2</code> to cancel if the operation exceeds time limit.
	* <code>notify()</code> is not available on Windows Mobile.
	* @param {Number} param (1=during refresh, 2=timeout)
	* @memberOf WidgetError
	* @since TouchWiz 0.93
	*/
	WidgetError.prototype.notify=function(param) {
		if (widget._activeXHR) {
			widget._activeXHR.abort();
			widget._activeXHR = null;
		}
	};
}

if (!widget.window)
{
	/**
	 * Property window in <code>widget</code>
	 * contains the functions <code>resizeWindow()</code>
	 * and <code>setScroll</code>.
	 * @type WidgetWindow
	 * @memberOf Widget
	 * @since TouchWiz 0.93
	 */	
	function WidgetWindow(){};
	Widget.prototype.window = new WidgetWindow();
	widget.window = new WidgetWindow();
}

if (typeof widget.window.resizeWindow !== 'function') {
	/**
	* function <code>resizeWindow(width, height)</code>
	* resizes the widget window to width and height.
	* On Windows Mobile, use <code>window.resizeTo</code>
	* @param {Number} width
	* @param {Number} height
	* @memberOf WidgetWindow
	* @since TouchWiz 0.93
	*/
	WidgetWindow.prototype.resizeWindow=function(width, height) {
		var frame = parent.document.getElementById('uie-emulator-frame');
		if (frame)
		{
			frame.width=width + 'px';
			frame.height=height + 'px';
			parent.window.resizeTo(width, height);
		}
		else
		{
			window.resizeTo(width, height);
		}
	
		/*
	 	* Because of WebKit bug in overflow:auto (see setScroll)
		* we use overflow:scroll, but that causes problems when we
		* resize the window because we really want auto.
		* So on window.resizeTo, switch to auto if we are currently set to scroll
		* (Ignore in Opera Emulator with native handleSetScroll)
		*/
	  	if (document.body.style.overflowY == 'scroll' && window.handleSetScroll == null)
	  	{
	  		document.body.style.overflowY = 'auto';
	  	}
	};
}

if (typeof widget.window.setScroll !== 'function') {
	/**
	* function <code>setScroll(show)</code>
	* displays or hides the scroll bar.
	* @param {Boolean} show
	* @memberOf WidgetWindow
	* @since TouchWiz 0.93
	*/
	WidgetWindow.prototype.setScroll = function(show) {
		/*
		 * Opera Emulator has native handleSetScroll, implemented by plugin
		 */
		if (window.handleSetScroll) {
			window.handleSetScroll(show);
		}
		else {
			/*
			* WebKit does not show scrollbar when switching to auto, 
			* so test if we really need to show, and use scroll instead.
			* Use window.innerHeight because we don't know if we should use
			* body.clientHeight or documentElement.clientHeight.
			* (IE doesn't have window.innerHeight, but it doesn't matter for setScroll.
			* And WebKit seems to always use body rather than documentElement.scrollHeight.)
			*/
			if (show && window.innerHeight < document.body.scrollHeight) {
				document.body.style.overflowY = 'scroll';
			}
			else {
				document.body.style.overflowY = 'hidden';
			}
		}
	};
}

/**
* Windows Mobile specific functionality
*/

if (!widget.widgetMode) {
	/**
	* Property widgetMode
	* contains the current mode of the widget.
	* value is one of <code>'fullscreen'</code>, <code>'docked'</code>, or <code>'widget'</code>.
	* @requires [Windows Mobile]
	* @type {String}
	* @memberOf Widget
	* @since TouchWiz 0.93
	*/
	Widget.prototype.widgetMode = "widget";
	widget.widgetMode = "widget";
}


if (typeof closeMain !== 'function') {
	/**
	* global function <code>closeMain()</code>
	* closes the widget. It is automatically called 
	* when the user presses the phone button.
	* @requires [Windows Mobile]
	* @since TouchWiz 0.93
	*/
	function closeMain() { 
		self.close();
	};
}
