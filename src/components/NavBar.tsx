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

  const userNavigationMenu = [
    { to: '/home', option: 'Home' },
    { to: '/dashboard', option: 'Dashboard' },
    { to: '/wellbeing', option: 'Wellbeing' },
    { to: '/journeys', option: 'Journeys' },
    { to: '/community', option: 'Community' },
  ];
  const userActionOptions = [
    { to: '/profile', option: 'Profile' },
    { to: '/apply', option: 'Apply for QHP' },
  ];

  const adminNavigationMenu = [
    { to: '/home', option: 'Home' },
    { to: '/users', option: 'Users' },
    { to: '/journeys', option: 'Journeys' },
    { to: '/admin/dashboard', option: 'Dashboard' },
    { to: '/community', option: 'Community' },
    { to: '/wellbeingForAdmin', option: 'Wellbeing' },
  ];
  const adminActionOptions = [
    { to: '/profile', option: 'Profile' },
    { to: '/addJourney', option: 'Add Journey' },
    { to: '/feedbacks', option: 'Feedbacks' },
    { to: '/reviewApplications', option: 'Review Applications' },
  ];

  const qhpNavigationMenu = [
    { to: '/home', option: 'Home' },
    { to: '/journeys', option: 'Journeys' },
    { to: '/qas', option: 'QAs' },
    { to: '/community', option: 'Community' },
  ];

  const qhpActionOptions = [
    { to: '/profile', option: 'Profile' },
    { to: '/verifyJourneys', option: 'Verify Journeys' },
  ];

  function handleLogout() {
    mutate(user?.accessToken as string);
  }
  return (
    <>
      <Sheet>
        <SheetTrigger className='block md:hidden'>
          <GiHamburgerMenu />
        </SheetTrigger>
        <SheetContent className='flex flex-col' side={'left'}>
          <SheetHeader>
            <span className='m-auto'>
              <Logo />
            </span>
          </SheetHeader>
          <div className='flex flex-col'>
            {user?.role === 'user' &&
              userNavigationMenu.map((menu) => (
                <NavLink
                  to={menu.to}
                  className={cn(navigationMenuTriggerStyle(), 'text-base')}
                  key={menu.to}
                >
                  {menu.option}
                </NavLink>
              ))}

            {user?.role === 'user' &&
              userActionOptions.map((menu) => (
                <NavLink
                  to={menu.to}
                  className={cn(navigationMenuTriggerStyle(), 'text-base')}
                  key={menu.to}
                >
                  {menu.option}
                </NavLink>
              ))}

            {user?.role === 'admin' &&
              adminNavigationMenu.map((menu) => (
                <NavLink
                  to={menu.to}
                  className={cn(navigationMenuTriggerStyle(), 'text-base')}
                  key={menu.to}
                >
                  {menu.option}
                </NavLink>
              ))}

            {user?.role === 'admin' &&
              adminActionOptions.map((menu) => (
                <NavLink
                  to={menu.to}
                  className={cn(navigationMenuTriggerStyle(), 'text-base')}
                  key={menu.to}
                >
                  {menu.option}
                </NavLink>
              ))}

            {user?.role === 'qha' &&
              qhpNavigationMenu.map((menu) => (
                <NavLink
                  to={menu.to}
                  className={cn(navigationMenuTriggerStyle(), 'text-base')}
                  key={menu.to}
                >
                  {menu.option}
                </NavLink>
              ))}

            {user?.role === 'qha' &&
              qhpActionOptions.map((menu) => (
                <NavLink
                  to={menu.to}
                  className={cn(navigationMenuTriggerStyle(), 'text-base')}
                  key={menu.to}
                >
                  {menu.option}
                </NavLink>
              ))}
          </div>
        </SheetContent>
      </Sheet>

      <NavigationMenu className='hidden md:block'>
        <NavigationMenuList>
          {user?.role === 'user' &&
            userNavigationMenu.map((menu) => (
              <NavigationMenuItem key={menu.to}>
                <NavLink to={menu.to} className={navigationMenuTriggerStyle()}>
                  {menu.option}
                </NavLink>
              </NavigationMenuItem>
            ))}

          {user?.role === 'admin' &&
            adminNavigationMenu.map((menu) => (
              <NavigationMenuItem key={menu.to}>
                <NavLink to={menu.to} className={navigationMenuTriggerStyle()}>
                  {menu.option}
                </NavLink>
              </NavigationMenuItem>
            ))}

          {user?.role === 'qha' &&
            qhpNavigationMenu.map((menu) => (
              <NavigationMenuItem key={menu.to}>
                <NavLink to={menu.to} className={navigationMenuTriggerStyle()}>
                  {menu.option}
                </NavLink>
              </NavigationMenuItem>
            ))}

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
                {user?.role === 'user' &&
                  userActionOptions.map((option) => (
                    <DropdownMenuItem key={option.to}>
                      <NavLink
                        to={option.to}
                        className={navigationMenuTriggerStyle()}
                      >
                        {option.option}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}

                {user?.role === 'admin' &&
                  adminActionOptions.map((option) => (
                    <DropdownMenuItem key={option.to}>
                      <NavLink
                        to={option.to}
                        className={navigationMenuTriggerStyle()}
                      >
                        {option.option}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}

                {user?.role === 'qha' &&
                  qhpActionOptions.map((option) => (
                    <DropdownMenuItem key={option.to}>
                      <NavLink
                        to={option.to}
                        className={navigationMenuTriggerStyle()}
                      >
                        {option.option}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}

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
