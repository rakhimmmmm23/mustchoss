import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
   {
      path: '/',
      name: 'home',
      component: HomeView,
   },
   {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
   },
   {
      path: '/establishmentsNearby',
      name: 'establishmentsNearby',
      component: () => import('../views/EstablishmentsNearby.vue'),
   },
   {
      path: '/rates/:est_id',
      name: 'rates',
      component: () => import('../views/RatesCatalog.vue'),
   },
   {
      path: '/:slug/promo/:type',
      name: 'promo',
      component: () => import('../views/PromoSingle.vue'),
   },
   {
      path: '/:city/promos/:slug?',
      name: 'promos',
      component: () => import('../views/PromosView.vue'),
   },
   {
      path: '/:city/news',
      children: [
         {
            path: '',
            name: 'news_all',
            component: () => import('../views/NewsView.vue'),
         },
         {
            path: ':slug',
            name: 'news_single',
            component: () => import('../views/NewsSingle.vue'),
         },
      ],
   },
   {
      // категории
      path: '/:cat_city',
      children: [
         {
            path: '',
            name: 'archive',
            component: () => import(/* webpackChunkName: "about" */ '../views/ArchiveView.vue'),
         },
         {
            path: 'category/:cat',
            name: 'cat-page',
            component: () => import(/* webpackChunkName: "about" */ '../views/CatViews.vue'),
         },
         {
            // при совпадении пути с шаблоном /:cat_city/:slug
            // в <router-view> компонента User будет показан UserProfile
            path: ':slug',
            name: 'single',
            component: () => import('../views/SingleView.vue'),
         },
         {
            // при совпадении пути с шаблоном /:cat_city/:slug
            // в <router-view> компонента User будет показан UserProfile
            path: ':slug/otzyvy',
            name: 'otzyvy',
            component: () => import('../views/ReviewsView.vue'),
         },
         {
            path: ':slug/menyu',
            name: 'menyu',
            component: () => import('../views/menu/MenuView.vue'),
            children: [
               {
                  path: '',
                  name: 'menyu_main',
                  component: () => import('../views/menu/menu-main.vue'),
               },
               {
                  path: ':menucat',
                  name: 'menyu_cat',
                  component: () => import('../views/menu/menu-cat.vue'),
               },
            ],
         },
         {
            path: ':slug/menyu/basket',
            name: 'order_basket',
            component: () => import('../views/menu/OrderBasket.vue'),
         },
      ],
   },
   {
      // кабинет
      path: '/kabinet',
      children: [
         {
            path: '',
            name: 'kabinet',
            component: () =>
               import(/* webpackChunkName: "about" */ '../views/cabinet/kabinet-main.vue'),
         },
         {
            path: 'bonusy',
            name: 'kabinet_bonusy',
            component: () => import('../views/cabinet/kabinet-bonusy.vue'),
         },
         {
            path: 'karty',
            name: 'kabinet_karty',
            component: () => import('../views/cabinet/kabinet-karty.vue'),
         },
         {
            path: 'zakazy',
            name: 'kabinet_zakazy',
            component: () => import('../views/cabinet/kabinet-zakazy.vue'),
         },
         {
            path: 'rezervy',
            name: 'kabinet_rezervy',
            component: () => import('../views/cabinet/kabinet-rezervy.vue'),
         },
      ],
   },
   {
      // Модератор
      path: '/moderator',
      children: [
         {
            path: '',
            name: 'moderator',
            component: () => import('../views/moderator/moderator-main.vue'),
         },
         {
            path: 'users',
            name: 'moderator_users',
            component: () => import('../views/moderator/moderator-users.vue'),
         },
         {
            path: 'moderation',
            name: 'moderator_moderation',
            component: () => import('../views/moderator/moderator-moderation.vue'),
         },
         {
            path: 'without_owner',
            name: 'moderator_without_owner',
            component: () => import('../views/moderator/moderator-withoutOwner.vue'),
         },
         {
            path: 'new',
            name: 'moderator_new',
            component: () => import('../views/moderator/moderator-new.vue'),
         },
      ],
   },
   {
      // Модератор
      path: '/biznes',
      children: [
         {
            path: '',
            name: 'biznes',
            component: () => import('../views/biznes/biznes-main.vue'),
         },
         {
            path: 'novoe',
            name: 'biznes_novoe',
            component: () => import('../views/moderator/moderator-new.vue'),
         },
      ],
   },
   {
      // Редактирование заведения
      path: '/edit',
      component: () => import('../views/edit/editView.vue'),
      children: [
         {
            path: '',
            redirect: '/404',
         },
         {
            path: ':id',
            name: 'edit',
            component: () => import('../views/edit/edit-main.vue'),
         },
         {
            path: ':id/menu',
            name: 'edit_menu',
            component: () => import('../views/edit/edit-menu.vue'),
         },
         {
            path: ':id/reviews',
            name: 'edit_reviews',
            component: () => import('../views/edit/edit-reviews.vue'),
         },
         {
            path: ':id/news',
            name: 'edit_news',
            component: () => import('../views/edit/edit-news.vue'),
         },
         {
            path: ':id/promo',
            name: 'edit_promo',
            component: () => import('../views/edit/edit-promo.vue'),
         },
         {
            path: ':id/reserves',
            name: 'edit_reserves',
            component: () => import('../views/edit/edit-reserves.vue'),
         },
         {
            path: ':id/delivery',
            name: 'edit_delivery',
            component: () => import('../views/edit/edit-delivery.vue'),
         },
         {
            path: ':id/preorder',
            name: 'edit_preorder',
            component: () => import('../views/edit/edit-preorder.vue'),
         },
         {
            path: ':id/newsletter',
            name: 'edit_newsletter',
            component: () => import('../views/edit/edit-newsletter.vue'),
         },
         {
            path: ':id/edit',
            name: 'edit_edit',
            component: () => import('../views/edit/edit-edit.vue'),
         },
         {
            path: ':id/settings',
            name: 'edit_settings',
            component: () => import('../views/edit/edit-settings.vue'),
         },
      ],
   },
   {
      path: '/notice',
      name: 'notice',
      component: () => import('../views/NoticeView.vue'),
   },
   {
      path: '/izbrannoye',
      name: 'izbrannoye',
      component: () => import('../views/FavoritesView.vue'),
   },
   {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "about" */ '../errors/page-404.vue'),
   },
   {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

router.beforeEach((to, from, next) => {
   const authPages = [
      '/kabinet',
      '/kabinet/bonusy',
      '/kabinet/karty',
      '/kabinet/zakazy',
      '/kabinet/rezervy',
      '/moderator',
      '/moderator/users',
      '/moderator/moderation',
      '/moderator/without_owner',
      '/moderator/new',
      '/edit',
      '/edit/:id',
      '/edit/:id/menu',
      '/edit/:id/reviews',
      '/edit/:id/promo',
      '/edit/:id/reserves',
      '/edit/:id/delivery',
      '/edit/:id/preorder',
      '/edit/:id/newsletter',
      '/edit/:id/edit',
      '/edit/:id/settings',
      '/biznes',
      '/biznes/novoe',
      '/notice',
      '/izbrannoye',
   ];
   const authRequired = authPages.includes(to.path);
   const loggedIn = localStorage.getItem('user');
   if (authRequired && !loggedIn) {
      next('/404');
   } else {
      next();
   }
});

export default router;
