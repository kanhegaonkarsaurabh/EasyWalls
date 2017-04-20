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

let RandManager = require('./RandManager.js');

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

});

const NUM_WALLPAPERS = 7;
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

  check() {
    return (
      <Text>Data has been loaded </Text>
    );
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
        let randomID = RandManager.uniqueRandomNumbers(NUM_WALLPAPERS, 0, jsonData.length);
        let walls = [];
        Array.from(randomID).forEach(randomID => {
          walls.push(jsonData[randomID]);
        });
        this.setState({
          isLoading: false,
          wallsJSON: [].concat(walls)
        });// Change isLoading until JSON data loads
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
    let { wallsJSON, isLoading } = this.state;
    if( !isLoading) {
      return (
          <View>
            { wallsJSON.map((wallpaper, index) => {
              return (
                <Text key={index}>
                  {wallpaper.author}
                  </Text>
              );
              })}
          </View>


      );
    }
  }
}
AppRegistry.registerComponent('EasyWalls', () => EasyWalls);
