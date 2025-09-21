import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";
import React, { useEffect } from "react";
const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  //   useEffect(()=>{
  //     (async()=>{
  //        try{
  //          const response = await axios.get('/api.product')
  //         setProducts(response.data)
  //        }
  //        catch(err){

  //        }
  //     })()
  //   },[])
  return (
    <>
      <div>Todos</div>
      {todos?.map((todo) => {
        return (
          <>
            <div className="flex gap-2 my-2">
              <div
                key={todo.id}
                className="bg-blue-900 text-white w-2xl p-1 rounded-sm"
              >
                {todo.text}
              </div>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-500 p-1 text-white rounded-sm"
              >
                Delete
              </button>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Todos;

const customReactQuery = () => {};
