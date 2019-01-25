chrome.extension.getBackgroundPage().console.log('in popup');
var chain = document.getElementById("chain");

function showChain(historyEntry) {
    var chain = "";
    while (historyEntry) {
        chain += historyEntry.title + "->";
        historyEntry = historyEntry.child;
    }
    return chain
}

chrome.storage.sync.get('head', function (data) {
    var tmp = data.head;
    chrome.extension.getBackgroundPage().console.log(showChain(tmp));

    out = "";
    tmp = data.head;

    while (tmp) {
        out += "<span><a href=\"" + tmp.url + "\" target=\"_blank\">" + tmp.title + "</a></span> -->"
        tmp = tmp.child;
    }

    chain.innerHTML = out;

});