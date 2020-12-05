import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Movie } from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const MoviesPage = () => {
  const {
    wpcontent: {
      page: {
        moviesMeta: { moviesPageDescription, moviesPageHeaderPicture },
      },
      movies: { edges: movies },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "movies", idType: URI) {
          moviesMeta {
            moviesPageDescription
            moviesPageHeaderPicture {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        movies {
          edges {
            node {
              slug
              movie {
                title
                language
                description
                year
                company
                director
                review
                cover {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(quality: 50) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  altText
                }
              }
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Movies" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.PRIMARY}>
        <div className="banner">
          <Image fluid={moviesPageHeaderPicture.imageFile.childImageSharp.fluid} alt={moviesPageHeaderPicture.altText} />
          <BottomEdgeDown color={COLORS.PRIMARY} />
        </div>
        <div className="description">
          <h2>We are Movie Agency</h2>
          <p>{moviesPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="movies">
          <h2>Our Movies</h2>
          <div className="movie-items">
            {movies.map(({ node: {movie, slug}, i}) => {
              return (
                <Movie to={`/${slug}`} key={i}>
                  <Image fluid={movie.cover.imageFile.childImageSharp.fluid} alt={movie.cover.altText} />
                  <div className="movie-info">
                    <p>{movie.title}</p>
                    <p>{`Released: ${movie.year}`}</p>
                  </div>
                </Movie>
              )
            })}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default MoviesPage