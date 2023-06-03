import { Link } from 'react-router-dom';
import { HeaderContainer, NavUl } from '../components';

function Header() {
  return (
    <HeaderContainer>
      <nav>
        <NavUl>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/table'>Table</Link>
          </li>
          <li>
            <Link to='/chart'>Chart</Link>
          </li>
        </NavUl>
      </nav>
    </HeaderContainer>
  )
}

export default Header;