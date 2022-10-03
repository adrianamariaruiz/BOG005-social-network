export const mockTemplateSignIn = () => {
    let mockSignInContainer = document.createElement("div")
    const mockTemplate = `<h1>vista de SignIn</h1>`
    
    mockSignInContainer.innerHTML = mockTemplate
    return mockSignInContainer
}


export const mockRoutes = {
    '/': mockTemplateSignIn(),
};