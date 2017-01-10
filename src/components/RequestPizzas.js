import React from 'react';
import { View, Image } from 'react-native';

const RequestPizzas = ({ pizzas, size }) => {
  const pizzaImages = [];
  let style;
  switch (size) {
    case 'large':
      style = styles.pizzaImageLarge;
      break;
    default:
      style = styles.pizzaImageSmall;
  }
  for (let i = 0; i < pizzas; i++) {
    const pizzaImage = (
      <Image
        style={style}
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
  pizzaImageSmall: {
    width: 20,
    height: 20,
  },
  pizzaImageLarge: {
    width: 50,
    height: 50,
  },
  pizzas: {
    flexDirection: 'row',
    margin: 2,
  },
};

export default RequestPizzas;
