import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Product } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <article className="card-artisan rounded-xl overflow-hidden animate-fade-up">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <span className="absolute top-3 left-3 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Artisan Info */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={product.artisan.avatar}
              alt={product.artisan.name}
              className="h-6 w-6 rounded-full object-cover ring-2 ring-background"
            />
            <span className="text-xs text-muted-foreground">{product.artisan.name}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* AI Caption */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.caption}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-foreground">
              ${product.price}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{product.location}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
