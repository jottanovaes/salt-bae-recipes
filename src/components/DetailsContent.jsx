import React from 'react';
import propTypes from 'prop-types';
import { keysByType } from '../constants';
import { Carousel, CarouselCard, Contents,
  ImgCarousel,
  Title } from './style';

export default function DetailsContent({ recipeDetails, carrousel, type }) {
  const keys = keysByType(type);
  return (
    carrousel.length > 0 && (
      <Contents>
        {recipeDetails[0].strYoutube && (
          <>
            <Title>Video</Title>
            <iframe
              width="300"
              height="240"
              src={ `https://www.youtube.com/embed/${
                recipeDetails[0].strYoutube.split(
                  'https://www.youtube.com/watch?v=',
                )[1]
              }` }
              frameBorder="0"
              allowFullScreen
              title="Recipe"
              data-testid="video"
            />
          </>
        )}
        <div
          style={ {
            className: 'carousel',
            overflow: 'hidden',
            maxWidth: '90%',
          } }
        >
          <Carousel
            className="inner"
            style={ {
              display: 'flex',
              whiteSpace: 'nowrap',
              overflowX: 'scroll',
              gap: '0.5rem',
            } }
          >
            {carrousel.map((recipe, index) => (
              <div
                key={ index }
                id={ index }
              >
                <CarouselCard data-testid={ `${index}-recomendation-card` }>
                  <ImgCarousel
                    src={ recipe[keys.image] }
                    alt="Recipe"
                  />
                  <p
                    data-testid={ `${index}-recomendation-title` }
                    style={ {
                      margin: '0',
                      padding: '0.5rem',
                    } }
                  >
                    {recipe[keys.name]}
                  </p>
                </CarouselCard>
              </div>
            ))}
          </Carousel>
        </div>
      </Contents>
    )
  );
}

DetailsContent.propTypes = {
  recipeDetails: propTypes.arrayOf[propTypes.string],
  drinksCarrousel: propTypes.arrayOf[propTypes.objectOf(propTypes.string)],
}.isRequired;
