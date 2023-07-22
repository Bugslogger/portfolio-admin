// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: 'app',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
    , {
      id: 'portfolio',
      title: 'Portfolio',
      type: 'item',
      url: 'portfolio',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }, {
      id: 'About',
      title: 'About',
      type: 'item',
      url: 'about',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }, {
      id: 'contact',
      title: 'Contact',
      type: 'item',
      url: 'contact',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
