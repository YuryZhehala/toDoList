import React from 'react';

class TodoForm extends React.Component {
  onSubmit = ev => {
    ev.preventDefault();
    let form = ev.target;
    let text1 = form.querySelector('#title').value;
    let text2 = form.querySelector('#description').value;
    let prior = form.querySelector('select').value;
    let dat = form.querySelector('#date').value;    
    let newList = localStorage.getItem('list');
    var listArr = JSON.parse(newList);

    function isPositive(element) {
      return (
        isDeepEqual(element, {
          status: true,
          title: text1,
          priority: prior,
          date: dat,
          description: text2,
        }) ||
        isDeepEqual(element, {
          status: false,
          title: text1,
          priority: prior,
          date: dat,
          description: text2,
        })
      );
    }

    if (listArr.some(isPositive)) {
      alert('Такая запись уже сужествует');
    } else {
      this.props.add({
        status: false,
        title: text1,
        priority: prior,
        date: dat,
        description: text2,
      });
    }
    form.reset();
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
  };

  render() {
    var date = new Date();
    return (
      <div>
        <div className="addTask"> Add Task</div>
        <form onSubmit={this.onSubmit} className="flef_wrapper">
          <input id="title" placeholder="Title" />

          <select id="select">
            <option selected disabled>
              Priority
            </option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            id="date"
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

          <input id="description" placeholder="Description" />
          <p id="todaysDate">Today's date: {new Date().toDateString()}</p>
          <div>
            <button>Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default TodoForm;
