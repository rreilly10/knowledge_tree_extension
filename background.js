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

chrome.tabs.onCreated.addListener(function (tab) {
    console.log("Tab:" + tab.url);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.history.search({ text: '', maxResults: 10 }, function (data) {
        data.forEach(function (page) {
            console.log(page.url);
        });
    });
});
