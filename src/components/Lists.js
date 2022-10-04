import React from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({handleClick, todoData, setTodoData}) => {  
  // props를 건내받음 따로 변수명으로 받아도 됨(대신 이때는 중괄호로 묶어줌)
  // component를 화살표함수형으로 바꿈
  // React.memo를 이용해서 불필요한 렌더링을 없애서 렌더링 최적화
  
  const handleEnd = (result) => {
    // result 매개변수에 source항목 및 대상의 위치와 같은 드래그 이벤트에 대한 정보가 포함된다.
    // console.log("result", result)

    // 목적지가 없으면(이벤트 취소) 이 함수를 종료
    if (!result.destination) return;

    // 리액트의 불변성을 지키기 위해 새로운 todoData생성
    const newTodoData = todoData;

    /*
      1. 변경시키는 아이템을 배열에서 지워준다.
      2. return값으로 지워진 아이템을 잡아준다.
    */
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 insert해준다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData))
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd} >
        <Droppable droppableId='todo'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} >
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
})

export default Lists