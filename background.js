chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchSciHub",
    title: "Sci-Hub",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchSciHub" && info.selectionText) {
    const baseSearchUrl = "https://www.sci-hub.ren"; // 修改为你需要的Sci-Hub网址
    let searchTerm = info.selectionText.trim();

    // 提取 DOI 部分（假设文本格式为 DOI 或 DOI URL）
    const doiRegex = /(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)$/i;
    const match = searchTerm.match(doiRegex);

    if (match) {
      searchTerm = match[0];  // 获取匹配的 DOI 部分
    } else {
      // 如果没有找到 DOI，直接返回（或处理错误）
      return;
    }

    // 构建搜索网址
    const searchUrl = `${baseSearchUrl}/${searchTerm}`;
    chrome.tabs.create({ url: searchUrl });
  }
});
