import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBar = () => {
  const location = useLocation();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navigationItems = [
    // {
    //   label: 'Home',
    //   path: '/home',
    //   icon: 'Home',
    //   tooltip: 'Your personalized travel hub'
    // },
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Your personalized travel hub'
    },
    {
      label: 'Explore',
      path: '/destination-details',
      icon: 'MapPin',
      tooltip: 'Discover destinations and plan trips',
      subItems: [
        { label: 'Destinations', path: '/destination-details' },
        { label: 'Itinerary Planner', path: '/itinerary-planner' }
      ]
    },
    {
      label: 'Maps',
      path: '/maps',
      icon: 'Map',
      tooltip: 'Best location based suggestions'
    },
    {
      label: 'Groups',
      path: '/travel-groups',
      icon: 'Users',
      tooltip: 'Coordinate group travel plans'
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User',
      tooltip: 'Manage your account and preferences'
    }
  ];

  const isActiveRoute = (path, subItems = []) => {
    if (location?.pathname === path) return true;
    if (subItems?.length > 0) {
      return subItems?.some(item => location?.pathname === item?.path);
    }
    return false;
  };

  const handleLogoClick = () => {
    if (location?.pathname !== '/') {
      window.location.href = '/';
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-navigation bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-travel"
              aria-label="TravelMate - Go to Dashboard"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Compass" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                TravelMate AI
              </span>
            </button>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <Link
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-travel ${
                    isActiveRoute(item?.path, item?.subItems)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </Link>

                {/* Dropdown for Explore */}
                {item?.subItems && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-travel-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-travel z-dropdown">
                    <div className="py-1">
                      {item?.subItems?.map((subItem) => (
                        <Link
                          key={subItem?.path}
                          to={subItem?.path}
                          className={`block px-4 py-2 text-sm transition-travel ${
                            location?.pathname === subItem?.path
                              ? 'bg-primary text-primary-foreground'
                              : 'text-popover-foreground hover:bg-muted'
                          }`}
                        >
                          {subItem?.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

         
          <div className="flex items-center space-x-3">
            

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-2 space-y-1">
              {navigationItems?.map((item) => (
                <div key={item?.path}>
                  <Link
                    to={item?.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-travel ${
                      isActiveRoute(item?.path, item?.subItems)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </Link>
                  
                  {/* Mobile Sub-items */}
                  {item?.subItems && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item?.subItems?.map((subItem) => (
                        <Link
                          key={subItem?.path}
                          to={subItem?.path}
                          className={`block px-3 py-1 text-sm rounded-md transition-travel${
                            location?.pathname === subItem?.path
                              ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem?.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Mobile Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-navigation bg-card border-t border-border md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center justify-center space-y-1 px-2 py-1 rounded-md transition-travel {
                isActiveRoute(item?.path, item?.subItems)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;