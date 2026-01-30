import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-lg font-bold text-primary-foreground">A</span>
              </div>
              <span className="font-display text-xl font-semibold text-foreground">Artisan</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              Connecting travelers with authentic local artisans worldwide. Every purchase supports traditional craftsmanship.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-primary fill-primary" /> for artisans everywhere
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Crafts</Link></li>
              <li><Link to="/map" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Location Map</Link></li>
              <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sell Your Craft</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-muted-foreground">Help Center</span></li>
              <li><span className="text-sm text-muted-foreground">Artisan Guidelines</span></li>
              <li><span className="text-sm text-muted-foreground">Contact Us</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Artisan Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
