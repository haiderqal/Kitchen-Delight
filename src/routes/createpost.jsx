import { useState } from "react"
import { supabase } from "../client"

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", content: "", image_url: "" })

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const createPost = async (event) => {
    event.preventDefault()

    if (post.title.trim() !== "") {
      const { data, error } = await supabase
        .from("Posts")
        .insert({
          title: post.title,
          content: post.content,
          image_url: post.image_url,
        })

      if (error) {
        alert("Error creating post: " + error.message)
        console.error(error)
      } else {
        window.location = "/"
      }
    } else {
      alert("A title is required in order to make a post")
    }
  }

  return (
    <div className="create_card">
      <form className="create_form" onSubmit={createPost}>
        <h3 className="form_title">Create a New Post</h3>

        <div className="form_item">
          <label>Title</label> <span className="form_tag">(Required)</span>
          <br />
          <input
            className="textbox"
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form_item">
          <label>Content</label>
          <br />
          <textarea
            className="post_content_input"
            rows="5"
            cols="50"
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
          />
        </div>

        <div className="form_item">
          <label>Image URL</label>
          <br />
          <input
            className="textbox"
            type="text"
            id="image_url"
            name="image_url"
            value={post.image_url}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="create_edit_post_btn">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreatePost
