import { Container, Error } from "./styles";
import { Control, Controller } from "react-hook-form";

import { Input } from "../Input";
import { TextInputProps } from "react-native";

interface IProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm({ control, name, error, ...rest }: IProps) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
