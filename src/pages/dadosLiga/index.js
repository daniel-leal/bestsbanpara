import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { api } from '../../services/api';

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Title,
  ScrollView,
  Button,
  Icon,
  Tab,
  Tabs,
} from 'native-base';

export default class DadosLiga extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  state = {
    teams: [],
    teamsByRound: [],
    slug: this.props.navigation.getParam('slug')
  };

  async componentDidMount() {
    try {
      const response = await api.get(`/auth/liga/${this.state.slug}/`);
      const responseByRound = await api.get(`/auth/liga/${this.state.slug}?orderBy=rodada`);
      this.setState({ teams: response.data.times, teamsByRound: responseByRound.data.times });
    } catch (_err) {
      console.log(_err);
    }
  }

  renderTeams = () => (
    this.state.teams.map(team => {
      return (
        <ListItem avatar key={team.time_id} style={styles.times}>
          <Left>
            <Thumbnail source={{ uri: team.url_escudo_png }} />
          </Left>
          <Body>
            <Text>{team.nome}</Text>
            <Text note>{team.nome_cartola}</Text>
            <Text style={styles.ponto}>{team.pontos.campeonato.toFixed(2)}</Text>
          </Body>
          <Right>
            <Text>{team.ranking.campeonato}</Text>
          </Right>
        </ListItem>
      )
    })
  )

  renderTeamsByRound = () => (
    this.state.teamsByRound.map(team => {
      return (
        <ListItem avatar key={team.time_id} style={styles.times}>
          <Left>
            <Thumbnail source={{ uri: team.url_escudo_png }} />
          </Left>
          <Body>
            <Text>{team.nome}</Text>
            <Text note>{team.nome_cartola}</Text>
            <Text style={styles.ponto}>{team.pontos.rodada.toFixed(2)}</Text>
          </Body>
          <Right>
            <Text>{team.ranking.rodada}</Text>
          </Right>
        </ListItem>
      )
    })
  )

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Ranking</Title>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab heading="Campeonato">
            <Content>
              <List>
                {this.renderTeams()}
              </List>
            </Content>
          </Tab>
          <Tab heading="Rodada">
            <Content>
              <List>
                {this.renderTeamsByRound()}
              </List>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  times: {
    padding: 10,
  },
  ponto: {
    color: '#228B22',
  }
})
