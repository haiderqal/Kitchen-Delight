import { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "", image_url: "" });

  useEffect(() => {
    const getPost = async () => {
      // get the post with the given id
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .eq("id", id);
      console.log(data[0]);
      setPost({
        title: data[0].title,
        content: data[0].content,
        image_url: data[0].image_url,
      });
    };

    getPost();
  }, []);

  const updatePost = async (event) => {
    event.preventDefault();

    if (post.title != "") {
      await supabase
        .from("Posts")
        .update({
          title: post.title,
          content: post.content,
          image_url: post.image_url,
        })
        .eq("id", id);

      window.location = "/postDetails/" + id;
    } else {
      alert("A title is required in order to make a post");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Name: ", name, " value: ", value);
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="create_card">
      <form className="create_form">
        <h3 className="form_title">Edit Post</h3>
        <div className="form_item">
          <label>Title</label> <span className="form_tag">(Required)</span>{" "}
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
          <label>Image URL</label> <br />
          <input
            className="textbox"
            type="text"
            id="image_url"
            name="image_url"
            value={post.image_url}
            onChange={handleChange}
          />
        </div>
      </form>
      <button
        type="submit"
        onClick={updatePost}
        className="create_edit_post_btn"
      >
        Update Post
      </button>
    </div>
  );
};

export default EditPost;