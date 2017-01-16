import React from 'react';
import { View, Text } from 'react-native';

const DetailSection = ({ bannerText, children, style }) => {
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
      <View style={[contentStyle, style]}>
        <Text style={placeholderStyle}>{children}</Text>
      </View>
    );
  } else {
    content = (
      <View style={[contentStyle, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={{ margin: 3, backgroundColor: 'white', borderRadius: 2 }}>
      {banner}
      {content}
    </View>
  );
};

const styles = {
  bannerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ce0000',
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
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
