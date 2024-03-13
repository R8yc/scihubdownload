chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchSciHub",
    title: "Sci-Hub",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchSciHub" && info.selectionText) {
    const baseSearchUrl = "https://sci-hub.ren"; // 易于修改的搜索地址
    let searchTerm = info.selectionText.trim();
    // 如果所选文本不是以http开始，则假定其为DOI并格式化之
    if (!searchTerm.startsWith('http')) {
      searchTerm = 'https://doi.org/' + searchTerm;
    }
    const searchUrl = `${baseSearchUrl}/${searchTerm}`;
    chrome.tabs.create({ url: searchUrl });
  }
});
