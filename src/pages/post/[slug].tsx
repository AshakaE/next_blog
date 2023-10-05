import PostCard from './PostCard'
import createApolloClient from '../../../apollo-client'
import { gql } from '@apollo/client'
import { Post } from '@/app/types/apiTypes'
import { Params } from '@/app/types/internalTypes'

function PostPage({ post, error }: { post: Post; error: any }) {
    if (error) {
        return (
            <div>
                <h2>Error fetching data {error}</h2>
            </div>
        )
    }
    return (
        <div>
            <PostCard post={post} />
        </div>
    )
}

export async function getServerSideProps({ params }: {params: Params}) {
    const { slug } = params

    try {
        const client = createApolloClient()
        const { data } = await client.query({
            query: gql`
                query ($slug: String!) {
                    postBySlug(slug: $slug) {
                        title
                        subtitle
                        publishDate
                        metaDescription
                        slug
                        body
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
            variables: { slug },
        })

        const { postBySlug } = data
        console.log(postBySlug)
        return {
            props: { post: postBySlug },
        }
    } catch (error: any) {
        console.error(error)
        return {
            props: { error: error.message },
        }
    }
}

export default PostPage
