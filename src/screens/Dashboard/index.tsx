import { HighlightCard } from "../../components/HighlightCard";
import { HighLightCards } from "../../components/HighlightCard/styles";
import {
  TransactionCard,
  ITransactionCardProps,
} from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  LogoutButton,
  Icon,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

interface IDataListProps extends ITransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: IDataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de sites",
      amount: "R$ 12.000,00",
      category: {
        name: "vendas",
        icon: "dollar-sign",
      },
      date: "21/12/2021",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Vendas",
        icon: "coffee",
      },
      date: "21/12/2021",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "shopping-bag",
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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
