export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;

  children?: NavigationItem[];
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'SPRINT TRACK',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'tickets',
        title: 'Tickets',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'ticketlist',
            title: 'Tickets List',
            type: 'item',
            url: '/tickets/ticketlist'
          },
          {
            id: 'createticket',
            title: 'Create Ticket',
            type: 'item',
            url: '/tickets/createticket'
          }
        ]
      },
      {
        id: 'sprint',
        title: 'Sprint',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'sprintlist',
            title: 'Sprint List',
            type: 'item',
            url: '/sprint/sprintlist'
          },
          {
            id: 'createsprint',
            title: 'Create Sprint',
            type: 'item',
            url: '/sprint/createsprint'
          }
        ]
      },
      {
        id: 'backlog',
        title: 'Backlog',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'backloglist',
            title: 'Backlog List',
            type: 'item',
            url: '/backlog/backloglist'
          },
          {
            id: 'createbacklog',
            title: 'Create Backlog',
            type: 'item',
            url: '/backlog/createbacklog'
          }
        ]
      },
      {
        id: 'user',
        title: 'User',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'userlist',
            title: 'User List',
            type: 'item',
            url: '/usermanagement/userslist'
          },
          {
            id: 'createuser',
            title: 'Create User',
            type: 'item',
            url: '/usermanagement/createusers'
          }
        ]
      },
      {
        id: 'settings',
        title: 'Settings',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/settings/profiles'
          },
          {
            id: 'profileslist',
            title: 'Profile List',
            type: 'item',
            url: '/settings/profileslist'
          },
        ]
      },
    ]
  },
];
