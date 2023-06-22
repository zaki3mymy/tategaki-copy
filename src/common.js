const FILLSTRING = "　";

const rotate = (text) => {
  const separatedText = text.split("\n");

  // 回転処理のために空白で埋める
  // | あい |   → | あい　 |
  // | うえお | → | うえお |
  const maxLength = Math.max(...separatedText.map((t) => t.length));
  const complemented = [];
  separatedText.forEach((t) => {
    complemented.push(t.padEnd(maxLength, FILLSTRING));
  });
  // 文字列を全て分割して二次元配列にする
  // [
  //    ["あ", "い", "　"],
  //    ["う", "え", "お"],
  // ]
  const matrix = complemented.map((t) => t.split(""));

  // 右に90度回転（配列を転置してから各行を逆向きに並び替える）
  // [                    [
  //   ["あ", "う"],         ["う", "あ"],
  //   ["い", "え"],   →     ["え", "い"],
  //   ["　", "お"]          ["お", "　"]
  // ]                    ]
  const _rotate = (arr) => arr[0].map((_, c) => arr.map((r) => r[c]).reverse());
  const rotatedMatrix = _rotate(matrix);

  // 回転した配列を結合
  const rotatedText = rotatedMatrix.map((arr) => arr.join("")).join("\n");

  return rotatedText;
};

export { rotate };
