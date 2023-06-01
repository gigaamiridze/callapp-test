import styled, { css } from 'styled-components';

const ContentTitle = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-family: ${theme.fonts.roboto};
  `}
  font-size: 15px;
`;

export default ContentTitle;