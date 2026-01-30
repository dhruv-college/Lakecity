import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapEmbed from '@/components/MapEmbed';
import { useProducts } from '@/context/ProductContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Share2, Heart } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProducts();
  const { t } = useLanguage();

  const product = getProduct(id || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBuyNow = () => {
    // MVP: Just show an alert - no real payment processing
    toast.success(
      `Thank you for your interest in "${product.name}"! In the full version, this would proceed to checkout.`,
      { duration: 5000 }
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.caption,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Artisan Info */}
              <div className="flex items-center gap-3">
                <img
                  src={product.artisan.avatar}
                  alt={product.artisan.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="text-sm text-muted-foreground">Crafted by</p>
                  <p className="font-medium text-foreground">{product.artisan.name}</p>
                </div>
              </div>

              {/* Product Name & Price */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="font-display text-2xl font-bold text-primary">
                  ${product.price} <span className="text-sm font-normal text-muted-foreground">{product.currency}</span>
                </p>
              </div>

              {/* AI Caption */}
              <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                <p className="text-muted-foreground italic">{product.caption}</p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{product.location}</span>
              </div>

              {/* Artisan Story */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">The Story</h3>
                <p className="text-muted-foreground leading-relaxed">{product.story}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="flex-1 btn-primary-glow" onClick={handleBuyNow}>
                  {t('buyNow')} - ${product.price}
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              {/* Map */}
              <div className="pt-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Origin Location</h3>
                <MapEmbed 
                  height="250px" 
                  showAllProducts={false} 
                  singleLocation={{ 
                    lat: product.coordinates.lat, 
                    lng: product.coordinates.lng, 
                    name: product.location 
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
