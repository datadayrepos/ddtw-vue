// docs/.vitepress/config.mts
import fs from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

function buildSidebar() {
  return [
    {
      items: [
        { text: 'Home', link: '/' },
        { text: 'Quickstart', link: '/pages/getting-started' },
      ],
    },
    {
      text: 'Components',
      collapsible: true,
      items: [...getComponents()],
    },
    {
      text: 'Form',
      collapsible: true,
      items: [...getFormComponents()],
    },
    {
      text: 'Typography',
      collapsible: true,
      items: [
        ...getTypography(),
      ],
    },
    {
      text: 'Utils',
      collapsible: true,
      items: [...getUtils()],
    },
    {
      text: 'PLAYGROUND',
      collapsible: true,
      items: [...getPlayground()],
    },
  ]
}

function getComponents() {
  return [
    { text: 'Accordion', link: '/components/accordion' },
    { text: 'Alert', link: '/components/alert' },
    { text: 'Avatar', link: '/components/avatar' },
    { text: 'Badge', link: '/components/badge' },
    { text: 'Breadcrumb', link: '/components/breadcrumb' },
    { text: 'Button', link: '/components/button' },
    { text: 'Button Group', link: '/components/button-group' },
    { text: 'Card', link: '/components/card.md' },
    { text: 'Carousel', link: '/components/carousel' },
    { text: 'Dropdown', link: '/components/dropdown' },
    { text: 'Jumbotron', link: '/components/jumbotron' },
    { text: 'ListGroup', link: '/components/list-group' },
    { text: 'Pagination', link: '/components/pagination' },
    { text: 'Progress', link: '/components/progress' },
    { text: 'Rating', link: '/components/rating' },
    { text: 'Spinner', link: '/components/spinner' },
    { text: 'Table', link: '/components/table' },
    { text: 'Tabs', link: '/components/tabs' },
    { text: 'Timeline', link: '/components/timeline' },
    { text: 'Toast', link: '/components/toast' },
    { text: 'Tooltip', link: '/components/tooltip' },
    { text: 'Modal', link: '/components/modal' },
    { text: 'Navbar', link: '/components/navbar' },
    { text: 'Footer', link: '/components/footer' },
    { text: 'Sidebar', link: '/components/sidebar' },
  ]
}

function getFormComponents() {
  return [
    { text: 'Input', link: '/components/input' },
    { text: 'File Input', link: '/components/fileInput' },
    { text: 'Select', link: '/components/select' },
    { text: 'Textarea', link: '/components/textarea' },
    { text: 'Checkbox', link: '/components/checkbox' },
    { text: 'Radio', link: '/components/radio' },
    { text: 'Toggle', link: '/components/toggle' },
    { text: 'Range', link: '/components/range' },
  ]
}

function getUtils() {
  return [
    { text: 'Flowbite Themable', link: '/components/themable/themable.md' },
    { text: 'Toast Provider', link: '/components/toastProvider/toastProvider.md' },
  ]
}

function getTypography() {
  return [
    { text: 'Blockquote', link: '/components/blockquote' },
    { text: 'Heading', link: '/components/heading' },
    { text: 'Paragraph', link: '/components/paragraph' },
    { text: 'Image', link: '/components/image' },
    { text: 'Link', link: '/components/link' },
  ]
}

function getPlayground() {
  return [
    { text: 'Playground', link: '/components/xplayground.md' },
  ]
}

/**
 * This can be used as an example
 * https://github.com/vuejs/vitepress/blob/master/docs/.vitepress/config.js
 */
export default defineConfig({
  title: 'Ddtw Vue 3',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg', href: '/assets/a_favicon.png' }],

  ],
  themeConfig: {
    sidebar: buildSidebar(),
    logo: '/assets/a_favicon.png',
    socialLinks: [

    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © DataDayRepos',
    },
  },
  // Vite-specific configuration
  vite: {
    resolve: {
      alias: [
        {
          find: /^@datadayrepos\/ddtw-vue$/,
          replacement: resolve(__dirname, '../../src/index.ts'),
        },
      ],
    },
    server: {
      port: Number.parseInt('5172', 10) || 3000, // Use the environment variable or default to 3000
      host: '0.0.0.0',
      https: {
        key: fs.readFileSync('./.cert/key.pem'),
        cert: fs.readFileSync('./.cert/cert.pem'),
      },
    },
  },
})
