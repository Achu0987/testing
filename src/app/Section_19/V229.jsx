// V56.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

const flavors = [
  {
    name: "Grape Splash",
    color: "#a78bfa",
    price: 15,
    can: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb498a6311da1c57e42e6f_66af90543366d46c5670929b_Untitled%2520design%2520(16).png",
  },
  {
    name: "Pineapple",
    color: "#294b13ff",
    price: 15,
    can: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66af95e98a76943ae0f40afa_5.png",
  },
  {
    name: "Watermelon",
    color: "#ef4444",
    price: 15,
    can: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb49972c0549b6b1a3851b_66af95a0bf98e4cbfe3bf913_2.png",
  },
  {
    name: "Raspberry",
    color: "#f871db",
    price: 15,
    can: "https://cdn.prod.website-files.com/66ae838a004ef09aef08a56d/66bb49a150b3ed64af11a9be_66af95a9503a85bd0d10928f_6.png",
  },
];

export default function V229() {
  const [selectedFlavor, setSelectedFlavor] = useState("Grape Splash");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const currentFlavor = flavors.find((f) => f.name === selectedFlavor);

  // Add item to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    setCartOpen(true);
    setCart((prev) => {
      const existing = prev.find((item) => item.name === currentFlavor.name);
      if (existing) {
        return prev.map((item) =>
          item.name === currentFlavor.name
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...currentFlavor, quantity: qty }];
    });
    setQty(1);
  };

  // Update quantity
  const updateQuantity = (name, qty) => {
    const q = Number.isNaN(Number(qty)) ? 1 : qty;
    setCart((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: Math.max(1, q) } : item
      )
    );
  };

  // Remove item
  const removeItem = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  // Subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative">
      {/* Main Section */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{ backgroundColor: currentFlavor.color }}
      >
        {/* Global Close Button */}
        

        {/* Big background text */}
        <h1 className="absolute inset-0 flex items-center justify-center text-[18vw] md:text-[10vw] font-extrabold text-white tracking-tight select-none z-0">
          {currentFlavor.name.toUpperCase()}
        </h1>

        {/* Can image */}
        <div className="relative z-10">
          <img
            src={currentFlavor.can}
            alt={currentFlavor.name}
            className="w-40 md:w-52 lg:w-64 drop-shadow-2xl rotate-6 object-contain"
          />
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between z-20">
          {/* Flavors */}
          <div>
            <h3 className="text-2xl text-left font-bold mb-3">Flavors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {flavors.map((flavor) => (
                <button
                  key={flavor.name}
                  onClick={() => setSelectedFlavor(flavor.name)}
                  className={`flex flex-col items-center gap-2 p-2 rounded-lg transition ${
                    selectedFlavor === flavor.name
                      ? "ring-4 ring-white scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: flavor.color }}
                  >
                    <img
                      src={flavor.can}
                      alt={flavor.name}
                      className="w-6 h-12 object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium">{flavor.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price + Add to Cart */}
          <form
            onSubmit={handleAddToCart}
            className="flex items-center gap-4 bg-white text-black px-6 py-4 rounded-lg"
          >
            <div className="text-xl font-bold">
              ${currentFlavor.price.toFixed(2)} USD
            </div>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, Number(e.target.value || 1)))
              }
              className="w-14 px-2 py-1 rounded-md border border-gray-300 text-center"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-black text-white font-semibold shadow hover:opacity-90"
            >
              Add to Cart
            </button>
          </form>
        </div>
      </section>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed top-12 right-0 w-96 h-170 bg-white shadow-2xl z-50 flex flex-col">

          
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-black text-white">
            <h2 className="text-2xl font-bold">My Cart</h2>
            <button onClick={() => setCartOpen(false)}>
              <X size={28} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <img
                      src={item.can}
                      alt={item.name}
                      className="w-6 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold uppercase">{item.name}</h3>
                    <p className="text-sm">${item.price}.00 USD</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          updateQuantity(item.name, parseInt(e.target.value, 10))
                        }
                        className="w-14 h-10 border rounded text-center"
                      />
                      <button
                        onClick={() => removeItem(item.name)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Subtotal</span>
              <span>${subtotal}.00 USD</span>
            </div>
            <button className="w-full bg-green-200 py-3 text-lg font-bold rounded hover:bg-green-300 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
