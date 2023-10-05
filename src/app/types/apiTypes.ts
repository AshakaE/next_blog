export interface User {
    firstName: string
    lastName: string
    username: string
}

export interface Tag {
    name: string
}

export interface Author {
    website: string
    bio: string
    user: User
    postSet: Post[]
}

export interface Post {
    title: string
    subtitle: string
    publishDate: string
    metaDescription: string
    slug: string
    body: string
    author: {
        user: User
    }
    tags: Tag[]
}
