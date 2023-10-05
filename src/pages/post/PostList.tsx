// components/BlogPostList.js

import Link from 'next/link'
import AuthorLink from '../author/[username]'
import displayableDate from '@/app/utils/displayableDate'

function PostList({ posts, showAuthor }: any) {
    return (
        <div>
            <ol className='post-list'>
                {posts.map((post: any) => (
                    <li className='post' key={post.title}>
                        <span className='post__title'>
                            <Link href={`/post/${post.slug}`}>
                              {`${post.title}: ${post.subtitle}`}
                            </Link>
                        </span>
                        {showAuthor && (
                            <span>
                                by <AuthorLink author={post.author} />
                            </span>
                        )}
                        <div className='post__date'>{displayableDate(post.publishDate)}</div>
                        <p className='post__description'>
                            {post.metaDescription}
                        </p>
                        <ul>
                            {post.tags.map((tag: any) => (
                                <li className='post__tags' key={tag.name}>
                                    <Link href={`/tag/${tag.name}`}>
                                        #{tag.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default PostList
