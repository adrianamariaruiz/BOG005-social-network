// importamos la funcion que vamos a testear
import { onNavigate } from '../src/main.js'
import { mockRoutes } from './mocks.js'


jest.mock('../src/lib/firebase/authFirebase.js');
jest.mock('../src/lib/firebase/configFirestore.js');


describe('test onNavigate', () => {
  it('change of view singIn', () => {
    document.body.innerHTML = `<main id="root"></main>`;
    onNavigate('/', mockRoutes);
    expect(document.getElementById('root').textContent).toEqual('vista de SignIn');
  });
});

describe('test onNavigate', () => {
  it('change of view singUp', () => {
    document.body.innerHTML = `<main id="root"></main>`;
    onNavigate('/signUp', mockRoutes);
    expect(document.getElementById('root').textContent).toEqual('vista de SignUp');
  });
});

describe('test onNavigate', () => {
  it('change of view principalPage', () => {
    document.body.innerHTML = `<main id="root"></main>`;
    onNavigate('/principalPage', mockRoutes);
    expect(document.getElementById('root').textContent).toEqual('Publicar mock');
  });
});

