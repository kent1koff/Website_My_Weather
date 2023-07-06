import './header.scss';
import '../../styles/index.scss';
import logo from '../Header/logo.png';
import Time from './currentTime';

const Header = () => {
  return (
    <div className='container'>
      <header>
        <img src={logo} alt="logo" className='logo' />
        <div className='flex row_header'>
          <h1>Моя Погода</h1>
          <div className='row_select_day flex'>
            <a href='#' className='select_day'>Сьогодні</a>
            <a href='#' className='select_day'>Завтра</a>
            <a href='#' className='select_day'>Післязавтра</a>
          </div>
        </div>
        <Time />
      </header>
    </div>
  );
}

export default Header;