import { Container } from "./styles";
import { TextInputProps } from "react-native";

type IProps = TextInputProps;

export function Input({ ...rest }: IProps) {
  return <Container {...rest} />;
}
