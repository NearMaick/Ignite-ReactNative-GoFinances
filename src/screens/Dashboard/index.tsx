import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import { HighLightCards } from "../../components/HighlightCard/styles";
import { TransactionCard } from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export function Dashboard() {
  const data = [
    {
      title: "Desenvolvimento de sites",
      amount: "R$ 12000",
      category: {
        name: "vendas",
        icon: "dollar-sign",
      },
      date: "21/12/2021",
    },
    {
      title: "Desenvolvimento de sites",
      amount: "R$ 12000",
      category: {
        name: "vendas",
        icon: "dollar-sign",
      },
      date: "21/12/2021",
    },
    {
      title: "Desenvolvimento de sites",
      amount: "R$ 12000",
      category: {
        name: "vendas",
        icon: "dollar-sign",
      },
      date: "21/12/2021",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/nearmaick.png" }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Maick</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighLightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 12400"
          lastTransaction="Última entrada 13 de dezembro de 2021"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1500"
          lastTransaction="Última entrada 13 de dezembro de 2021"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16141"
          lastTransaction="De 11 à 25 dezembro de 2021"
        />
      </HighLightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace(),
          }}
        />
      </Transactions>
    </Container>
  );
}
