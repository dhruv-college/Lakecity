import { useProducts } from '@/context/ProductContext';

interface MapEmbedProps {
  height?: string;
  showAllProducts?: boolean;
  singleLocation?: { lat: number; lng: number; name: string };
}

const MapEmbed = ({ height = "400px", showAllProducts = true, singleLocation }: MapEmbedProps) => {
  const { products } = useProducts();

  // For a simple MVP, we use a static Google Maps embed
  // TODO: Replace with Google Maps JavaScript API for interactive pins
  // You'll need a Google Maps API key for production
  
  const getMapUrl = () => {
    if (singleLocation) {
      // Single location view
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${singleLocation.lat},${singleLocation.lng}&zoom=12`;
    }
    
    if (showAllProducts && products.length > 0) {
      // For multiple locations, center on first product
      // In production, use a proper clustered map implementation
      const center = products[0].coordinates;
      return `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${center.lat},${center.lng}&zoom=2`;
    }

    // Default world view
    return `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=20,0&zoom=2`;
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border" style={{ height }}>
      <iframe
        src={getMapUrl()}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Artisan Locations Map"
      />
      
      {/* Overlay with location list for MVP */}
      {showAllProducts && products.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-72 max-h-48 overflow-auto bg-background/95 backdrop-blur-sm rounded-lg border border-border p-3 shadow-lg">
          <h4 className="text-sm font-semibold text-foreground mb-2">Artisan Locations</h4>
          <ul className="space-y-1">
            {products.slice(0, 5).map((product) => (
              <li key={product.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="truncate">{product.location} - {product.artisan.name}</span>
              </li>
            ))}
            {products.length > 5 && (
              <li className="text-xs text-primary font-medium">
                +{products.length - 5} more locations
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MapEmbed;
