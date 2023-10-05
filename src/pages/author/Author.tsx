import PostList from '../post/PostList'
import { Author } from '@/app/types/apiTypes'

function Author({ author }: { author: Author }) {
    if (!author) {
        return null
    }

    const { user, postSet, website, bio } = author

    function displayName() {
        return (
            (user.firstName &&
                user.lastName &&
                `${user.firstName} ${user.lastName}`) ||
            user.username
        )
    }

    return (
        <div>
            <h2>{displayName()}</h2>
            <a href={website} target='_blank' rel='noopener noreferrer'>
                Website
            </a>
            <p>{bio}</p>
            <h3>Posts by {displayName()}</h3>
            <PostList posts={postSet} showAuthor={false} />
        </div>
    )
}

export default Author
