import React from 'react';
import { connect } from 'react-redux';

class Filter extends React.Component {
  setDateFrom = ev => {
    let dateFrom = document.querySelector('#dateFrom').value;    
    let str = JSON.stringify(dateFrom);
    localStorage.setItem('dateFrom', str);
  };
  setDateTo = ev => {
    let dateTo = document.querySelector('#dateTo').value;    
    let str2 = JSON.stringify(dateTo);
    localStorage.setItem('dateTo', str2);
  };
  search = ev => {
    let text = document.querySelector('#textSearch').value;    
    let str3 = JSON.stringify(text);
    localStorage.setItem('searchResult', str3);
  };

  render() {
    var date = new Date();
    return (
      <div>
        <div className="filter">Filter</div>
        <div>
          <input
            type="checkbox"
            onChange={this.props.showCompleted}
            defaultChecked
          />Show completed
        </div>

        <form onChange={this.props.filterWithDate} className="flef_wrapper">
          <input
            type="date"
            id="dateFrom"
            onChange={this.setDateFrom}
            defaultValue={
              date.getFullYear() +
              '-' +
              (date.getMonth() >= 10 ? '' : '0') +
              (date.getMonth() + 1) +
              '-' +
              (date.getDay() >= 10 ? '' : '0') +
              (date.getDay() + 1)
            }
          />
          <input
            type="date"
            id="dateTo"
            onChange={this.setDateTo}
            defaultValue={
              date.getFullYear() +
              '-' +
              (date.getMonth() >= 10 ? '' : '0') +
              (date.getMonth() + 1) +
              '-' +
              (date.getDay() >= 10 ? '' : '0') +
              (date.getDay() + 1)
            }
          />
          <input
            id="textSearch"
            onChange={this.search}
            placeholder="Text search (title + description)"
          />
        </form>
        <button onClick={this.handleClick}>button</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    testReducer: state.testReducer,
  };
};

export default connect(mapStateToProps)(Filter);
