import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Navigation from './navigation'

import style from '../styles/post.module.css'

const Post = ({
  title,
  date,
  slug,
  excerpt,
  tags,
  html,
  previousPost,
  nextPost,
}) => {
  const previousPath = previousPost && previousPost.fields.slug
  const previousLabel = previousPost && previousPost.frontmatter.title
  const nextPath = nextPost && nextPost.fields.slug
  const nextLabel = nextPost && nextPost.frontmatter.title

  return (
    <div className={style.post}>
      <div className={style.postContent}>
        <h1>{excerpt ? <Link to={slug}>{title}</Link> : title}</h1>
        <div className={style.meta}>
          {date}
        </div>
        {excerpt ? (
          <>
            <p>{excerpt}</p>
            <p>{tags}</p>
            <Link to={slug} className={style.readMore}>
              Read more →
            </Link>
          </>
        ) : (
          <>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <Navigation
              previousPath={previousPath}
              previousLabel={previousLabel}
              nextPath={nextPath}
              nextLabel={nextLabel}
            />
          </>
        )}
      </div>
    </div>
  )
}

Post.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  slug: PropTypes.string,
  excerpt: PropTypes.string,
  html: PropTypes.string,
  tags: PropTypes.string,
  previousPost: PropTypes.object,
  nextPost: PropTypes.object,
}

export default Post
