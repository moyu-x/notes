module.exports = {
  title: '墨语笔记补完',
  description: '日常读书笔记、每日的文章阅读重要部分注记录',
  serviceWorker: true,
  evergreen: true,
  cache: true,
  themeConfig: {
    lastUpdated: '上次修改',
    searchMaxSuggestions: 10,
    repo: 'idwangmo/note',
    repoLabel: 'Github',
    docsBranch: 'master',
    siderbar: 'auto',
    nav: [
      { text: "墨语的后花园", link: "https://www.idwangmo.top" }
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
  },
  plugins: [
    ['mathjax', {
      target: 'svg',
      macros: {
        '*': '\\times',
      },
    }],
  ]
}
