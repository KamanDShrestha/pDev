import { NavLink } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { cn } from '../lib/utils';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const NavBar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to={'/home'} className={navigationMenuTriggerStyle()}>
            Home
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to={'/dashboard'} className={navigationMenuTriggerStyle()}>
            Dashboard
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink to={'/wellbeing'} className={navigationMenuTriggerStyle()}>
            Wellbeing
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to={'/journey'} className={navigationMenuTriggerStyle()}>
            Journeys
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to={'/community'} className={navigationMenuTriggerStyle()}>
            Community
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger className='border-none'>
              <p
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-transparent hover:bg-inherit'
                )}
              >
                Actions
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <NavLink
                  to={'/profile'}
                  className={navigationMenuTriggerStyle()}
                >
                  Profile
                </NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavBar;
