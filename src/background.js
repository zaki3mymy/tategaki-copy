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
    FILLSTRING = "　"
    // 選択文字の取得
    const selectedText = window.getSelection().toString();
    const separatedText = selectedText.split("\n");

    // 転置処理のために空白で埋める
    const maxLength = Math.max(...separatedText.map(t => t.length));
    const complemented = []
    separatedText.forEach(t => {
        complemented.push(t.padEnd(maxLength, FILLSTRING))
    })
    // 文字列を全て分割して二次元配列にする
    const matrix = complemented.map(t => t.split(""))

    // // 転置処理
    // const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
    // const transposedText = transpose(matrix);
    _rotate = arr => arr[0].map((_, c) => arr.map(r => r[c]).reverse());
    const transposedText = _rotate(matrix)

    // 転置した配列を結合
    const foo = transposedText.map(arr => arr.join(""))
    const bar = foo.reverse().join("\n");

    // クリップボードへ書き込む
    if(navigator.clipboard){
        navigator.clipboard.writeText(bar);
    }
};
