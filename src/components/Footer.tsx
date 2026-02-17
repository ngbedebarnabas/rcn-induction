import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Registration', path: '/registration' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={18} />, href: 'https://www.facebook.com/share/15K12cKXuD/?mibextid=wwXIfr' },
    { name: 'Twitter', icon: <Twitter size={18} />, href: 'https://x.com/_rcnglobal' },
    { name: 'Instagram', icon: <Instagram size={18} />, href: 'https://www.instagram.com/rcnglobal/' },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo Section */}
          <div className="space-y-4">
            <a href="https://rcnglobal.org" target="_blank" rel="noopener noreferrer">
              <img
                src="/lovable-uploads/eefc60a4-5789-4060-9bd7-014ba8dc40f2.png"
                alt="RCN Logo"
                className="h-14 w-auto brightness-200"
              />
            </a>
            <p className="text-sm opacity-60 max-w-xs">
              Empowering the next generation of Christian Leaders for Kingdom Service.
            </p>
          </div>
          
          {/* Sitemap */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-60">Sitemap</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Media & Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-60">Connect With Us</h3>
            <div className="flex gap-3 mb-5">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center opacity-75 hover:opacity-100 hover:bg-primary-foreground/20 transition-all"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="text-sm space-y-1.5 opacity-70">
              <p>info@ordinand.org</p>
              <p>+234 807 309 5885 (WhatsApp Only)</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-sm opacity-50">
          <p>&copy; {currentYear} RCN Induction Training Programme. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
