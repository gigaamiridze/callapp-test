import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 40px;
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
`;

export default Title;