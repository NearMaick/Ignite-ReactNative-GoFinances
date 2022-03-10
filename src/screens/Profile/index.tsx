import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text>Perfil</Text>

      <TextInput placeholder='Sobrenome' />

      <Button title='Salvar' onPress={() => {}} />
    </View>
  );
}
