import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Chai Bisket</h3>
            <p className="text-primary-foreground/80 mb-4">
              Authentic Indian cuisine crafted with love and tradition. Experience the rich flavors
              of India in every bite.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/#story" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/#location" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Location & Hours
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="location">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  123 Main Street, Suite 100<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">hello@chaibisket.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Hours</p>
              <p className="text-primary-foreground/80 text-sm">
                Mon-Fri: 11:00 AM - 10:00 PM<br />
                Sat-Sun: 10:00 AM - 11:00 PM
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div id="contact">
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to get special offers and updates!
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Chai Bisket LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
