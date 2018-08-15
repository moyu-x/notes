module.exports = {
    title: '墨语笔记补完计划',
    description: '墨语笔记补完计划',
    serviceWorker: true,
    evergreen: true,
    themeConfig: {
      lastUpdated: 'Last Updated',
      searchMaxSuggestions: 10,
      repo: 'idwangmo/note',
      repoLabel: 'Github',
      docsBranch: 'vuepress',
      siderbar: 'auto',
      nav: [
        { text: "主页", link: "https://www.mosdev.xyz"}
      ]
    },
    markdown: {
      lineNumbers: true
    }
  }