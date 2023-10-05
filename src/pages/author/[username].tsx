import { gql } from '@apollo/client'
import Link from 'next/link'
import createApolloClient from '../../../apollo-client'
import { Params } from '@/app/types/internalTypes'
import { User } from '@/app/types/apiTypes'
import Error404Page from '@/app/customComponents/404'

export interface AuthorLinkProps {
    user: User
}

function AuthorLink({ author, error }: { author: AuthorLinkProps; error?: any }) {
    // if (error) {
       return <Error404Page />
    // }
    const { user } = author
    const linkUrl = `/author/${user.username}`

    const displayName =
        (user.firstName &&
            user.lastName &&
            `${user.firstName} ${user.lastName}`) ||
        user.username

    return <Link href={linkUrl}>{displayName}</Link>
}

export async function getServerSideProps({ params }: { params: Params }) {
    const { username } = params

    try {
        const client = createApolloClient()
        const { data } = await client.query({
            query: gql`
                query ($username: String!) {
                    authorByUsername(username: $username) {
                        website
                        bio
                        user {
                            firstName
                            lastName
                            username
                        }
                        postSet {
                            title
                            subtitle
                            publishDate
                            published
                            metaDescription
                            slug
                            tags {
                                name
                            }
                        }
                    }
                }
            `,
            variables: { username },
        })

        const { authorByUsername } = data

        return {
            props: { author: authorByUsername },
        }
    } catch (error: any) {
        console.error(error)
        return {
            props: { error: error.message },
        }
    }
}

export default AuthorLink
