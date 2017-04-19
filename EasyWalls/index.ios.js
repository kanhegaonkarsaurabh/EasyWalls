/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

});
export default class EasyWalls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallsJSON: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchWallsJSON();
  }

  render() {
    let { isLoading } = this.state;
    if (isLoading)
      return this.renderLoadingMessage();
    else
      return this.renderResults();
  }

  fetchWallsJSON() {
    const url = 'http://unsplash.it/list';
    // It causes a JSON error with network request.
    // This is because Xcode only allows https and not http. fixed at stack overflow
    fetch(url)
      .then(response => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({ isLoading: false });// Change isLoading until JSON data loads
      })
      .catch(error => console.log('Fetch Error : ' + error));
  }

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={'#fff'}
          size={'large'}
          style={{margin: 5}}
        />
        <Text style={{ color: '#fff' }} >Contacting Unsplash </Text>
      </View>
    );
  }

  renderResults() {
    return (
      <View>
        <Text> Data Loaded </Text>
      </View>
    );
  }
}
AppRegistry.registerComponent('EasyWalls', () => EasyWalls);
