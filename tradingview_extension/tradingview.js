//Copyright (c) 2013. Ricardo Hdz. All rights reserved.

var Tradingview_Handler = {
	/**
	* Default TradingView endpoint.
	*
	* @type {string}
	* @private
	**/
	_URL: 'https://www.tradingview.com/symbols/{ticker}/',

    
    /*
    * Create a document node to paste content to.
    * This is a hack as browsers do not let you interact
    * directly with execCommand('paste') contents.
    *
    * @return {string}
    * @private
    */
    _pasteHack: function () {
        var textarea = document.querySelector('textarea') ||
            document.body.appendChild(document.createElement('textarea'));
        textarea.select();
        document.execCommand('paste');
        if (textarea.value.indexOf(',') !== -1) {
            return textarea.value.replace(' ', '').split(',');
        } else {
            return textarea.value.split('\n');
        }
    },

    /*
    * Constructs the standard the lookup url
    *
    * @returns {string}
    * @private
    */
    openUrls : function () {
        var url = '';
        var tickers = this._pasteHack();

        if (tickers) {
            for (var i = 0, t; (t = tickers[i]); i++) {
                url = this._URL.replace(/{ticker}/g, t);
                chrome.tabs.create({url: url});
            }
            
        }
    }
};

/**
* Chrome extension listener for the onClick action event
* on the extension icon.
* 
* @param {function}
*/
chrome.browserAction.onClicked.addListener(function(tab) {
    Tradingview_Handler.openUrls();
});

/** 
 * Opens a new trading view window with given stock tick in omnibox
 * @see https://developer.chrome.com/extensions/omnibox
*/
chrome.omnibox.onInputEntered.addListener(function(stock) {
    var newURL = 'https://www.tradingview.com/symbols/' + encodeURIComponent(stock);
    chrome.tabs.create({ url: newURL });
});