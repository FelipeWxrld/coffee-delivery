import styled from 'styled-components'
import { media } from '../../styles/themes'

export const HeroSection = styled.section`
  background: ${({ theme }) => theme.colors.heroGlow};
`

export const HeroContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 29.75rem);
  align-items: center;
  gap: 3.5rem;
  padding-block: 5.75rem 6.75rem;

  ${media.tabletPortrait} {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-block: 2rem 3rem;
    text-align: center;
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.title};

  ${media.mobile} {
    font-size: 2rem;
  }
`

export const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.subtitle};

  ${media.mobile} {
    font-size: 1rem;
  }
`

export const Features = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 2.5rem;
  margin-top: 4.125rem;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  li span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    color: #fff;
  }

  ${media.tabletPortrait} {
    max-width: 36rem;
    margin: 2.5rem auto 0;
    text-align: left;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

export const HeroImage = styled.div`
  display: flex;
  justify-content: center;

  ${media.tabletPortrait} {
    order: -1;

    svg {
      max-width: 20rem !important;
    }
  }
`

export const CatalogSection = styled.div`
  padding-block: 2rem 9.75rem;

  ${media.mobile} {
    padding-bottom: 4rem;
  }
`
