import styled from 'styled-components'

export const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1.25rem 1.25rem;
  margin-top: 1.25rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius.card};
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -12px rgb(0 0 0 / 0.25);
  }
`

export const ImageWrapper = styled.div`
  margin-top: -1.25rem;
`

export const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 0.75rem;
  list-style: none;

  li {
    padding: 0.25rem 0.5rem;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: ${({ theme }) => theme.colors.yellowLight};
    color: ${({ theme }) => theme.colors.yellowDark};
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
  }
`

export const Name = styled.h3`
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
`

export const Description = styled.p`
  flex: 1;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.label};
`

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  margin-top: 2rem;
`

export const Price = styled.p`
  font-size: 0.875rem;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};

  strong {
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 1.5rem;
    font-weight: 800;
  }
`

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const CartButton = styled.button<{ $added: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $added }) => ($added ? theme.colors.yellowDark : theme.colors.purpleDark)};
  color: ${({ theme }) => theme.colors.onAccent};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme, $added }) => ($added ? theme.colors.yellowDark : theme.colors.purple)};
  }
`
