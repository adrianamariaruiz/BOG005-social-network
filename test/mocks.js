const mockTemplateSignIn = () => {
    let mockSignInContainer = document.createElement("div")
    const mockTemplate = `<h1>vista de SignIn</h1>`
    
    mockSignInContainer.innerHTML = mockTemplate
    return mockSignInContainer
}

const mockTemplateSignUp = () => {
    let mockSignUpContainer = document.createElement("div")
    const mockTemplate = `<h1>vista de SignUp</h1>`
    
    mockSignUpContainer.innerHTML = mockTemplate
    return mockSignUpContainer
}

const mockPrincipalPage = ()=>{
    const wall = document.createElement('main')
    wall.classList = 'wall'
    wall.id = 'root'

    const infoMock = document.createElement('h1')
    infoMock.textContent = 'Publicar mock'

    wall.append(infoMock)

    return wall
}


export const mockRoutes = {
    '/': mockTemplateSignIn(),
    '/signUp':mockTemplateSignUp(),
    '/principalPage': mockPrincipalPage(),
};