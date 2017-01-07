import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import TimeAgo from './TimeAgo';
import RequestPizzas from './RequestPizzas';

const Entry = (props) => {
  const { seconds, pizzas, thumbnail } = props.selectedRequest;

  return (
    <TouchableOpacity style={styles.container}>

      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.timeContainer}>
          <TimeAgo style={styles.time} secondsOld={seconds} />
        </View>
        <View style={styles.requestContent}>
          <RequestPizzas pizzas={pizzas} style={styles.pizzas} />
        </View>
      </View>

    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2,
    borderBottomColor: '#BDBDBD',
    borderTopColor: '#BDBDBD',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 3,
  },
  thumbnailContainer: {
    flex: 3,
  },
  infoContainer: {
    flex: 7,
    alignItems: 'flex-end'
  },
  timeContainer: {
    flex: 1,
  },
  thumbnail: {
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 25,
  },
};

export default Entry;

/*

<View style={styles.container}>
  <TouchableOpacity onPress={() => console.log('pressed!')} style={styles.wrapper}>
    <View style={styles.imageContainer}>
      <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
    </View>
    <View style={styles.infoContainer}>
      <View style={styles.date}>
        <TimeAgo style={styles.dateTime} secondsOld={seconds} />
      </View>
      <View style={styles.content}>
        <Text>Request Text Placeholder</Text>
        <Text>{pizzas}</Text>
      </View>
    </View>
  </TouchableOpacity>
</View>

*/
