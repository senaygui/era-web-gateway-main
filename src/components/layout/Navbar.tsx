import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const navLinks = [
    { 
      title: t('nav.home'), 
      href: '/'
    },
    { 
      title: t('nav.about'), 
      href: '/about',
      subLinks: [
        { title: t('nav.mission'), href: '/about#mission' },
        { title: t('nav.history'), href: '/about#history' },
        { title: t('nav.structure'), href: '/about#structure' },
      ]
    }, 
    { 
      title: 'Projects', 
      href: '/projects'
    },
    { 
      title: t('nav.news'), 
      href: '/news'
    },
    { 
      title: t('nav.bids'), 
      href: '/bids'
    },
    { 
      title: t('nav.events'), 
      href: '/events'
    },
    { 
      title: t('nav.publications'), 
      href: '/publications',
      subLinks: [
        { title: t('publications'), href: '/publications' },
        { title: t('Road asset'), href: '/roadasset' },
        { title: t('Performance'), href: 'performance' },
      ]
    },
    { 
      title: t('nav.vacancies'), 
      href: '/vacancies'
    },
    { 
      title: t('districts'), 
      href: '/districts'
    },
    { 
      title: t('nav.contact'), 
      href: '/contact'
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-custom">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b py-2 text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:+251115516888" className="text-era-gray hover:text-era-orange transition-colors">
              +251 11 551 6888
            </a>
            <a href="mailto:info@era.gov.et" className="text-era-gray hover:text-era-orange transition-colors">
              info@era.gov.et
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              className={cn(
                "text-era-gray hover:text-era-orange transition-colors",
                language === 'en' && "text-era-orange font-medium"
              )}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            <span className="text-era-gray">|</span>
            <button 
              className={cn(
                "text-era-gray hover:text-era-orange transition-colors",
                language === 'am' && "text-era-orange font-medium"
              )}
              onClick={() => setLanguage('am')}
            >
              አማርኛ
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/d3852216-e12c-456b-8615-358f928bcfca.png" 
                alt="Ethiopian Roads Administration Logo" 
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-era-dark">{t('home.hero.title')}</h1>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <React.Fragment key={link.title}>
                {link.subLinks ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className={cn(
                          "flex items-center space-x-1 text-sm px-2 py-1",
                          location.pathname.startsWith(link.href) && "text-era-orange font-medium"
                        )}
                      >
                        <span>{link.title}</span>
                        <ChevronDown size={12} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      {link.subLinks.map((subLink) => (
                        <DropdownMenuItem key={subLink.title} asChild>
                          <Link 
                            to={subLink.href} 
                            className={cn(
                              "w-full cursor-pointer text-sm",
                              location.pathname === subLink.href && "text-era-orange font-medium"
                            )}
                          >
                            {subLink.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to={link.href}>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "text-sm px-2 py-1",
                        location.pathname === link.href && "text-era-orange font-medium"
                      )}
                    >
                      {link.title}
                    </Button>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Search and Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch} 
              aria-label="Search"
            >
              <Search size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              className="lg:hidden" 
              aria-label="Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Search Box */}
        <div className={cn(
          "max-h-0 overflow-hidden transition-all duration-300",
          searchOpen && "max-h-24 py-3"
        )}>
          <div className="relative">
            <input
              type="text"
              placeholder={t('nav.search')}
              className="w-full py-2 px-4 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-era-orange"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search size={18} className="text-era-gray" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 max-h-0",
          isOpen && "max-h-[500px]"
        )}>
          <div className="py-4 space-y-3 border-t">
            {navLinks.map((link) => (
              <div key={link.title} className="flex flex-col">
                <Link 
                  to={link.href}
                  className={cn(
                    "py-2 px-4 hover:bg-muted rounded-md font-medium",
                    location.pathname === link.href && "text-era-orange font-medium"
                  )}
                  onClick={() => !link.subLinks && setIsOpen(false)}
                >
                  {link.title}
                </Link>
                {link.subLinks && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-4">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.title}
                        to={subLink.href}
                        className={cn(
                          "block py-1.5 text-era-gray hover:text-era-orange",
                          location.pathname === subLink.href && "text-era-orange font-medium"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {subLink.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
