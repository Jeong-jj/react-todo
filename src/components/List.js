import React, { useState } from 'react'

const List = React.memo(({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,
  handleClick
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  
  const handleCompleteChange = () => {
    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })

    setTodoData(newTodoData)
    localStorage.setItem("todoData", JSON.stringify(newTodoData))
  };

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.title = editedTitle
      }
      return data;
    });

    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData))
    setIsEditing(false);
  }

  if(isEditing) {
    return (
      <div
      className={"bg-gray-100 flex items-center justify-between w-full px-4 py-2 my-2 text-gray-600 border rounded"}
      >
        <div className="items-center">
          <form onSubmit={handleSubmit}>
            <input
              value={editedTitle}
              className={"w-full px-3py-2 mr-4 text-gray-500 rounded"}
              onChange={handleEditChange}
              autoFocus
            />
          </form>
        </div>

        <div className="items-center">
          <button className="px-2 py-2 float-left" type='submit' onClick={handleSubmit}>save</button>
          <button className="px-2 py-2 float-right"  onClick={()=>setIsEditing(false)}>cancel</button>
        </div>
      </div>
  )} else {
    return (
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-2 my-2 text-gray-600 border rounded`}
      >
          <div className="items-center">
            <input type="checkbox" defaultChecked={completed} onChange={() => handleCompleteChange()} />{" "}
            <span className={completed ? "line-through" : undefined}>{title}</span>
          </div>
    
          <div className="items-center">
            <button className="px-2 py-2 float-left"  onClick={()=>setIsEditing(true)}>edit</button>
            <button className="px-2 py-2 float-right"  onClick={()=>handleClick(id)}>X</button>
          </div>
      </div>
  )}
})

export default List