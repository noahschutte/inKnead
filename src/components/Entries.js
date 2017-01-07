import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import LoadingPizza from './LoadingPizza';
import Entry from './Entry';

class Entries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('component will receive props');
    console.log('length', nextProps.entryRows.length);
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

  // _renderRow = (rowData) => {
  //   console.log(this.props.entryRows);
  // }

  render() {
    const { dataSource } = this.state;
    const content = () => {
      if (dataSource === null) {
        return <LoadingPizza />;
      }
      return (
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
    };
    return (
      <View style={{ flex: 8 }}>
        { content() }
      </View>
    );
  }
}

export default Entries;
