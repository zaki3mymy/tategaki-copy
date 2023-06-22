import { rotate } from "./common.js";

const parent = chrome.contextMenus.create(
  {
    id: "transpose-words",
    title: "選択文字を縦書きでコピー",
    contexts: ["all"],
  },
  () => chrome.runtime.lastError
);

// click event
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "transpose-words":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: main, // front に埋め込まれる関数
      });
      break;
  }
});

const main = () => {
  // 選択文字の取得
  const selectedText = window.getSelection().toString();

  // 処理共通化のため、回転処理はbackgroundで行う
  const promise = chrome.runtime.sendMessage(selectedText);
  promise
    .then((rotatedText) => {
      // クリップボードへ書き込む
      if (navigator.clipboard) {
        navigator.clipboard.writeText(rotatedText);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// 文字列の回転処理
chrome.runtime.onMessage.addListener((text, sender, sendResponse) => {
  const rotatedText = rotate(text);
  sendResponse(rotatedText);
});
