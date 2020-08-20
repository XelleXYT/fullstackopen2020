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

  const blog2 = {
    title: 'Google.es',
    author: 'Google',
    url: 'https://google.es'
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
      cy.get('#notification').contains('wrong username or password')
      cy.get('#notification').should('to.have.class','error')
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
      cy.get('#notification').contains(`a new blog ${blog.title} by ${blog.author}`)
      cy.get('#notification').should('to.have.class','success')
      cy.get('.blog').contains(`${blog.title} - ${blog.author}`)
    })

    describe('When a blog is created', function() {
      
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
        cy.get('#notification').contains(`Liked: ${blog.title} - Total likes: 1`)
        cy.get('#notification').should('to.have.class','success')
        cy.get('.blog').contains('likes 1')
      })

      it('A blog can be deleted by the owner', function() {
        cy.get('.blog').contains('show').click()
        cy.get('.blog').contains('remove').click()
        cy.get('#notification').contains(`Removed blog: ${blog.title} by ${blog.author}`)
        cy.get('#notification').should('to.have.class','success')
        cy.get({}).should('not.contain',blog.title)
      })

      it('A blog cannot be deleted by other user',function() {
        cy.contains('logout').click()
        cy.get('#username').type(user2.username)
        cy.get('#password').type(user2.password)
        cy.get('#loginbtn').click()
        cy.get('.blog').contains('show').click()
        cy.get('.blog').should('not.contain','remove')
      })

      it.only('Blogs are ordered by likes', function() {
        cy.contains('new blog').click()
        cy.get('#title').type(blog2.title)
        cy.get('#author').type(blog2.author)
        cy.get('#url').type(blog2.url)
        cy.get('#createbtn').click()
        cy.contains(`${blog2.title} - ${blog2.author}`)
        cy.get('.blog').eq(0).contains(blog.title)
        cy.get('.blog').eq(1).contains(blog2.title)
        cy.get('.blog').eq(1).contains('show').click()
        cy.get('.blog').eq(1).contains('like').click()
        cy.wait(500)
        cy.get('.blog').eq(0).contains(blog2.title)
        cy.get('.blog').eq(1).contains(blog.title)
        cy.get('.blog').eq(1).contains('show').click()
        cy.get('.blog').eq(1).contains('like').click()
        cy.wait(500)
        cy.get('.blog').eq(0).contains(blog.title)
        cy.get('.blog').eq(1).contains(blog2.title)
      })

    })

  })

})