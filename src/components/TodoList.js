import React from 'react';

export default class Table extends React.Component {
  
  render() {
    let list = this.props.list;  
   
  
    
    function sortTable(table, col, reverse) {
      var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
      reverse = -(+reverse || -1);
      tr = tr.sort(function(a, b) {
        // sort rows
        return (
          reverse * // `-1 *` if want opposite order
          a.cells[col].textContent
            .trim() // using `.textContent.trim()` for test
            .localeCompare(b.cells[col].textContent.trim())
        );
      });
      for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
    }

    function makeSortable(table) {
      var th = table.tHead,
        i;
      th && (th = th.rows[0]) && (th = th.cells);
      if (th) i = th.length;
      else return; // if no `<thead>` then do nothing
      while (--i >= 0)
        (function(i) {
          var dir = 1;
          th[i].addEventListener('click', function() {
            sortTable(table, i, (dir = 1 - dir));
          });
        })(i);
    }

    function makeAllSortable(parent) {
      parent = parent || document.body;
      var t = parent.getElementsByTagName('table'),
        i = t.length;
      while (--i >= 0) makeSortable(t[i]);
    }

    window.onload = function() {
      makeAllSortable();
    };

    return (
      <table id="grid" className="table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>
              Done            
            </th>
            <th data-type="number">Title</th>
            <th data-type="string">Priority</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((el, index) => (
            <tr title={el.description}>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={list[index].status}
                  onChange={() => this.props.check(el)}
                />
              </td>
              <td>{el.title}</td>
              <td>{el.priority}</td>
              <td>{el.date}</td>
              <td>
                <button onClick={() => this.props.del(el)}>&times;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
