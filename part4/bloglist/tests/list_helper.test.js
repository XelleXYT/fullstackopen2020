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
                autor: "Alejandro Luna",
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
                autor: "Alejandro Luna",
                title: "Blog de videojuegos",
                url: "https://xellex.es",
                id: "5f324326bb3f854eecf91300"
            },
            {
                likes: 32,
                autor: "Alejandro Luna",
                title: "Prueba 1",
                url: "https://xellex.es/",
                id: "5f324d25a2d02e21bcade027"
            },
            {
                likes: 1,
                autor: "Prueba",
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
        expect(result).toEqual({title: "No blog", autor: "", likes: 0})
    })
    test('when list has only 1 blog equals that', () => {
        const blogs = [
            {
                likes: 15,
                autor: "Alejandro Luna",
                title: "Blog de videojuegos",
                url: "https://xellex.es",
                id: "5f324326bb3f854eecf91300"
            }
        ]
    
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({title: "Blog de videojuegos", autor: "Alejandro Luna", likes: 15})
    })
    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                likes: 15,
                autor: "Alejandro Luna",
                title: "Blog de videojuegos",
                url: "https://xellex.es",
                id: "5f324326bb3f854eecf91300"
            },
            {
                likes: 32,
                autor: "Alejandro Luna",
                title: "Prueba 1",
                url: "https://xellex.es/",
                id: "5f324d25a2d02e21bcade027"
            },
            {
                likes: 1,
                autor: "Prueba",
                title: "Prueba",
                url: "http://prueba.prueba",
                id: "5f324f83181cb51608bb6ad9"
            }
        ]
    
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({title: "Prueba 1", autor: "Alejandro Luna", likes: 32})
    })
})
