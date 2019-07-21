import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const BlogPage = styled.div`
  font-family: "Courier New"
`

const BlogLink = styled(Link)`
  text-decoration: none;
  font-family: "Courier New"
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: orange;
  font-family: "Courier New"
`

export default ({ data }) => {
console.log(data)
  return (
  <Layout>
    <SEO title="Home" />
    <BlogPage>
      <h1>Logbook</h1>
      <h4>Blog posts: { data.allMarkdownRemark.totalCount }</h4>
      {
        data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>
                { node.frontmatter.title} - {node.frontmatter.date}
              </BlogTitle>
            </BlogLink>
            <p>{node.excerpt}</p>
          </div>
          ))
      }
    </BlogPage>
  </Layout>
)}

export const query = graphql`
  query {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        id
        frontmatter {
          date
          title
        }
        fields {
          slug
        }
        excerpt
      }
    }
    totalCount
  }
}`