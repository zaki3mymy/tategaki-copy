const parent = chrome.contextMenus.create({
    id: "transpose-words",
    title: "選択文字を縦書きでコピー",
    contexts: ["all"],
}, () => chrome.runtime.lastError);

// click event
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "transpose-words":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: main,
            });
            break;
    }
});

const main = () => {
    // 選択文字の取得
    const selectedText = window.getSelection().toString();

    // 回転処理
    const rotatedText = rotate(selectedText)

    // クリップボードへ書き込む
    if(navigator.clipboard){
        navigator.clipboard.writeText(rotatedText);
    }
};
