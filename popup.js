chrome.extension.getBackgroundPage().console.log('in popup');

let chain = document.getElementById('chain');
chain.innerHTML = "New Text"


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.extension.getBackgroundPage().console.log('message block');

        if (request.subject === "chain") {
            chain.innerHTML = request.content;
        }
    }
);