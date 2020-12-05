import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image } from "./templateStyles/movieStyles"

const MovieTemplate = ({data: {wpcontent: {movie: {movie, genres: {edges: genres}}}}}) => {
  //const { picture1, picture2, picture3 } = artist.pictures
  //const pictures = [picture1, picture2, picture3]

  return (
    <Layout>
      <SEO title="Movie" />
      <Wrapper>
        <div className="movie-container">
          <div className="movie-image">
            <Image
              fluid={movie.cover.imageFile.childImageSharp.fluid}
              alt={movie.cover.altText}
            />
            <div className="genres">
              {genres.map(({ node: genre }) => (
                <div key={genre.name} className="genre">
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <h3>
              <span>{`Directed by ${movie.director}`} - </span><span>{movie.year}</span>
            </h3>

            <p className="description">{movie.description}</p>
            <p className="info">
              <strong>Company:</strong> {movie.company}
            </p>
            <p className="info">
              <strong>Language:</strong> {movie.language}
            </p>
            <p className="info">
              <strong>Release Year:</strong> {movie.year}
            </p>
            <p className="info">
              <strong>Review:</strong> {`${movie.review}/10`}
            </p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default MovieTemplate

/* We gaan via de props data binnenkrijgen, deze worden verkregen via een query die we hier gaan definiëren */
export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      movie(id: $id, idType: ID) {
        genres {
          edges {
            node {
              name
            }
          }
        }
        movie {
          title
          description
          language
          company
          year
          director
          review
          cover {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
