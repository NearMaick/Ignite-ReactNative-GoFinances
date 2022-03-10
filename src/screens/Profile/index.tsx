import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID='text-title'>Perfil</Text>

      <TextInput
        testID='input-name'
        placeholder='Nome'
        value='Maick'
        autoCorrect={false}
      />

      <TextInput testID='input-surname' placeholder='Sobrenome' value='Souza' />

      <Button title='Salvar' onPress={() => {}} />
    </View>
  );
}
