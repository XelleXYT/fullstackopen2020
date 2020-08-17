describe('Blog app', function() {

  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
  }

  const user2 = {
    name: 'Prueba2',
    username: 'Prueba2',
    password: 'Prueba2'
  }

  const blog = {
    title: 'XelleX.es',
    author: 'Alejandro Luna',
    url: 'https://xellex.es'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
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

  describe('When logged in', function() {
    
    beforeEach(function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginbtn').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#createbtn').click()
      cy.get('#message').contains(`a new blog ${blog.title} by ${blog.author}`)
      cy.get('#message').should('to.have.class','success')
      cy.get('.blog').contains(`${blog.title} - ${blog.author}`)
    })

    describe.only('When a blog is created', function() {
      
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type(blog.title)
        cy.get('#author').type(blog.author)
        cy.get('#url').type(blog.url)
        cy.get('#createbtn').click()
      })

      it('A blog can be liked', function() {
        cy.get('.blog').contains('show').click()
        cy.get('.blog').contains('likes 0')
        cy.get('.blog').contains('like').click()
        cy.get('#message').contains(`Liked: ${blog.title} - Total likes: 1`)
        cy.get('#message').should('to.have.class','success')
        cy.get('.blog').contains('likes 1')
      })

      it('A blog can be deleted by the owner', function() {
        cy.get('.blog').contains('show').click()
        cy.get('.blog').contains('remove').click()
        cy.get('#message').contains(`Removed blog: ${blog.title} by ${blog.author}`)
        cy.get('#message').should('to.have.class','success')
        cy.get({}).should('not.contain',blog.title)
      })

      it('A blog cannot be deleted by other user',function(){
        cy.contains('logout').click()
        cy.get('#username').type(user2.username)
        cy.get('#password').type(user2.password)
        cy.get('#loginbtn').click()
        cy.get('.blog').contains('show').click()
        cy.get('.blog').should('not.contain','remove')
      })

    })

  })

})