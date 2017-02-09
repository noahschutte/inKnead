import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import SpinningPizza from './SpinningPizza';
import Entry from './Entry';

class Entries extends Component {
  state = {
    dataSource: null,
  };

  componentWillMount() {
    this.updateDataSource();
  }

  componentWillReceiveProps(nextProps) {
    this.updateDataSource(nextProps.entryRows);
  }

  updateDataSource = (array = this.props.entryRows) => {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ dataSource: ds.cloneWithRows(this._genRows(array)) });
  }

  _genRows(length) {
    const result = [];
    for (const index of length) {
      result.push(index);
    }
    return result;
  }

  _onRefresh = () => {
    this.props.getEntries();
  }

  render() {
    const { dataSource } = this.state;
    let content;
    if (dataSource === null) {
      content = (
        <View style={{ flex: 1, padding: 50 }}>
          <SpinningPizza />
        </View>
      );
    } else {
      content = (
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this._onRefresh}
            />
          }
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
