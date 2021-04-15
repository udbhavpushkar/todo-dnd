import './App.css';
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import _ from "lodash"
import {v4} from "uuid"

const item = {
    id: v4(),
    name: "first"
}

const item2 = {
    id: v4(),
    name: "second"
}



function App() {
  const [state, setState] = useState({
      "todo": {
          title: "Todo",
          items: [item]
      },
      "in-progress":{
          title: "In Progress",
          items: [item2]
      },
      "done":{
          title: "Done",
          items: []
      }
  });
  return (
    <div className="App">
      <DragDropContext onDragEnd={e => console.log(e)}>
          {_.map(state, (data, key)=>{
              return(
                  <div key={key} className="column">
                      <h3>{data.title}</h3>
                      <Droppable droppableId={key}>
                          {(provided)=>{
                              return(
                                  <div ref={provided.innerRef} {...provided.droppableProps} className="droppable-col">
                                      {data.items.map((ele, index)=>{
                                          return(
                                              <Draggable key={ele.id} index={index} draggableId={ele.id}>
                                                  {(provided)=>{
                                                      return(
                                                          <div
                                                              ref={provided.innerRef}
                                                              {...provided.draggableProps}
                                                              {...provided.dragHandleProps}>
                                                              {ele.name}
                                                          </div>
                                                      )
                                                  }}
                                              </Draggable>
                                          )
                                      })}
                                  </div>
                              )
                          }}
                      </Droppable>
                  </div>
              )
          })}
      </DragDropContext>
    </div>
  );
}

export default App;
