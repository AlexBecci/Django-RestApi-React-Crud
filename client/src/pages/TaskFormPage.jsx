import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom"

function TaskFormPage() {
  const params = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const navigate = useNavigate()
  const onSubmit = handleSubmit(async data => {
    if (params.id) {
      console.log('actualizated')
      await updateTask(params.id, data)
    }
    else {
      await createTask(data)
    }
    navigate("/tasks")
  })
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTask(params.id)
        setValue('title', res.data.title)
        setValue('description', res.data.description)
      }
    }

    loadTask();
  }, [])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='Title' {...register('title', { required: true })} />
        {errors.title && <span>  title is required</span>}
        <textarea rows="3" placeholder='Description' {...register('description', { required: true })}></textarea>
        {errors.description && <span> password is required</span>}

        <button>Save</button>
      </form>
      {params.id && <button onClick={async () => {
        const accepted = window.confirm('are you sure?')
        if (accepted) {
          await deleteTask(params.id)
          navigate("/tasks")
        }
      }}>Delete  </button>}
    </div>
  )
}

export default TaskFormPage