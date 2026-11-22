import { Coffee as CoffeeIcon, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { useTheme as useStyledTheme } from 'styled-components'
import { CoffeeCatalog } from '../../components/CoffeeCatalog'
import { HeroIllustration } from '../../components/HeroIllustration'
import { coffees } from '../../data/coffees'
import { Container } from '../../styles/shared'
import { CatalogSection, Features, HeroContent, HeroImage, HeroSection, Subtitle, Title } from './styles'

export function Home() {
  const { colors } = useStyledTheme()

  const features = [
    { icon: ShoppingCart, text: 'Compra simples e segura', color: colors.yellowDark },
    { icon: Package, text: 'Embalagem mantém o café intacto', color: colors.text },
    { icon: Timer, text: 'Entrega rápida e rastreada', color: colors.yellow },
    { icon: CoffeeIcon, text: 'O café chega fresquinho até você', color: colors.purple },
  ]

  return (
    <>
      <HeroSection>
        <Container>
          <HeroContent>
            <div>
              <Title>Encontre o café perfeito para qualquer hora do dia</Title>
              <Subtitle>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</Subtitle>

              <Features>
                {features.map(({ icon: Icon, text, color }) => (
                  <li key={text}>
                    <span style={{ backgroundColor: color }}>
                      <Icon size={16} weight="fill" />
                    </span>
                    {text}
                  </li>
                ))}
              </Features>
            </div>

            <HeroImage>
              <HeroIllustration />
            </HeroImage>
          </HeroContent>
        </Container>
      </HeroSection>

      <Container>
        <CatalogSection>
          <CoffeeCatalog coffees={coffees} />
        </CatalogSection>
      </Container>
    </>
  )
}
