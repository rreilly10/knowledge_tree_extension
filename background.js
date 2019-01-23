chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

class HistoryEntry {
    constructor(url, title, parent, child) {
        this.url = url;
        this.title = title;
        this.parent = parent;
        this.child = child;
    }
}

function addChild(parent, child) {
    parent.child = child
    child.parent = parent
    return child
}

function showChain(historyEntry) {
    var chain = "";
    while (historyEntry) {
        chain += historyEntry.title + "->";
        historyEntry = historyEntry.child;
    }
    return chain
}

var previouslyActive = null; // Variable to know of the most recently activated tab
var head = null; // The origination of a new chain (created when a new tab is created)

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    let tmp = new HistoryEntry(tab.url, tab.title, null, null);

    if (!head) {
        head = tmp;
        previouslyActive = head;
        console.log(head);
    }

    if (previouslyActive.url !== tmp.url) {
        previouslyActive.child = tmp;
        previouslyActive = tmp;
    }

    console.log(showChain(head));
});
