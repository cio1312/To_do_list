import React from "react";
import Userdata from "./Note.json";
import "./styles.css";
import Helmet from "react-helmet"; // for background

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pass: 0,

      note: "",
      priority: 1,
      count: 0
    };
  }

  updateInput(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
    console.log(val);
  }

  // shownotes() {
  //   let store = [];
  //   Userdata.map((item, index) => {
  //     let priority = item.priority;
  //     let note = item.note;

  //     store.push(
  //       <div>
  //         <div>{priority}</div>

  //         <div>{note}</div>

  //         <div>
  //           <button onClick={event => this.deletenote(item.id)}>Delete</button>
  //         </div>
  //       </div>
  //     );
  //   });
  //   return store;
  // }

  deletenote = id => {
    var key = id;
    delete Userdata[key];

    this.setState({ note: "" }); // just to refresh page
  };

  addnote = event => {
    let str = this.state.note.trim();
    if (str.length === 0 || this.state.note === "") {
      alert("please write a note ");
    } else {
      let data = {
        id: this.state.count,
        priority: parseInt(this.state.priority),
        note: this.state.note
      };
      this.setState({ count: this.state.count + 1 });
      Userdata.push(data);
      Userdata.sort(function(a, b) {
        console.log(Userdata);
        console.log(a.priority);
        console.log(b.priority);
        return parseInt(a.priority) - parseInt(b.priority);
      });
    }
  };

  shownotes = () => {
    let store = [];
    Userdata.map((item, index) => {
      let priority = parseInt(item.priority);
      let note = item.note;
      let color = "black";

      switch (priority) {
        case 1: {
          color = "verydarkred";
          break;
        }
        case 2: {
          color = "darkred";
          break;
        }
        case 3: {
          color = "mediumred";
          break;
        }
        case 4: {
          color = "lightred";
          break;
        }
        case 5: {
          color = "verylightred";
          break;
        }
      }

      store.push(
        <tr>
          <td id={color}>{note}</td>

          <td>
            <button id={color} onClick={event => this.deletenote(index)}>
              <i class="fa fa-trash" />
            </button>
          </td>
        </tr>
      );
    });
    return store;
  };

  render() {
    if (this.state.pass == 0) {
      return (
        <body>
          <div>
            <Helmet
              bodyAttributes={{
                style:
                  'background-image : url("https://static2.businessinsider.com/image/5732437c910584716f8c1d57/theres-a-secret-term-vcs-use-to-insult-some-founders-not-blue-flame-enough.jpg");'
              }}
            />
            <p id="headings">To Do List</p>

            <form id="centering">
              <input
                id="notearea"
                type="text"
                name="note"
                onChange={event => this.updateInput(event)}
              />
              <select
                id="priorityonarea"
                name="priority"
                onChange={event => this.updateInput(event)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <input
                id="buttonarea"
                type="button"
                value="Add"
                onClick={event => this.addnote(event)}
              />
            </form>
            <table id="tabling">{this.shownotes()}</table>
          </div>
        </body>
      );
    }
  }
}
export default List;
