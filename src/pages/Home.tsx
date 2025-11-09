import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, Heart } from 'lucide-react';
import { menuItems } from '@/data/menuItems';
import { MenuItemCard } from '@/components/MenuItemCard';
import heroImg from '@/assets/hero-bg.jpg';

const Home = () => {
  const featuredItems = menuItems.filter((item) => item.isPopular).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Authentic Indian Flavors
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Experience the rich taste of tradition in every bite
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-slide-up">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Fresh ingredients and authentic recipes passed down through generations
              </p>
            </div>
            <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-muted-foreground">
                Hot and fresh meals delivered to your doorstep in 30 minutes
              </p>
            </div>
            <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-muted-foreground">
                Every dish is prepared with care and attention to detail
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Popular Dishes</h2>
            <p className="text-xl text-muted-foreground">
              Customer favorites that keep them coming back
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/menu">
              <Button size="lg" variant="outline">
                View Full Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Founded in 2020, Chai Bisket brings the authentic flavors of India to your neighborhood.
              Our chefs use traditional recipes and the finest ingredients to create dishes that transport
              you to the streets of Mumbai and Delhi.
            </p>
            <p className="text-lg text-muted-foreground">
              From our family to yours, we're committed to serving food that's made with love,
              tradition, and the warmth of Indian hospitality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
