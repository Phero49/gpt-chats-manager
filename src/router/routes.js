
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/exportDocs', component: () => import('pages/EXportDocs.vue') },

      { path: '/help', component: () => import('pages/HelpPage.vue') },
      { path: '/chat-collections', component: () => import('pages/CollectionsPage.vue') },
      { path: '/chat-collection/:collection', component: () => import('pages/ViewChatCollection.vue') }
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
