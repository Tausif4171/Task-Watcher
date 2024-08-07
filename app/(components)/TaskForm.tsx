"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  data?: any;
  editMode?: boolean;
};

export const TaskForm = ({ data, editMode }: Props) => {
  console.log(data);
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    status: "Todo",
    progress: 0,
    priority: 1,
    category: "Software",
    // active: Boolean,
  });

  console.log({ formData });

  useEffect(() => {
    if (editMode) {
      setFormData({
        title: data.title,
        description: data.description,
        status: data.status,
        progress: data.progress,
        priority: data.priority,
        category: data.category,
      });
    }
  }, [editMode]);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createTask = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/Task", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res) {
      router.refresh();
      router.push("/");
      return "Successfully created!";
    } else {
      return "Error in creating";
    }
  };

  const updateTask = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`/api/Task/${data._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res) {
      router.refresh();
      router.push("/");
      return "Successfully updated!";
    } else {
      return "Error in updating";
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <h2>{editMode ? "Update your Task" : "Create your Task"}</h2>

      <form
        className="flex flex-col"
        method="POST"
        onSubmit={editMode ? updateTask : createTask}
      >
        <label>Title</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          typeof="textarea"
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Progress</label>
        <input
          type="range"
          min={0}
          max={100}
          name="progress"
          value={formData.progress}
          onChange={handleChange}
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value={"Software"}>Software</option>

          <option value={"Hardware"}>Hardware</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            type="radio"
            name="priority"
            value={1}
            checked={formData.priority == 1}
            onChange={handleChange}
          />
          <label>1</label>

          <input
            type="radio"
            name="priority"
            value={"2"}
            checked={formData.priority == 2}
            onChange={handleChange}
          />
          <label>2</label>

          <input
            type="radio"
            name="priority"
            value={3}
            checked={formData.priority == 3}
            onChange={handleChange}
          />
          <label>3</label>

          <input
            type="radio"
            name="priority"
            value={4}
            checked={formData.priority == 4}
            onChange={handleChange}
          />
          <label>4</label>

          <input
            type="radio"
            name="priority"
            value={"5"}
            checked={formData.priority == 5}
            onChange={handleChange}
          />
          <label>5</label>
        </div>

        <label>status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value={"Todo"}>Todo</option>

          <option value={"Inprogress"}>Inprogress</option>

          <option value={"InReviews"}>InReview</option>

          <option value={"Done"}>Done</option>
        </select>

        <button type="submit">{editMode ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};
