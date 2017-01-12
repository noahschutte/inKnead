import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

class PizzaRadioButton extends Component {
  assembleImages = () => {
    const { options, selectedOption, selectedImage, unselectedImage } = this.props;
    const content = [];
    for (const option of options) {
      if (option > selectedOption) {
        content.push(unselectedImage);
      } else {
        content.push(selectedImage);
      }
    }
    return content;
  }
  renderContent = () => {
    const onPress = this.props.onPress;
    const content = this.assembleImages();
    return (
      <View style={styles.container}>
        {content.map((image, index) => {
          return (
            <TouchableWithoutFeedback onPress={() => onPress(index + 1)} key={index}>
              {image}
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
  render() {
    const content = this.renderContent();
    return content;
  }
}

const styles = {
  container: {
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
};

export default PizzaRadioButton;
