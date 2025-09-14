import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Route configuration for breadcrumb generation
  const routeConfig = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/destination-details': { label: 'Destinations', icon: 'MapPin', parent: '/dashboard' },
    '/itinerary-planner': { label: 'Itinerary Planner', icon: 'Calendar', parent: '/dashboard' },
    '/travel-groups': { label: 'Travel Groups', icon: 'Users', parent: '/dashboard' },
    '/ai-travel-buddy': { label: 'AI Travel Buddy', icon: 'Bot', parent: '/dashboard' },
    '/user-profile': { label: 'Profile', icon: 'User', parent: '/dashboard' }
  };

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const currentPath = location?.pathname;
    const breadcrumbs = [];

    // Always start with dashboard if not already there
    if (currentPath !== '/dashboard') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'LayoutDashboard'
      });
    }

    // Add current page
    const currentRoute = routeConfig?.[currentPath];
    if (currentRoute) {
      breadcrumbs?.push({
        label: currentRoute?.label,
        path: currentPath,
        icon: currentRoute?.icon,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on dashboard or if only one item
  if (location?.pathname === '/dashboard' || breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path || index} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-border" />
            )}
            
            {crumb?.isActive ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                <Icon name={crumb?.icon} size={14} />
                <span>{crumb?.label}</span>
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="flex items-center space-x-1 hover:text-foreground transition-travel"
              >
                <Icon name={crumb?.icon} size={14} />
                <span>{crumb?.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;