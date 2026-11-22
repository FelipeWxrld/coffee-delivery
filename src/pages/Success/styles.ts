import styled from 'styled-components'
import { media } from '../../styles/themes'

export const SuccessContent = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: end;
  gap: 4rem;
  padding-block: 5rem;

  ${media.tabletPortrait} {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-top: 2.5rem;

    & > svg {
      justify-self: center;
    }
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.yellowDark};

  ${media.small} {
    font-size: 1.75rem;
  }
`

export const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.subtitle};

  ${media.small} {
    font-size: 1rem;
  }
`
