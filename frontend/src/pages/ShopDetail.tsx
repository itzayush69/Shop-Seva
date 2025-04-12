// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useShop } from '@/contexts/ShopContext';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// const ShopDetails = () => {
//   const { shopId } = useParams();
//   const { shops } = useShop();

//   const shop = shops.find(s => s.id.toString() === shopId);

//   if (!shop) {
//     return <div className="text-center mt-20 text-2xl">Shop not found 😢</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 py-8 animate-fade-in">
//       <h1 className="text-4xl font-bold text-center mb-8 font-serif">{shop.name}</h1>
//       <p className="text-center text-muted-foreground mb-10">{shop.description}</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         {shop.products && shop.products.length > 0 ? (
//           shop.products.map(product => (
//             <Card 
//               key={product.id} 
//               className="overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
//             >
//               <div className="aspect-video relative">
//                 <img 
//                   src={product.image} 
//                   alt={product.name}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               </div>
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
//                 <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
//                 <Button variant="secondary" size="sm" className="w-full">
//                   Buy Now
//                 </Button>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <div className="col-span-full text-center text-muted-foreground">No products available.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShopDetails;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '@/contexts/ShopContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react'; // for star ratings

const ShopDetails = () => {
  const { shopId } = useParams();
  const { shops } = useShop();

  const shop = shops.find(s => s.id.toString() === shopId);

  if (!shop) {
    return <div className="text-center mt-20 text-2xl">Shop not found 😢</div>;
  }

  // Generate a fake rating
  const getFakeRating = () => (Math.random() * 1.5 + 3.5).toFixed(1);

  // Generate a fake price (in INR ₹)
  const getFakePrice = () => Math.floor(Math.random() * (2000 - 300 + 1)) + 300;

  return (
    <div className="container mx-auto p-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8 font-serif">{shop.name}</h1>
      <p className="text-center text-muted-foreground mb-10">{shop.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {shop.products && shop.products.length > 0 ? (
          shop.products.map(product => {
            const rating = getFakeRating();
            const price = getFakePrice();
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
                  {/* Product Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>

                    {/* Price */}
                    <p className="text-green-600 font-bold mb-3 text-md">₹{price}</p>

                    {/* Rating */}
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

                  {/* Buttons */}
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full text-xs py-2 hover:bg-primary hover:text-white transition-all"
                    >
                      Buy Now
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="w-full text-xs py-2 hover:bg-green-600 transition-all"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center text-muted-foreground">No products available.</div>
        )}
      </div>

      {/* Proceed to Payment Button */}
      <div className="flex justify-center mt-10">
        <Button 
          variant="default"
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-full shadow-lg transition-all"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default ShopDetails;
