import { Container } from "./styles";
import { TextInputProps } from "react-native";

interface IProps extends TextInputProps {
  active?: boolean;
}

export function Input({ active = false, ...rest }: IProps) {
  return <Container active={active} {...rest} />;
}
