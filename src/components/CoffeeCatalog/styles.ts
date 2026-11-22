import styled from 'styled-components'
import { media } from '../../styles/themes'

export const CatalogHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`

export const Title = styled.h2`
  margin-right: auto;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.subtitle};

  ${media.mobile} {
    font-size: 1.5rem;
  }
`

export const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.25rem;
  padding: 0 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.label};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.yellowDark};
  }

  input {
    width: 10rem;
    border: 0;
    outline: 0;
    background: transparent;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text};
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.label};
  }

  ${media.mobile} {
    width: 100%;

    input {
      width: 100%;
    }
  }
`

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  button {
    min-height: 2rem;
    padding: 0.375rem 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.yellow};
    border-radius: ${({ theme }) => theme.radius.pill};
    color: ${({ theme }) => theme.colors.yellowDark};
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    transition: background-color 0.15s;
  }

  button[aria-pressed='true'] {
    background: ${({ theme }) => theme.colors.yellowLight};
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2.5rem 2rem;
  margin-top: 3.375rem;

  ${media.laptop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${media.tabletPortrait} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.mobile} {
    grid-template-columns: minmax(0, 20rem);
    justify-content: center;
    margin-top: 2.5rem;
  }
`

export const Empty = styled.p`
  margin-top: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.label};
`
