import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/post'

const BlogPostTemplate = ({ data, pageContext }) => {
  // console.log(data);
  const {
    fields: { slug },
    // frontmatter: { title, date, coverImage },
    frontmatter: { title, date, tags},
    html,
    id
  } = data.markdownRemark
  const { next, previous } = pageContext

  return (
    <Layout>
      <Post
        key={id}
        title={title}
        date={date}
        slug={slug}
        html={html}
        tags={tags}
        previousPost={previous}
        nextPost={next}
      />
    </Layout>
  )
}

export default BlogPostTemplate

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($pathSlug: String) {
    markdownRemark(fields: { slug: { eq: $pathSlug } }) {
      fields{
        slug
      }
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        excerpt
        tags
        #coverImage {
        #  childImageSharp {
        #    fluid(maxWidth: 800) {
        #      ...GatsbyImageSharpFluid
        #    }
        #  }
        #}
      }
      html
      id
    }
  }
`
