import { gql } from '@apollo/client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import createApolloClient from '../../../apollo-client'
import PostList from '../post/PostList'
import { Post } from '@/app/types/apiTypes'

function PostsByTag({
    posts,
    tag,
    error,
}: {
    posts: Post[]
    tag: string
    error: any
}) {
    if (error) {
        return (
            <div>
                <h2>Error fetching data</h2>
            </div>
        )
    }
    return (
        <div>
            <h2>Posts in #{tag}</h2>
            {posts && <PostList posts={posts} showAuthor={undefined} />}
        </div>
    )
}

export async function getServerSideProps({ params }: { params: Params }) {
    const { tag } = params

    try {
        const client = createApolloClient()
        const { data } = await client.query({
            query: gql`
                query ($tag: String!) {
                    postsByTag(tag: $tag) {
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
            variables: { tag },
        })

        const { postsByTag } = data
        console.log(postsByTag)
        return {
            props: { posts: postsByTag, tag },
        }
    } catch (error: any) {
        console.error(error)
        return {
            props: { error: error.message },
        }
    }
}

export default PostsByTag
