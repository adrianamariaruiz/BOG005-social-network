// eslint-disable-next-line import/no-cycle
import { signIn } from './lib/component/signIn.js';
import { signUp } from './lib/component/signUp.js';
import { principalPage } from './lib/component/principalPage.js';

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
<<<<<<< HEAD
  rootDiv.innerHTML = routes[window.location.pathname];
};
=======
  rootDiv.replaceChildren(routes[window.location.pathname])
};

// imprime vista iniciar sesión
window.addEventListener('load', () => {
  onNavigate(window.location.pathname)
})





>>>>>>> 3fce34f091b547b0750a064c3d46d314dc133d25
