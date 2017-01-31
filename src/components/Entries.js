import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import SpinningPizza from './SpinningPizza';
import Entry from './Entry';

class Entries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ dataSource: ds.cloneWithRows(this._genRows(nextProps.entryRows)) });
  }

  _genRows(length) {
    const result = [];
    for (const index of length) {
      result.push(index);
    }
    return result;
  }

  render() {
    const { dataSource } = this.state;
    let content;
    if (dataSource === null) {
      content = <SpinningPizza />;
    } else {
      content = (
        <ListView
          dataSource={dataSource}
          renderRow={
            (rowData) => (
              <Entry selectedRequest={rowData} />
            )
          }
          enableEmptySections
        />
      );
    }
    return (
      <View style={{ flex: 8 }}>
        {content}
      </View>
    );
  }
}

export default Entries;
