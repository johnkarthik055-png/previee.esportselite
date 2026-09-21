import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import ProTrainingBanner from '../components/ProTrainingBanner'
import StatsStrip from '../components/StatsStrip'
import Roadmap from '../components/Roadmap'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureSection />
        <ProTrainingBanner />
        <StatsStrip />
        <Roadmap />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
