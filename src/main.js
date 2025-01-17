// eslint-disable-next-line import/no-cycle
import { signIn } from './lib/View/signIn.js';
import { signUp } from './lib/View/signUp.js';
import { principalPage } from './lib/View/principalPage.js';

const rootDiv = document.getElementById('root');

// objeto de las rutas
const routes = {
  '/': signIn(),
  '/signUp': signUp(),
  '/principalPage': principalPage(),
};


// permite navegar atraves de las ruta
export const onNavigate = (pathname, paramRoutes = routes) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  document.getElementById('root').replaceChildren(paramRoutes[pathname])
};

// permite utilizar flechas del navegador
window.onpopstate = () => {
  rootDiv.replaceChildren(routes[window.location.pathname])
};

// imprime vista iniciar sesión
window.addEventListener('load', () => {
  // console.log('rutas', window.location.pathname)
  onNavigate(window.location.pathname)
})




