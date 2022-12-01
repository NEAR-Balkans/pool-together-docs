/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Pool Together on NEAR Docs',
  tagline: 'Documentation Pool Together on NEAR',
  url: 'https://dev.pooltogether.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon-32x32.png',
  organizationName: 'Shard-Labs', // Usually your GitHub org/user name.
  projectName: 'pool-together-docs', // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ['solidity'],
    },
    navbar: {
      title: 'Pool Together on NEAR',
      logo: {
        alt: 'Pool Together on NEAR',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/Shard-Labs/pool-together',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Shard-Labs/pool-together-docs/tree/main/docs',
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      { indexBlog: false, docsRouteBasePath: '/', indexPages: true },
    ],
  ],
}
