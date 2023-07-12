import './header.scss';
import '../../styles/index.scss';
import logo from '../Header/logo.png';
import 'animate.css';

const Header = () => {
  return (
    <div className='container'>
      <header className='animate__animated animate__zoomInLeft animate__slow 3s'>
        <a href='.'><img src={logo} alt="logo" className='logo' /></a>
        <div className='flex row_header'>
          <a href='.'><h1>Моя Погода</h1></a>
        </div>
      </header>
    </div>
  );
}

export default Header;