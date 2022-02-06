import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface IProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, ...rest }: IProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
