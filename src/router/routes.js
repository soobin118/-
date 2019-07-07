const routes = [
  {path: '/', component: () => import('@/components/Login')},
  {path: '/App', component: () => import('@/components/App')},
  {path: '/App_Radio', component: () => import('@/components/App_Radio')},
  {path: '/NavigationFavorite', component: () => import('@/components/NavigationFavorite')},
  {path: '/NavigationSearch', component: () => import('@/components/NavigationSearch')},
  {path: '/Start', name: 'start', component: () => import('@/components/Start')},
  {path: '/Manual', component: () => import('@/components/Manual')},
  {path: '/Seat', component: () => import('@/components/Seat')},
  {path: '/Member', component: () => import('@/components/Member')},
  {path: '/CarInfo', component: () => import('@/components/CarInfo')},
  {path: '/TunerInfo', component: () => import('@/components/TunerInfo')},
  {path: '/map', component: () => import('@/components/googlemap')}
]

export default routes
