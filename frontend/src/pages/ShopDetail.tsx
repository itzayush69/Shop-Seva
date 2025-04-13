import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '@/contexts/ShopContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Trash2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ShopDetails = () => {
  const { shopId } = useParams();
  const { shops } = useShop();

  const [cartItems, setCartItems] = useState([]);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); 

  const shop = shops.find(s => s.id === shopId);

  if (!shop) {
    return <div className="text-center mt-20 text-2xl">Shop not found 😢</div>;
  }

  const getFakeRating = () => (Math.random() * 1.5 + 3.5).toFixed(1);

  const addToCart = (product) => {
    const price = parseFloat(product.price); // Ensure price is a number
    if (isNaN(price)) {
      console.error(`Invalid price for ${product.name}`);
      return;
    }

    const alreadyInCart = cartItems.find(item => item.id === product.id);
    if (!alreadyInCart) {
      setCartItems(prev => [...prev, { ...product, price, quantity: 1 }]);
    } else {
      setCartItems(prev => prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Updated total calculation with valid checks
  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price); // Parse price to float
      const quantity = parseInt(item.quantity, 10);
      if (!isNaN(price) && !isNaN(quantity)) {
        return sum + (price * quantity);
      }
      return sum;
    }, 0);
  };

  const handleCheckout = () => {
    setShowPaymentPage(true);
  };

  const handlePayment = (method) => {
    setOrderPlaced(true);
    setShowPaymentPage(false);
    setCartItems([]); 
  };

  return (
    <div className="container mx-auto p-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8 font-serif">{shop.name}</h1>
      <p className="text-center text-muted-foreground mb-10">{shop.description}</p>

      {orderPlaced ? (
        <div className="max-w-2xl mx-auto mt-10 border rounded-xl p-6 light:bg-white dark:bg-gray-800 shadow-md text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h2>
          <p className="mb-6 text-muted-foreground">Thanks for shopping with us. Your order has been confirmed.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={() => window.print()}>🧾 Download Invoice</Button>
            <Button variant="secondary" onClick={() => setOrderPlaced(false)}>🛍 Continue Shopping</Button>
          </div>
        </div>
      ) : showPaymentPage ? (
        <div className="max-w-2xl mx-auto border rounded-xl p-6 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4">🧾 Order Summary</h2>
          <ul className="mb-4 space-y-2 text-black">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span> {/* Fixed price multiplication */}
              </li>
            ))}
          </ul>
          <hr className="mb-4" />
          <p className="text-right font-semibold text-lg">Total: ₹{getTotal().toFixed(2)}</p> {/* Fixed total formatting */}

          <Tabs defaultValue="upi" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upi">UPI</TabsTrigger>
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
            </TabsList>
            <TabsContent value="upi">
              <Button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => handlePayment('UPI')}>Pay with UPI</Button>
            </TabsContent>
            <TabsContent value="card">
              <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handlePayment('Card')}>Pay with Card</Button>
            </TabsContent>
            <TabsContent value="cod">
              <Button className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white" onClick={() => handlePayment('Cash on Delivery')}>Pay on Delivery</Button>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6">
            <Button variant="ghost" onClick={() => setShowPaymentPage(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {shop.products.map(product => {
              const rating = getFakeRating();
              const price = parseFloat(product.price);
              if (isNaN(price)) {
                return null; // Skip products with invalid price
              }
              return (
                <Card
                  key={product.id}
                  className="overflow-hidden transition-transform hover:scale-105 hover:shadow-xl group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col justify-between h-[330px]">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
                      <p className="text-green-600 font-bold mb-3 text-md">₹{price.toFixed(2)}</p> {/* Fixed price display */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={16}
                            className={`${idx < Math.floor(Number(rating)) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill={idx < Math.floor(Number(rating)) ? 'yellow' : 'none'}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">{rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="secondary" size="sm" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                      <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => {
                        addToCart(product);
                        handleCheckout();
                      }}>
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {cartItems.length > 0 && (
            <div className="max-w-2xl mx-auto mt-10 border rounded-xl p-6 light:bg-white dark:bg-gray-800 shadow-md">
              <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
              <ul className="space-y-3">
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>{item.name} × {item.quantity}</span>
                    <div className="flex items-center gap-3">
                      <span>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="text-red-500 hover:text-red-700" size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-right font-semibold mt-4">Total: ₹{getTotal().toFixed(2)}</div>
              <Button onClick={handleCheckout} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white">
                Proceed to Payment
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopDetails;
