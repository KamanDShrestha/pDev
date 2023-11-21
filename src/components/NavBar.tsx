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
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import { GiHamburgerMenu } from 'react-icons/gi';
import Logo from './Logo';
import { useAuthContext } from '../context/AuthProvider';
import { Button } from './ui/button';
import useLogoutUser from '../services/userAuth/logoutUser';
const NavBar = () => {
  const { user } = useAuthContext();
  const { mutate } = useLogoutUser();

  function handleLogout() {
    mutate(user?.accessToken as string);
  }
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className='block md:hidden'>
            <GiHamburgerMenu />
          </div>
        </SheetTrigger>
        <SheetContent className='flex flex-col' side={'left'}>
          <SheetHeader>
            <div className='m-auto'>
              <Logo />
            </div>
          </SheetHeader>
          <div className='flex flex-col'>
            <NavLink
              to={'/home'}
              className={cn(navigationMenuTriggerStyle(), 'text-base')}
            >
              Home
            </NavLink>
            <NavLink
              to={'/dashboard'}
              className={cn(navigationMenuTriggerStyle(), 'text-base')}
            >
              Dashboard
            </NavLink>
            <NavLink
              to={'/wellbeing'}
              className={cn(navigationMenuTriggerStyle(), 'text-base')}
            >
              Wellbeing
            </NavLink>
            <NavLink
              to={'/journeys'}
              className={cn(navigationMenuTriggerStyle(), 'text-base')}
            >
              Journeys
            </NavLink>
            <NavLink
              to={'/community'}
              className={cn(navigationMenuTriggerStyle(), 'text-base')}
            >
              Community
            </NavLink>
            <NavLink
              to={'/profile'}
              className={cn(navigationMenuTriggerStyle(), 'text-base')}
            >
              Profile
            </NavLink>
          </div>
        </SheetContent>
      </Sheet>

      <NavigationMenu className='hidden md:block'>
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
            <NavLink to={'/journeys'} className={navigationMenuTriggerStyle()}>
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

                {user?.role === 'qha' && (
                  <DropdownMenuItem>
                    <NavLink
                      to={'/verifyJourneys'}
                      className={navigationMenuTriggerStyle()}
                    >
                      Review Journey
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Button
                    className={cn(navigationMenuTriggerStyle(), 'text-black')}
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default NavBar;
