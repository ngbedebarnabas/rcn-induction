
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Registration', path: '/registration' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={20} />, href: '#' },
    { name: 'Twitter', icon: <Twitter size={20} />, href: '#' },
    { name: 'Instagram', icon: <Instagram size={20} />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: '#' },
    { name: 'YouTube', icon: <Youtube size={20} />, href: '#' },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/171174e4-3074-43b5-b5fb-de9c6583d867.png"
                alt="RCN Logo"
                className="h-10 w-auto"
              />
              <span className="font-semibold text-lg">RCN Induction Programme</span>
            </div>
            <p className="text-gray-300 text-sm">
              Providing comprehensive induction training for all new RCN members.
            </p>
          </div>
          
          {/* Sitemap */}
          <div className="text-left">
            <h3 className="font-semibold text-lg mb-4">Sitemap</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Media & Contact */}
          <div className="text-left">
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-300">
              <p>Email: info@ordinand.org</p>
              <p>Phone: +234 807 309 5885 (WhatsApp Only)</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-left text-gray-400 text-sm">
          <p>&copy; {currentYear} RCN Induction Training Programme. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
