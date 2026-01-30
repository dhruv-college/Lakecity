import Navbar from '@/components/Navbar';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductContext';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const MapPage = () => {
  const { products } = useProducts();
  const { t } = useLanguage();

  // Group products by location
  const locationGroups = products.reduce((acc, product) => {
    if (!acc[product.location]) {
      acc[product.location] = [];
    }
    acc[product.location].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('discoverLocations')}
            </h1>
            <p className="text-muted-foreground">
              Explore where authentic crafts come from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <MapEmbed height="600px" />
            </div>

            {/* Location List */}
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Artisan Locations ({Object.keys(locationGroups).length})
              </h2>
              
              <div className="space-y-3 max-h-[550px] overflow-auto pr-2">
                {Object.entries(locationGroups).map(([location, locationProducts]) => (
                  <div 
                    key={location}
                    className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <h3 className="font-medium text-foreground">{location}</h3>
                    </div>
                    <div className="space-y-2">
                      {locationProducts.map(product => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              by {product.artisan.name} · ${product.price}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MapPage;
