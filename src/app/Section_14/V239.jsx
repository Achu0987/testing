export default function V239() {
  return (
    <footer className="bg-[#1E1E1E] text-white px-6 py-12">


        
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left Side */}
          <div className="md:w-1/2 space-y-6">
            <p className="text-sm text-gray-50 mr-10 ">
              Whether you're looking for chic essentials, statement outfits, or
              casual staples, we’ve got something to suit every style. Browse
              our fresh arrivals and update your wardrobe with the season's
              hottest looks today!
            </p>

            {/* Newsletter */}
            <form className="flex items-center bg-transparent border border-gray-600 rounded-full overflow-hidden max-w-md">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
                required
              />
              <button
                type="submit"
                className="bg-white text-black font-medium px-6 py-3 rounded-full shadow-md hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right Side */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 text-sm">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:underline">HOME</a></li>
                <li><a href="/search" className="hover:underline">SEARCH</a></li>
                <li><a href="/collections" className="hover:underline">COLLECTIONS</a></li>
                <li><a href="/pages/about-us" className="hover:underline">ABOUT US</a></li>
                <li><a href="/blogs/news" className="hover:underline">NEWS</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="/policies/privacy-policy" className="hover:underline">PRIVACY POLICY</a></li>
                <li><a href="/policies/refund-policy" className="hover:underline">REFUND POLICY</a></li>
                <li><a href="/policies/shipping-policy" className="hover:underline">SHIPPING POLICY</a></li>
                <li><a href="/pages/contact" className="hover:underline">CONTACT</a></li>
                <li><a href="/pages/faq" className="hover:underline">FAQ</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4">Follow us on</h4>
              <ul className="space-y-2">
                <li><a href="https://facebook.com" className="hover:underline">Facebook</a></li>
                <li><a href="https://twitter.com" className="hover:underline">X (Twitter)</a></li>
                <li><a href="https://instagram.com" className="hover:underline">Instagram</a></li>
                <li><a href="https://youtube.com" className="hover:underline">YouTube</a></li>
                <li><a href="https://pinterest.com" className="hover:underline">Pinterest</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          {/* Localization */}
          <div className="flex items-center space-x-2">
            <img src="https://cdn.shopify.com/static/images/flags/in.svg?width=14" alt="India" className="w-5 h-4" />
            <span>₹ INR / EN</span>
          </div>

          {/* Copyright */}
          <p>© 2025 Maya-theme-empower. Powered by Shopify</p>

          {/* Payment Icons */}
          <div className="flex gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
