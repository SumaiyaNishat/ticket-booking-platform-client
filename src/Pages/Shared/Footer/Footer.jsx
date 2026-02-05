import { Link } from "react-router";
import { FaFacebook, FaStripe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="px-4 py-15">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
         
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              TicketBari
            </h3>
            <p className="text-sm leading-relaxed">
              Book bus, train, launch & flight tickets easily with a smooth and secure booking experience.
            </p>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/all-tickets" className="hover:text-white">All Tickets</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@ticketbari.com</li>
              <li>Phone: +880 1234-567890</li>
              <li className="flex items-center gap-2">
                <FaFacebook />
                <span>Facebook Page</span>
              </li>
            </ul>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Payment Methods
            </h4>
            <div className="flex items-center gap-3">
              <FaStripe className="text-4xl text-white" />
              <span className="text-sm">Stripe Secure Payment</span>
            </div>
          </div>

        </div>
      </div>

      
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
