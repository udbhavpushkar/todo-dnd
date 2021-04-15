import './App.css';
import React, {useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import _ from "lodash"


function App() {
  const [state, setState] = useState({
      "todo": {
          title: "",
          items: []
      },
      "in-progress":{
          title: "In Progress",
          items: []
      },
      "done":{
          title: "Done",
          items: []
      }
  });
  return (
    <div className="App">
      <DragDropContext onDragEnd={e => console.log(e)}>
          <h2>Under Construction</h2>
      </DragDropContext>
    </div>
  );
}

export default App;
