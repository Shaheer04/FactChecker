// This file is responsible for interacting with the web page's content. 
// It listens for messages from the background script and handles the selected text, 
// sending it to the background script for processing.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSelectedText") {
        const selectedText = window.getSelection().toString();
        sendResponse({ text: selectedText });
    }
});