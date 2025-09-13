import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  specs: {
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
    cores?: string;
    frequency?: string;
    memory?: string;
    interface?: string;
  };
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Gaming PC Pro",
    price: 120000,
    category: "computers",
    specs: {
      cpu: "Intel i7-13700K",
      gpu: "RTX 4070 Ti",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD"
    },
    image: "/img/f709b270-ef56-46e9-a38e-d199682e7ad3.jpg"
  },
  {
    id: 2,
    name: "Workstation Ultra",
    price: 200000,
    category: "computers",
    specs: {
      cpu: "Intel i9-13900K",
      gpu: "RTX 4090",
      ram: "64GB DDR5",
      storage: "2TB NVMe SSD"
    },
    image: "/img/fa9eaa09-98c8-4b88-9426-ba2d79af2a3d.jpg"
  },
  {
    id: 3,
    name: "Intel i7-13700K",
    price: 35000,
    category: "components",
    specs: {
      cores: "16 cores",
      frequency: "5.4 GHz Turbo"
    },
    image: "/img/fa9eaa09-98c8-4b88-9426-ba2d79af2a3d.jpg"
  },
  {
    id: 4,
    name: "RTX 4070 Ti",
    price: 60000,
    category: "components",
    specs: {
      memory: "12GB GDDR6X",
      interface: "PCIe 4.0"
    },
    image: "/img/fa9eaa09-98c8-4b88-9426-ba2d79af2a3d.jpg"
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToComparison = (product: Product) => {
    if (!comparisonList.find(p => p.id === product.id)) {
      setComparisonList([...comparisonList, product]);
    }
  };

  const removeFromComparison = (productId: number) => {
    setComparisonList(comparisonList.filter(p => p.id !== productId));
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold neon-text gradient-neon bg-clip-text text-transparent">
                TechStore
              </h1>
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="neon-glow hover:neon-glow">
                  <Icon name="Home" size={16} className="mr-2" />
                  Главная
                </Button>
                <Button variant="ghost">
                  <Icon name="Monitor" size={16} className="mr-2" />
                  Компьютеры
                </Button>
                <Button variant="ghost">
                  <Icon name="Cpu" size={16} className="mr-2" />
                  Комплектующие
                </Button>
                <Button variant="ghost">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Контакты
                </Button>
                <Button variant="ghost">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Сервис
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative neon-glow">
                    <Icon name="ShoppingCart" size={20} />
                    {cartItems.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 px-1 text-xs animate-pulse-neon">
                        {cartItems.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="neon-text">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cartItems.length === 0 ? (
                      <p className="text-muted-foreground">Корзина пуста</p>
                    ) : (
                      <>
                        {cartItems.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-card rounded border neon-glow">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-primary font-bold">{item.price.toLocaleString()} ₽</p>
                            </div>
                          </div>
                        ))}
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold">Итого:</span>
                            <span className="font-bold text-primary text-xl neon-text">
                              {cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()} ₽
                            </span>
                          </div>
                          <Button className="w-full neon-glow gradient-neon">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 neon-text animate-pulse-neon">
            Будущее технологий
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Откройте для себя мир высокотехнологичных компьютеров и комплектующих 
            с неоновой подсветкой и киберпанк эстетикой
          </p>
          <Button size="lg" className="neon-glow gradient-neon hover:scale-105 transition-transform">
            <Icon name="Zap" size={20} className="mr-2" />
            Исследовать каталог
          </Button>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center neon-text">Каталог товаров</h3>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all" className="neon-glow">Все</TabsTrigger>
              <TabsTrigger value="computers" className="neon-glow">ПК</TabsTrigger>
              <TabsTrigger value="components" className="neon-glow">Комплектующие</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="neon-glow hover:scale-105 transition-transform bg-card">
                    <CardHeader>
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="neon-text">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{key.toUpperCase()}:</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-primary neon-text">
                          {product.price.toLocaleString()} ₽
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 neon-glow"
                          onClick={() => addToCart(product)}
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-1" />
                          В корзину
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="neon-glow"
                          onClick={() => addToComparison(product)}
                        >
                          <Icon name="GitCompare" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comparison Table */}
      {comparisonList.length > 0 && (
        <section className="py-16 px-4 bg-card">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold neon-text">Сравнение товаров</h3>
              <Button 
                variant="outline"
                onClick={() => setComparisonList([])}
                className="neon-glow"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Очистить
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="w-32">Характеристика</TableHead>
                    {comparisonList.map((product) => (
                      <TableHead key={product.id} className="text-center min-w-48">
                        <div className="space-y-2">
                          <div className="font-bold neon-text">{product.name}</div>
                          <div className="text-primary font-bold">
                            {product.price.toLocaleString()} ₽
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromComparison(product.id)}
                            className="neon-glow"
                          >
                            <Icon name="X" size={14} />
                          </Button>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {['cpu', 'gpu', 'ram', 'storage', 'cores', 'frequency', 'memory', 'interface'].map((spec) => {
                    const hasValues = comparisonList.some(product => product.specs[spec as keyof typeof product.specs]);
                    if (!hasValues) return null;
                    
                    return (
                      <TableRow key={spec} className="border-border">
                        <TableCell className="font-medium text-muted-foreground">
                          {spec.toUpperCase()}
                        </TableCell>
                        {comparisonList.map((product) => (
                          <TableCell key={product.id} className="text-center">
                            {product.specs[spec as keyof typeof product.specs] || '—'}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4 neon-text">TechStore</h4>
              <p className="text-muted-foreground">
                Ваш надежный партнер в мире высокотехнологичных решений
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 neon-text">Каталог</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Компьютеры</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Комплектующие</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Периферия</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 neon-text">Сервис</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Ремонт</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Сборка ПК</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантия</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 neon-text">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>📞 +7 (999) 123-45-67</p>
                <p>📧 info@techstore.ru</p>
                <p>📍 г. Москва, ул. Технологическая, 1</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TechStore. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}