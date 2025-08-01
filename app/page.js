"use client"
import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const [todoData, setToDoData] = useState([]);
  const fetchTodos = async () => {
    const response = await axios.get('/api');
    setToDoData(response.data.todos);
  }

  const deleteTodo = async (id) => {
    const response = await axios.delete('/api', {
      params: {
        mongoId: id
      }
    })
    toast.warning(response.data.msg);
    fetchTodos();
  }

  const completeTodo = async (id) => {
    const response = await axios.put("/api", {}, {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({ ...form, [name]: value }));
    console.log(formData);
  }



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      //api code
      const response = await axios.post('/api', formData);
      toast.success(response.data.msg)
      setFormData({ title: "", description: "" });
      await fetchTodos();
    } catch (error) {
      toast.error("Error", error)
    }
  }


  return (
    <>
      <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-10 px-2 mx-auto">
        <h3 className="text-lg font-semibold cursor-pointer text-center">Add Your Task</h3>
        <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="Enter title" className="px-3 py-2 border-2 w-full" required />
        <textarea value={formData.description} onChange={onChangeHandler} name="description" placeholder="Enter description" className="px-3 py-2 border-2 w-full" required></textarea>
        <button type="submit" className="bg-orange-600 py-2 mt-2 px-6 text-white rounded-2xl font-bold cursor-pointer">Add ToDo</button>
      </form>


      <div className="relative overflow-x-auto mt-15 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo} />
            })}

          </tbody>
        </table>
      </div>


    </>
  );
}
