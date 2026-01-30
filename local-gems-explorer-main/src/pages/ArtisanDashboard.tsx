import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductContext';
import { useLanguage } from '@/context/LanguageContext';
import { generateAICaption } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Upload, Loader2, Check, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const ArtisanDashboard = () => {
  const { addProduct, products } = useProducts();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    story: '',
    category: '',
    image: '',
  });
  
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Placeholder images for MVP
  const placeholderImages = [
    'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=600&h=600&fit=crop',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateCaption = async () => {
    if (!formData.name || !formData.story) {
      toast.error('Please enter a product name and story first');
      return;
    }
    
    setIsGenerating(true);
    try {
      // TODO: Replace with actual AI API call (OpenAI, Claude, etc.)
      const generatedCaption = await generateAICaption(formData.name, formData.story);
      setCaption(generatedCaption);
      toast.success('AI caption generated!');
    } catch (error) {
      toast.error('Failed to generate caption');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.location || !formData.story || !caption) {
      toast.error('Please fill in all fields and generate a caption');
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with Firebase Firestore save
    addProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      currency: 'USD',
      image: formData.image || placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
      caption: caption,
      story: formData.story,
      location: formData.location,
      coordinates: { lat: 0, lng: 0 }, // In production, use geocoding
      artisan: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      },
      category: formData.category || 'Crafts',
    });

    toast.success('Product added successfully!');
    
    // Reset form
    setFormData({
      name: '',
      price: '',
      location: '',
      story: '',
      category: '',
      image: '',
    });
    setCaption('');
    setIsSubmitting(false);
  };

  // Get user's recent products (for MVP, we filter by artisan name)
  const myProducts = products.filter(p => p.artisan.name === 'You').slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Artisan Dashboard
            </h1>
            <p className="text-muted-foreground">
              Share your craft with the world. Add your handmade products and let AI help tell your story.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">{t('addProduct')}</CardTitle>
                  <CardDescription>Fill in the details about your handcrafted product</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g., Hand-Woven Basket"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Price & Category */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (USD) *</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          placeholder="45"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          min="1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          name="category"
                          placeholder="e.g., Textiles"
                          value={formData.category}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Your Location *</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g., Marrakech, Morocco"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Image URL (MVP - in production use file upload) */}
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL (optional)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="image"
                          name="image"
                          placeholder="https://... or leave empty for placeholder"
                          value={formData.image}
                          onChange={handleInputChange}
                        />
                        <Button type="button" variant="outline" size="icon" disabled>
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Leave empty to use a placeholder image. In production, this would support file upload.
                      </p>
                    </div>

                    {/* Story */}
                    <div className="space-y-2">
                      <Label htmlFor="story">Your Story *</Label>
                      <Textarea
                        id="story"
                        name="story"
                        placeholder="Tell the story behind your craft. What makes it special? What traditions does it carry?"
                        value={formData.story}
                        onChange={handleInputChange}
                        required
                        rows={4}
                      />
                    </div>

                    {/* AI Caption Section */}
                    <div className="space-y-3 p-4 bg-secondary/50 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <Label>AI-Generated Caption</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateCaption}
                          disabled={isGenerating || !formData.name || !formData.story}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              {t('generateCaption')}
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {caption ? (
                        <div className="flex items-start gap-2 p-3 bg-background rounded-md">
                          <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground italic">{caption}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Click the button to generate an engaging caption for your product.
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting || !caption}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Add Product'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Products Listed</span>
                    <span className="font-display font-bold text-foreground">{myProducts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Views</span>
                    <span className="font-display font-bold text-foreground">--</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Messages</span>
                    <span className="font-display font-bold text-foreground">--</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Products */}
              {myProducts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-lg">Your Products</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {myProducts.map(product => (
                      <div key={product.id} className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">${product.price}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Tips */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Tips for Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Use high-quality photos</li>
                    <li>• Share your personal story</li>
                    <li>• Describe traditional techniques</li>
                    <li>• Be specific about materials</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtisanDashboard;
