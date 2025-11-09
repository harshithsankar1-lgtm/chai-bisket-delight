import { MenuItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  onClick?: () => void;
}

export const MenuItemCard = ({ item, onClick }: MenuItemCardProps) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  return (
    <Card
      className="overflow-hidden hover-lift cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {item.originalPrice && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            Save ${(item.originalPrice - item.price).toFixed(2)}
          </Badge>
        )}
        {item.isPopular && (
          <Badge className="absolute top-2 right-2 bg-warning text-black">
            Popular
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-success' : 'bg-destructive'}`} />
              <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
          <Badge variant="secondary" className="text-xs">
            {item.prepTime} min
          </Badge>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {item.dietaryTags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            {item.originalPrice && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-primary">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleQuickAdd}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
