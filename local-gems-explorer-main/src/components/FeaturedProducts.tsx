import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const { products } = useProducts();

  // Show first 6 products on homepage
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('productFeed')}
            </h2>
            <p className="text-muted-foreground">Handpicked treasures from around the world</p>
          </div>
          <Button asChild variant="ghost" className="mt-4 sm:mt-0 group">
            <Link to="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
