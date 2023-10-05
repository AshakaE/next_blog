import Link from 'next/link'

import { gql } from '@apollo/client'
import PostList from './post/PostList'
import createApolloClient from '../../apollo-client'
import { Post } from '@/app/types/apiTypes'


function Home({ allPosts, error }: { allPosts: Post[]; error: any }) {
    if (error) {
        return (
            <div>
                <h2>Error fetching data {error}</h2>
            </div>
        )
    }

    return (
        <div>
            <h2>All posts</h2>
            {allPosts && <PostList posts={allPosts} showAuthor={null} />}
        </div>
    )
}

export default Home

export async function getServerSideProps() {
    try {
        const client = createApolloClient()
        const { data } = await client.query({
            query: gql`
                query {
                    allPosts {
                        title
                        subtitle
                        publishDate
                        published
                        metaDescription
                        slug
                        author {
                            user {
                                username
                                firstName
                                lastName
                            }
                        }
                        tags {
                            name
                        }
                    }
                }
            `,
        })

        const allPosts = data.allPosts
        return {
            props: { allPosts },
        }
    } catch (error: any) {
        console.log(error)
        return {
            props: { error: error.message },
        }
    }
}
