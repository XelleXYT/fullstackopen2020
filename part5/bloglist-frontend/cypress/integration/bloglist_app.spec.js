describe('Blog app', function() {

  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginbtn').click()
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('asdf')
      cy.get('#password').type('fdsa')
      cy.get('#loginbtn').click()
      cy.get('#message').contains('wrong username or password')
      cy.get('#message').should('to.have.class','error')
    })

  })
})