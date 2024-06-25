import React, { useState } from "react";
import Posts from "./Posts";
import { observer } from "mobx-react";
import TodoStore from "../Store/TodoStore";

const Home = observer(() => {
  const [data, setdata] = useState("");
  return (
    <>
      <div>
        <div>
          {TodoStore.todos.map((todo, i) => (
            <p key={i}>{todo}</p>
          ))}
        </div>
        <div>
          <input type="text" onChange={(e: any) => setdata(e.target.value)} />
          <button
            onClick={() => {
              TodoStore.addTodo(data);
            }}
          >
            Add
          </button>
        </div>
      </div>
      <Posts />
    </>
  );
});

export default Home;
