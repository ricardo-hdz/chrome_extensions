//Copyright (c) 2013. Ricardo Hdz. All rights reserved.

var Barchart_Handler = {
	/**
	* Default Barchart endpoint.
	*
	* @type {string}
	* @private
	**/
	_URL: 'https://www.barchart.com/stocks/quotes/{ticker}/interactive-chart/fullscreen',

    
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
    Barchart_Handler.openUrls();
});