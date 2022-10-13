// importamos la funcion que vamos a testear
import { onNavigate } from '../src/main.js'
import { mockTemplateSignIn, mockRoutes } from './mocks.js'

jest.mock('../src/lib/firebase/authFirebase.js');
jest.mock('../src/lib/firebase/configFirestore.js');

describe('test onNavigate', () => {
  it('change of view singIn', () => {
    document.body.innerHTML = '<main id="root"></main>'
    onNavigate('/signUp', mockRoutes);
    console.log(document.getElementById('root').textContent)
    expect(document.getElementById('root').textContent.trim()).toEqual('vista de SignIn');
  });
});
