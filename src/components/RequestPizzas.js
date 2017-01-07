import React from 'react';
import { View, Image } from 'react-native';

const RequestPizzas = (props) => {
  const pizzaImages = [];
  for (let i = 0; i < props.pizzas; i++) {
    const pizzaImage = (
      <Image
        style={styles.pizzaImage}
        source={require('../../assets/pizza-icon-for-requests/whole-pizza.png')}
        key={i}
      />
    );
    pizzaImages.push(pizzaImage);
  }

  return (
    <View style={styles.pizzas}>
      {pizzaImages}
    </View>
  );
};

const styles = {
  pizzaImage: {
    width: 20,
    height: 20,
  },
  pizzas: {
    flexDirection: 'row',
    margin: 2,
  },
};

export default RequestPizzas;
