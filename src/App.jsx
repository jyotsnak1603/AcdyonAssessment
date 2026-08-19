import Background3D from './components/Background3D'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import ProductDemo from './components/ProductDemo'
import Features from './components/Features'
import Stats from './components/Stats'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'
import Footer from './components/Footer'
import EasterEgg from './components/EasterEgg'

export default function App() {
  return (
    <>
      <Background3D />
      <CustomCursor />
      <EasterEgg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <SocialProof />
          <ProductDemo />
          <Features />
          <Stats />
          <HowItWorks />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
