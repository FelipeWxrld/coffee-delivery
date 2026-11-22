import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    color-scheme: ${({ theme }) => theme.name};
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.text};
    font-size: 1rem;
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.2s, color 0.2s;
  }

  button, input, textarea, select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: 0;
    background: none;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition: none !important;
      animation: none !important;
    }
  }
`
