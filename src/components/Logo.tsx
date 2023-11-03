import logo from '../assets/selfsync-logo.png';
import darkLogo from '../assets/selfsync-logo-dark.png';
import { useTheme } from './ThemeProvider';
const Logo = () => {
  const { theme } = useTheme();

  return <img src={theme === 'dark' ? darkLogo : logo} className='h-12' />;
};

export default Logo;
