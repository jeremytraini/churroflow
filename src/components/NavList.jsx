import SubjectIcon from '@mui/icons-material/Subject';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const getPrimaryNavList = () => {
  return [
    {
      title: 'Dashboard',
      route: '/dashboard',
      Icon: SubjectIcon,
      description: 'ADD DESCRIPTION HERE',
    },
    {
      title: 'Warehouse Planning',
      route: '/warehouse-planning',
      Icon: WarehouseIcon,
      description: 'ADD DESCRIPTION HERE',
    },
    {
      title: 'Warehouse Analytics',
      route: '/warehouse-analytics',
      Icon: AnalyticsIcon,
      description: 'ADD DESCRIPTION HERE',
    },
    {
      title: 'Inventory Actions',
      route: '/inventory-actions',
      Icon: InventoryIcon,
      description: 'ADD DESCRIPTION HERE',
    },
    {
      title: 'Invoice Data Manager',
      route: '/inventory-actions',
      Icon: ReceiptIcon,
      description: 'ADD DESCRIPTION HERE',
    },

  ];
};
