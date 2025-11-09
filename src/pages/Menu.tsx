import { useState } from 'react';
import { menuItems, categories, subcategories } from '@/data/menuItems';
import { MenuItemCard } from '@/components/MenuItemCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Filter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [spiceLevel, setSpiceLevel] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 25]);
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDietaryFilter = (filter: string) => {
    setDietaryFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(item.subcategory))
      return false;
    if (dietaryFilters.length > 0) {
      const hasAllFilters = dietaryFilters.every((filter) =>
        item.dietaryTags.includes(filter)
      );
      if (!hasAllFilters) return false;
    }
    if (spiceLevel !== 'all' && item.spiceLevel !== spiceLevel) return false;
    if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSubcategories([]);
    setDietaryFilters([]);
    setSpiceLevel('all');
    setPriceRange([0, 25]);
    setSortBy('recommended');
    setSearchQuery('');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Dietary Filters */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Dietary Preferences</Label>
        <div className="space-y-2">
          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Jain'].map((filter) => (
            <div key={filter} className="flex items-center space-x-2">
              <Checkbox
                id={filter}
                checked={dietaryFilters.includes(filter)}
                onCheckedChange={() => toggleDietaryFilter(filter)}
              />
              <Label htmlFor={filter} className="cursor-pointer">
                {filter}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Spice Level */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Spice Level</Label>
        <RadioGroup value={spiceLevel} onValueChange={setSpiceLevel}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="cursor-pointer">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mild" id="mild" />
            <Label htmlFor="mild" className="cursor-pointer">Mild</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hot" id="hot" />
            <Label htmlFor="hot" className="cursor-pointer">Hot</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="extra-hot" id="extra-hot" />
            <Label htmlFor="extra-hot" className="cursor-pointer">Extra Hot</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-base font-semibold mb-3 block">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider
          min={0}
          max={25}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
        />
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-muted-foreground">
            Discover authentic Indian flavors
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            type="search"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-md border bg-background"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popularity">Most Popular</option>
            </select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedSubcategories([]);
              }}
              className="whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Subcategories */}
        {selectedCategory !== 'All' && subcategories[selectedCategory] && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {subcategories[selectedCategory].map((sub) => (
              <Button
                key={sub}
                variant={selectedSubcategories.includes(sub) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleSubcategory(sub)}
                className="whitespace-nowrap"
              >
                {sub}
              </Button>
            ))}
          </div>
        )}

        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20 space-y-6 p-6 border rounded-lg bg-card">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Menu Items Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {sortedItems.length} item{sortedItems.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
            {sortedItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No items found matching your filters</p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
