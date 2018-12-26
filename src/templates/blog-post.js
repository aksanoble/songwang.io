import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import HeaderContainer from "theme/containers/HeaderContainer"
import ContentContainer from "theme/containers/ContentContainer.js"
import Comment from "components/Comment"
// import Seo from 'components/Seo.js'

export default class extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { fields: { slug } } = post

    return (
      <Layout>
        {/* <Seo title={post.frontmatter.title} description={post.excerpt} /> */}
        <HeaderContainer>
          <div>
            <h1>{post.frontmatter.title}</h1>
            {post.frontmatter.description ? (
              <p>{post.frontmatter.description}</p>
            ) : (
                <small>{post.frontmatter.date}</small>
              )}
          </div>
        </HeaderContainer>
        <ContentContainer dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <Comment />
      </Layout>
    )
  }
}

// eslint-disable-next-line
export const blogpageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        author
        homeCity
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        layout
        tags
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
