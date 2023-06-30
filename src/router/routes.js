
const routes = [
  {
    path: '/',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/IndexPage.vue') },
      {
        name: "editChat",
        path: '/exportDocs', component: () => import('pages/EXportDocs.vue')
      },

      {
        path: '/help',
        name: 'help',
        component: () => import('pages/HelpPage.vue')
      },
      {
        name: 'collections', path: '/chat-collections',
        component: () => import('pages/CollectionsPage.vue')
      },
      { name: 'collectionsItems', path: '/chat-collection/:collection', component: () => import('pages/ViewChatCollection.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
