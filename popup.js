chrome.extension.getBackgroundPage().console.log('in popup');

let chain = document.getElementById('chain');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.subject === "chain") {
            chain.innerHTML = request.content;
        }
    }
);