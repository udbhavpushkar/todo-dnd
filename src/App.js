import './App.css';
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import _ from "lodash"
import {v4} from "uuid"

function App() {
    const [job, setJob] = useState("")
  const [state, setState] = useState({
      "todo": {
          title: "Todo",
          items: [],
          color: "grey"
      },
      "in-progress":{
          title: "In Progress",
          items: [],
          color: "green"
      },
      "done":{
          title: "Done",
          items: [],
          color: "blue"
      }
  });

  const handleDragEnd = ({destination, source})=>{
      if (!destination){
          return
      }

      if (destination.index === source.index && destination.droppableId === source.droppableId){
          return
      }

      const itemCopy = {...state[source.droppableId].items[source.index]}
      setState(prev => {
          prev = {...prev}
          prev[source.droppableId].items.splice(source.index, 1)

          prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
          return prev
      })
  }

  const addJob = ()=>{
      setState(prevState => {
          return{
              ...prevState,
              todo: {
                  title: "Todo",
                  items: [{
                      id: v4(),
                      name: job
                  }, ...prevState.todo.items],
                  color: "grey"
              }
          }
      })
      setJob("")
  }

  return (
    <>
        <h1 style={{"textAlign": "center"}}>Board</h1>
        <div className="input">
            <input className="input-area" type="text" value={job} onChange={event => setJob(event.target.value)}/>
            <button className="button" onClick={addJob}>Add</button>
        </div>
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key)=>{
              return(
                  <div key={key} className="column">
                      <h3>{data.title}</h3>
                      <Droppable droppableId={key}>
                          {(provided)=>{
                              return(
                                  <div ref={provided.innerRef} {...provided.droppableProps} className={`droppable-col ${data.color}`}>
                                      {data.items.map((ele, index)=>{
                                          return(
                                              <Draggable key={ele.id} index={index} draggableId={ele.id}>
                                                  {(provided)=>{
                                                      return(
                                                          <div
                                                              className="item"
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
                                      {provided.placeholder}
                                  </div>
                              )
                          }}
                      </Droppable>
                  </div>
              )
          })}
      </DragDropContext>
    </div>
    </>
  );
}

export default App;
