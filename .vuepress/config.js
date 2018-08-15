module.exports = {
    title: '墨语笔记补完计划',
    description: '墨语笔记补完计划',
    serviceWorker: true,
    evergreen: true,
    themeConfig: {
      lastUpdated: '上次修改',
      searchMaxSuggestions: 10,
      repo: 'idwangmo/note',
      repoLabel: 'Github',
      docsBranch: 'vuepress',
      siderbar: 'auto',
      nav: [
        { text: "主页", link: "https://www.mosdev.xyz"}
      ],
      configureWebpack: {
        resolve: {
          alias: {
            '@img': 'static/image'
          }
        }
      }
    },
    markdown: {
      lineNumbers: true
    }
  }