import './header.scss';
import '../../styles/index.scss';
import logo from '../Header/logo.png';

const Header = () => {
  return (
    <div className='container'>
      <header>
        <img src={logo} alt="logo" className='logo' />
        <div className='flex row_header'>
          <h1>Моя Погода</h1>
        </div>
      </header>
    </div>
  );
}

export default Header;