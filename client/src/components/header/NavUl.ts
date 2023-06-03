import styled from 'styled-components';

const NavUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;
  
  a {
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    padding: 7px;
  }
`;

export default NavUl;