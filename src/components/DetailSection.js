import React from 'react';
import { View, Text } from 'react-native';

const DetailSection = ({ bannerText, children }) => {
  const { bannerStyle, bannerTextStyle, contentStyle, placeholderStyle } = styles;
  let banner;

  if (bannerText) {
    banner = (
      <View style={bannerStyle}>
        <Text style={bannerTextStyle}>{bannerText}</Text>
      </View>
    );
  }
  let content;
  if (typeof children === 'string') {
    content = (
      <View style={contentStyle}>
        <Text style={placeholderStyle}>{children}</Text>
      </View>
    );
  } else {
    content = (
      <View style={styles.contentStyle}>
        {children}
      </View>
    );
  }

  return (
    <View>
      {banner}
      {content}
    </View>
  );
};

const styles = {
  bannerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#424242',
    alignSelf: 'stretch',
    padding: 5,
  },
  bannerTextStyle: {
    color: '#fff'
  },
  contentStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 5,
  },
  placeHolderStyle: {
    paddingTop: 5,
    paddingBottom: 5
  }
};

export default DetailSection;
