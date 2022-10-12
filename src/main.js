// eslint-disable-next-line import/no-cycle
import { signIn } from './lib/View/signIn.js';
import { signUp } from './lib/View/signUp.js';
import { principalPage } from './lib/View/principalPage.js';

function elementRoot() {
  if (document.getElementById('rootDiv') == null) {
    document.body.innerHTML = '<main id="root"></main>';
  }
}
elementRoot();

// objeto de las rutas
const routes = {
  '/': signIn(),
  '/signUp': signUp(),
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
  rootDiv.replaceChildren(paramRoutes[pathname])
};

// permite utilizar flechas del navegador
window.onpopstate = () => {
  rootDiv.replaceChildren(routes[window.location.pathname])
};

// imprime vista iniciar sesión
window.addEventListener('load', () => {
  console.log('rutas', window.location.pathname)
  onNavigate(window.location.pathname)
})




