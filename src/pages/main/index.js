import React, { Component } from 'react';

import { api } from '../../services/api';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Title } from 'native-base';

export default class Main extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    leagues: [],
  };

  async componentDidMount() {
    try {
      const response = await api.get('/auth/ligas');
      console.log(response.data);
      this.setState({ leagues: response.data.ligas });
    } catch (_err) {
      console.log(_err);
    }
  }

  renderLeagues = () => (
    this.state.leagues.map(league => {
      return (
        <ListItem avatar key={league.liga_id} onPress={() => {alert(league.slug)}}>
          <Left>
            <Thumbnail source={{ uri: league.url_flamula_png }} />
          </Left>
          <Body>
            <Text>{league.nome}</Text>
            <Text note>{league.descricao}</Text>
          </Body>
          {/* <Right>
            <Text note>{}</Text>
          </Right> */}
        </ListItem>
      )
    })
  )

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Minhas Ligas</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            {this.renderLeagues()}
          </List>
        </Content>
      </Container>
    );
  }
}
