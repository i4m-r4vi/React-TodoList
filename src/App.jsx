import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from "react";


const App = () => {
  const LOCAL_STORAGE_KEY = "task-list"
  let [task, setTask] = useState("");
  const [list, setList] = useState(()=>{
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY )) || []
  });

  const addTask = () => {
    if (task) {
      const to_do = {
        id: list.length + 1,
        title: task,
        toggle: false,
      };
      setList([to_do,...list]);
      setTask("");
    }
  };
  const deleteData = (id)=>{
    const filterdData= list.filter((task)=>task.id !== id);
    setList([...filterdData])
  }
  const ToggleComplete =(id)=>{
    const ToggleBtn=document.getElementById(id);
    ToggleBtn.style.textDecoration="line-through"
  }

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(list))
  },[list])


  const ArrayData = list.map((val) => {
    return (
      <div className="d-flex justify-content-between mt-3 datas" key={val.id}>
        <div className="d-flex">
          <input type="radio" onClick={()=>{ToggleComplete(val.id,val.toggle)}} />
          <label className="ms-2 m-0" id={val.id}>{val.title}</label>
        </div>
        <button onClick={()=>deleteData(val.id)}>X</button>
      </div>
    );
  });

  

  return (
    <div className="main-container">
      <div className="form-todo">
        <nav className="d-flex justify-content-left align-items-center">
          <h2 className="fw-bold">
            To-Do List
            <img
              src="/icon.png"
              className="ms-2"
              style={{ width: "40px", height: "40px" }}
            />
          </h2>
        </nav>
        <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Add Your Task"
            id="tasks"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" className="sub-btn fw-bold" onClick={addTask}>
            Add
          </button>
        </form>
        <div className="todolist">
          <div className="data">
            <form action="" className="mt-4 d-flex flex-column" onSubmit={(e)=>e.preventDefault()}>
              {ArrayData}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
