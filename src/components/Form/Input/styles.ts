import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface IProps {
  active?: boolean;
}

export const Container = styled.TextInput<IProps>`
  width: 100%;
  padding: 16px 18px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text.dark};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  margin-bottom: 8px;

  ${({ active, theme }) =>
    active &&
    css`
      border-width: 3px;
      border-color: ${theme.colors.attention.main};
    `}
`;
