import { HighlightCard } from "../../components/HighlightCard";
import { HighLightCards } from "../../components/HighlightCard/styles";
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
} from "./styles";

export function Dashboard() {
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
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighLightCards>
    </Container>
  );
}
