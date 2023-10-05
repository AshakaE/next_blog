// components/Post.js

import Link from 'next/link'
import AuthorLink from '../author/[username]'
import { Post } from '@/app/types/apiTypes'
import displayableDate from '@/app/utils/displayableDate'

function PostCard({ post }: { post: Post }) {
    if (!post) {
        return <div>Post unavailable</div>
    }

    const {
        title,
        subtitle,
        author,
        publishDate,
        metaDescription,
        body,
        tags,
    } = post

    return (
        <div className='post'>
            <h2>{`${title}: ${subtitle}`}</h2>
            <p>
                By <AuthorLink author={author} />
            </p>
            <div>{displayableDate(publishDate)}</div>
            <p className='post__description'>{metaDescription}</p>
            <article>{body}</article>
            <ul>
                {tags.map((tag) => (
                    <li className='post__tags' key={tag.name}>
                        <Link href={`/tag/${tag.name}`}>{tag.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostCard
