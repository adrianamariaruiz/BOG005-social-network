// eslint-disable-next-line import/no-cycle
import { signIn } from './lib/component/signIn.js';
import { signUp } from './lib/component/signUp.js';
import { principalPage } from './lib/component/principalPage.js';

// objeto de las rutas
const routes = {
  '/': signIn,
  '/signUp': signUp,
  '/principalPage': principalPage(),
};

const rootDiv = document.getElementById('root');
// permite navegar atraves de las ruta
export const onNavigate = (pathname, paramRoutes = routes) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  // rootDiv.innerHTML = paramRoutes[pathname];
  document.getElementById('root').innerHTML = paramRoutes[pathname];
};

// // imprime vista iniciar sesión
// rootDiv.innerHTML = routes[window.location.pathname];
window.addEventListener('load', () => {
  onNavigate(window.location.pathname)
})

// // // permite utilizar flechas del navegador
window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname];
};
