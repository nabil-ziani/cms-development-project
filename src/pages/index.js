import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, Movie, BottomEdgeDown, BottomEdgeUp } from './pageStyles/pageStyles'
import { COLORS } from '../constants'

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageHeaderTitle,
          homePageHeaderDescription,
          homePageHeaderPicture,
          homePageDescription,
          homePageFeaturedMovies,
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          homeMeta {
            homePageHeaderTitle
            homePageHeaderDescription
            homePageHeaderPicture {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            homePageDescription
            homePageFeaturedMovies {
              ... on WPGraphql_Movie {
                id
                movie {
                  title
                  description
                  year
                  language
                  director
                  company
                  review
                  cover {
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 100, background: "#000") {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  console.log(homePageFeaturedMovies)
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} alt={homePageHeaderPicture.altText} />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageHeaderDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="movies">
          <h2>Featured Movies</h2>
          <div className="movie-items">
            {homePageFeaturedMovies.map(({movie, slug}) => (
              <Movie to={`/${slug}`}>
                <Image fluid={movie.cover.imageFile.childImageSharp.fluid} altText={movie.cover.altText}/>
                <div className="movie-info">
                <p>{movie.title}</p>
                <p>{`Released: ${movie.year}`}</p>
                </div>
              </Movie>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
