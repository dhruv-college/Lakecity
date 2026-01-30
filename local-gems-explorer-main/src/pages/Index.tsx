import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      
      {/* Map Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Global Artisan Network</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('discoverLocations')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore where authentic crafts come from. Each pin represents a skilled artisan carrying forward generations of tradition.
            </p>
          </div>
          <MapEmbed height="500px" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
