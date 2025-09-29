// V228.jsx
import React, { useState } from "react";
import { X, ShoppingCart } from "lucide-react";

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

export default function V228() {
  const [selectedFlavor, setSelectedFlavor] = useState("Grape Splash");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const currentFlavor = flavors.find((f) => f.name === selectedFlavor) ?? flavors[0];

  // Add item to cart
  const handleAddToCart = (e) => {
    e?.preventDefault?.();
    setCartOpen(true);
    const addQty = Math.max(1, Number(qty) || 1);

    setCart((prev) => {
      const existing = prev.find((item) => item.name === currentFlavor.name);
      if (existing) {
        return prev.map((item) =>
          item.name === currentFlavor.name
            ? { ...item, quantity: item.quantity + addQty }
            : item
        );
      }
      return [...prev, { ...currentFlavor, quantity: addQty }];
    });

    setQty(1);
  };

  // Update quantity for cart items
  const updateQuantity = (name, newQty) => {
    const q = Math.max(1, Number(newQty) || 1);
    setCart((prev) => prev.map((it) => (it.name === name ? { ...it, quantity: q } : it)));
  };

  // Remove item
  const removeItem = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  // Subtotal (number)
  const subtotalNum = cart.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0);

  // Shared class for flavor button base
  const flavorButtonBase =
    "flex flex-col items-center gap-2 p-2 transition flex-shrink-0 min-w-[84px] w-20";

  return (
    <div className="relative min-h-screen">
      {/* Top bar with cart button */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3">
        <div className="text-white font-bold text-lg select-none">Soda Shop</div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className="relative bg-white/10 hover:bg-white/20 text-white rounded-md px-3 py-2 flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cart.reduce((s, i) => s + (i.quantity || 0), 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Background big text (desktop only) */}
      <h1
        aria-hidden
        className="hidden md:flex absolute inset-0 items-center justify-center text-[10vw] lg:text-[8vw] font-extrabold text-white tracking-tight select-none z-0 opacity-8"
        style={{ color: "rgba(255,255,255,0.08)" }}
      >
        {currentFlavor.name.toUpperCase()}
      </h1>

      {/* Main section */}
      <section
        className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center text-white px-4 py-20 gap-8"
        style={{ backgroundColor: currentFlavor.color }}
      >
        {/* Can image */}
        <div className="z-10 flex-shrink-0 flex items-center justify-center">
          <img
            src={currentFlavor.can}
            alt={currentFlavor.name}
            className="w-44 sm:w-52 md:w-64 lg:w-72 drop-shadow-2xl rotate-6 object-contain"
          />
        </div>

        {/* Right column / bottom stack: flavors + form */}
        <div className="z-10 w-full md:w-1/2 max-w-2xl">
          {/* Flavor name & price (mobile visible) */}
          <div className="md:hidden mb-4">
            <h2 className="text-2xl font-extrabold">{currentFlavor.name}</h2>
            <p className="text-sm opacity-80">${currentFlavor.price.toFixed(2)} USD</p>
          </div>

          {/* Flavors selector: horizontal on mobile, grid on md+ */}
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-3 text-white">Flavors</h3>

            <div className="block md:hidden">
              {/* Mobile: horizontal scroll */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {flavors.map((flavor) => {
                  const selected = selectedFlavor === flavor.name;
                  return (
                    <button
                      key={flavor.name}
                      onClick={() => setSelectedFlavor(flavor.name)}
                      aria-pressed={selected}
                      className={`${flavorButtonBase} ${
                        selected
                          ? "border-4 border-white rounded-xl scale-105 bg-white/10"
                          : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: flavor.color }}
                      >
                        <img src={flavor.can} alt={flavor.name} className="w-6 h-12 object-contain" />
                      </div>
                      <span className="text-xs font-medium text-white text-center">{flavor.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {flavors.map((flavor) => {
                const selected = selectedFlavor === flavor.name;
                return (
                  <button
                    key={flavor.name}
                    onClick={() => setSelectedFlavor(flavor.name)}
                    aria-pressed={selected}
                    className={`${flavorButtonBase} ${
                      selected
                        ? "border-4 border-white rounded-xl scale-105 bg-white/5"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: flavor.color }}
                    >
                      <img src={flavor.can} alt={flavor.name} className="w-6 h-12 object-contain" />
                    </div>
                    <span className="text-xs font-medium text-white">{flavor.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price + Add to Cart form */}
          <form
            onSubmit={handleAddToCart}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white/90 text-black px-4 py-3 rounded-lg"
          >
            <div className="text-xl font-bold">${currentFlavor.price.toFixed(2)} USD</div>

            <div className="flex items-center gap-2">
              <label htmlFor="qty" className="sr-only">
                Quantity
              </label>
              <input
                id="qty"
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                className="w-20 px-2 py-1 rounded-md border border-gray-300 text-center"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 rounded-md bg-black text-white font-semibold shadow hover:opacity-90"
            >
              Add to Cart
            </button>
          </form>
        </div>
      </section>

      {/* Cart Drawer / Bottom sheet */}
      {cartOpen && (
        <aside
          className="
            fixed z-50 bg-white shadow-2xl flex flex-col
            left-0 right-0 bottom-0 h-3/4 rounded-t-xl
            md:rounded-none md:top-16 md:right-0 md:left-auto md:bottom-auto md:w-96 md:h-[calc(100vh-4rem)]
          "
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-black text-white rounded-t-xl md:rounded-none">
            <h2 className="text-2xl font-bold">My Cart</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setCartOpen(false);
                }}
                aria-label="Close cart"
                className="p-1 rounded hover:bg-white/10"
              >
                <X size={20} color="white" />
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">Your cart is empty.</div>
            ) : (
              cart.map((item) => (
                <div key={item.name} className="flex items-start space-x-4 border-b pb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                    style={{ backgroundColor: item.color }}
                  >
                    <img src={item.can} alt={item.name} className="w-6 h-12 object-contain" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold uppercase">{item.name}</h3>
                      <div className="text-sm font-semibold">${(item.price || 0).toFixed(2)}</div>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <label htmlFor={`q-${item.name}`} className="sr-only">Quantity</label>
                      <input
                        id={`q-${item.name}`}
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.name, e.target.value)}
                        className="w-20 h-10 border rounded text-center"
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
          <div className="p-4 border-t">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Subtotal</span>
              <span>${subtotalNum.toFixed(2)} USD</span>
            </div>
            <button
              className="w-full bg-green-600 text-white py-3 text-lg font-bold rounded hover:bg-green-700 transition"
              onClick={() => {
                // placeholder checkout action
                alert(`Checkout - $${subtotalNum.toFixed(2)}`);
              }}
            >
              Checkout
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}