import styled from 'styled-components'

export const LogoContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  img {
    flex-shrink: 0;
  }
`

export const Wordmark = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1;
  font-family: ${({ theme }) => theme.fonts.title};

  strong {
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.purpleText};
  }

  small {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.colors.yellowDark};
  }
`
