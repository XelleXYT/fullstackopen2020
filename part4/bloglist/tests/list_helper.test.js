const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is 0', () => {
        const blogs = []
    
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })
    test('when list has only 1 blog equals the likes of that', () => {
        const blogs = [
            {
                likes: 15,
                author: "Alejandro Luna",
                title: "Blog de videojuegos",
                url: "https://xellex.es",
                id: "5f324326bb3f854eecf91300"
            }
        ]
    
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(15)
    })
    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                likes: 15,
                author: "Alejandro Luna",
                title: "Blog de videojuegos",
                url: "https://xellex.es",
                id: "5f324326bb3f854eecf91300"
            },
            {
                likes: 32,
                author: "Alejandro Luna",
                title: "Prueba 1",
                url: "https://xellex.es/",
                id: "5f324d25a2d02e21bcade027"
            },
            {
                likes: 1,
                author: "Prueba",
                title: "Prueba",
                url: "http://prueba.prueba",
                id: "5f324f83181cb51608bb6ad9"
            }
        ]
    
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(48)
    })
})

describe('favorite blog', () => {
    test('of empty list is No blog', () => {
        const blogs = []
    
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({title: "No blog", author: "", likes: 0})
    })
    test('when list has only 1 blog equals that', () => {
        const blogs = [
            {
                likes: 15,
                author: "Alejandro Luna",
                title: "Blog de videojuegos",
                url: "https://xellex.es",
                id: "5f324326bb3f854eecf91300"
            }
        ]
    
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({title: "Blog de videojuegos", author: "Alejandro Luna", likes: 15})
    })
    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                likes: 15,
                author: "Alejandro Luna",
                title: "Blog de videojuegos",
                url: "https://xellex.es",
                id: "5f324326bb3f854eecf91300"
            },
            {
                likes: 32,
                author: "Alejandro Luna",
                title: "Prueba 1",
                url: "https://xellex.es/",
                id: "5f324d25a2d02e21bcade027"
            },
            {
                likes: 1,
                author: "Prueba",
                title: "Prueba",
                url: "http://prueba.prueba",
                id: "5f324f83181cb51608bb6ad9"
            }
        ]
    
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({title: "Prueba 1", author: "Alejandro Luna", likes: 32})
    })
})

describe('favorite author', () => {
    test('of empty list is No blog', () => {
        const blogs = []
    
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({author: "No one", blogs: 0})
    })
    test('when list has only 1 blog equals the author and 1', () => {
        const blogs = [
            {
                likes: 15,
                author: "Alejandro Luna",
                title: "Blog de videojuegos",
                url: "https://xellex.es",
                id: "5f324326bb3f854eecf91300"
            }
        ]
    
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({author: "Alejandro Luna", blogs: 1})
    })
    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                likes: 15,
                author: "Alejandro Luna",
                title: "Blog de videojuegos",
                url: "https://xellex.es",
                id: "5f324326bb3f854eecf91300"
            },
            {
                likes: 32,
                author: "Alejandro Luna",
                title: "Prueba 1",
                url: "https://xellex.es/",
                id: "5f324d25a2d02e21bcade027"
            },
            {
                likes: 1,
                author: "Prueba",
                title: "Prueba",
                url: "http://prueba.prueba",
                id: "5f324f83181cb51608bb6ad9"
            }
        ]
    
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({author: "Alejandro Luna", blogs: 2})
    })

    test('of the mother of the lists is calculated right', () => {
        const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }]
    
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({author: "Robert C. Martin", blogs: 3})
    })
})
