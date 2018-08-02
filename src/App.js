import React, { Component } from 'react';
import TodoForm from './components/TodoForm';
import Filter from './components/Filter';
import Table from './components/TodoList';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    let newList = localStorage.getItem('list');

    var listArr = JSON.parse(newList);
    if (!Array.isArray(listArr)) {
      listArr = [];
    }
    console.log(listArr);
    let e = 1;
    this.state = {
      list: listArr,
    };
  }

  addItem = somethingToAdd => {
    let newList = [...this.state.list, somethingToAdd];
    var str = JSON.stringify(newList);
    localStorage.setItem('list', str);
    this.setState({
      list: newList,
    });
  };

  delItem = elem => {
    let newList = this.state.list.filter(item => item !== elem);
    var str = JSON.stringify(newList);
    localStorage.setItem('list', str);
    this.setState({
      list: newList,
    });
  };

  checkbox = elem => {
    let newList = localStorage.getItem('list');
    var listArr = JSON.parse(newList);
    for (let index in listArr) {
      if (isDeepEqual(listArr[index], elem)) {
        listArr[index].status = !listArr[index].status;
      }
    }

    var str = JSON.stringify(listArr);
    localStorage.setItem('list', str);
    this.setState({
      list: listArr,
    });
  };
  showCompleted = event => {
    let newList = localStorage.getItem('list');
    var listArr = JSON.parse(newList);

    if (event.target.checked) {
      this.setState({
        list: listArr,
      });
    } else {
      const result = listArr.filter(note => note.status == false);

      this.setState({
        list: result,
      });
    }
  };
  filterWithDate = event => {
    let newList = localStorage.getItem('list');
    var listArr = JSON.parse(newList);

    let str = localStorage.getItem('dateFrom');
    var dateFrom = JSON.parse(str);
    let str2 = localStorage.getItem('dateTo');
    var dateTo = JSON.parse(str2);
    let str3 = localStorage.getItem('searchResult');
    var searchResult = JSON.parse(str3);
    const newArr = listArr.filter(
      note =>
        note.date >= dateFrom &&
        note.date <= dateTo &&
        ((note.title + '' + note.description).indexOf(searchResult) !== -1 ||
          searchResult == ''),
    );
    this.setState({
      list: newArr,
    });
  };

  render() {
    return (
      <div>
        <div id="form">
          <TodoForm add={this.addItem} />
        </div>
        <div id="filter">
          <Filter
            showCompleted={this.showCompleted}
            filterWithDate={this.filterWithDate}
          />
        </div>
        <div id="table">
          <Table
            list={this.state.list}
            del={this.delItem}
            check={this.checkbox}
          />
        </div>
      </div>
    );
  }
}
function isDeepEqual(a, b) {
  if (['string', 'number', 'boolean', 'undefined'].includes(typeof a)) {
    if (
      typeof a === 'number' &&
      typeof b === 'number' &&
      isNaN(a) &&
      isNaN(b)
    ) {
      return true;
    }
    return a === b;
  }
  if (typeof a === 'object') {
    if (a === null) {
      return a === b;
    }
    for (var key in a) {
      if (!isDeepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }

  return true;
}
export default App;
