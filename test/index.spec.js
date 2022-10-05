// importamos la funcion que vamos a testear
import { onNavigate } from '../src/main.js'
import { mockTemplateSignIn, mockRoutes } from './mocks.js'

//jest.mock("../src/lib/component/authFirebase.js")
// jest.mock("../src/lib/component/configFirebase.js");
jest.mock('../src/lib/firebase/authFirebase.js');

describe('test onNavigate', () => {
  it('change of view singIn', () => {
    document.body.innerHTML = '<main id="root"></main>'
    onNavigate('/', mockRoutes);
    console.log(document.getElementById('container').textContent.trim())
    expect(document.getElementById('root').textContent.trim()).toEqual('vista de SignIn');
  });
});
