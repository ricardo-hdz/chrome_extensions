//Copyright (c) 2013. Ricardo Hdz. All rights reserved.

var Yahoo_Handler = {
	/**
	* Default Yahoo endpoint.
	*
	* @type {string}
	* @private
	**/
	_URL: 'https://simplywall.st/stocks/us/consumer-retailing/nasdaq-{ticker}',

    
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
        return textarea.value;    
    },

    /*
    * Constructs the standard the lookup url
    *
    * @returns {string}
    * @private
    */
    _getUrl : function (baseUrl) {
        var url = '';
        var ticker = this._pasteHack();

        if (ticker) {
            var url = baseUrl.replace(/{ticker}/g, ticker);
        }

        return url;
    },
	
	/**
	* Creates a new chrome tab requesting the specified Jira ticket URL.
	*
	* @public
	**/
	openUrl: function() {
        var url = this._getUrl(this._URL);
        chrome.tabs.create({url: url});
	}
};

/**
* Chrome extension listener for the onClick action event
* on the extension icon.
* 
* @param {function}
*/
chrome.browserAction.onClicked.addListener(function(tab) {
    Yahoo_Handler.openUrl();
});