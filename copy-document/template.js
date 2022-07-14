//Copyright (c) 2022. Ricardo Hdz. All rights reserved.

/** 
 * Opens a new tab with a HM template
 * @see https://developer.chrome.com/extensions/omnibox
*/
chrome.omnibox.onInputEntered.addListener(function(candidate) {
    templateId = '1e9wB4tqJKc6LhcBZju1X7ECQb4GepfdREet_0yKQetY';
    title = candidate + ' - HM Topgrading';
    folderId ='1hy2l8I99HxJhueDG6HjezDLdJhCmyBFo'
    documentUrl = 'https://docs.google.com/document/d/' +
        '{templateId}/copy?id={templateId}&copyCollaborators=false&copyComments=false&includeResolvedCommentsOnCopy=false' +
        '&title={title}&copyDestination={folderId}&usp=docs_web';
        documentUrl = documentUrl.replace(/{templateId}/g, templateId).replace(/{title}/g, title).replace(/{folderId}/g, folderId)
    chrome.tabs.create({ url: documentUrl });
});