export const mockTemplateSignIn = () => {
    let mockSignInContainer = document.createElement("div")
    const mockTemplate = `<h1>vista de SignIn</h1>`
    
    mockSignInContainer.innerHTML = mockTemplate
    return mockSignInContainer
}

export const mockTemplateSignUp = () => {
    let mockSignUpContainer = document.createElement("div")
    const mockTemplate = `<h1>vista de SignUp</h1>`
    
    mockSignUpContainer.innerHTML = mockTemplate
    return mockSignUpContainer
}


export const mockRoutes = {
    '/': mockTemplateSignIn(),
    '/signUp':mockTemplateSignUp(),
};