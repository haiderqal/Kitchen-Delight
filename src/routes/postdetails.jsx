import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [randomPosts, setRandomPosts] = useState([]);
  const timeSincePost = moment
    .utc(post.created_at)
    .local()
    .startOf("seconds")
    .fromNow();

  useEffect(() => {
    const getPost = async () => {
      // get the post with the given id
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .eq("id", id);
      setPost({
        id: data[0].id,
        created_at: data[0].created_at,
        title: data[0].title,
        content: data[0].content,
        image_url: data[0].image_url,
        upvotes: data[0].upvotes,
      });
    };

    const getComments = async () => {
      const { data, error } = await supabase
        .from("Comments")
        .select()
        .eq("post_id", id);
console.log(data);
      setComments(data);
    };

    const getAllPosts = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .order("created_at", { ascending: true });

      let filteredPosts = data.filter((item) => item.id != id);
      let randomPosts = [];

      for (let i = 0; i < filteredPosts.length && i < 5; i++) {
        let randomPost =
          filteredPosts[Math.floor(Math.random() * filteredPosts.length)];
        while (randomPosts.includes(randomPost)) {
          randomPost =
            filteredPosts[Math.floor(Math.random() * filteredPosts.length)];
        }
        randomPosts[i] = randomPost;
      }

      // set state
      setRandomPosts(randomPosts);
    };

    getPost();
    getComments();
    getAllPosts();
  }, []);

  const increaseUpvotes = async () => {
    console.log("increase upvote...");
    let updatedPost = { ...post };
    updatedPost.upvotes = updatedPost.upvotes + 1;

    event.preventDefault();

    // send updated data to database
    await supabase
      .from("Posts")
      .update({ upvotes: updatedPost.upvotes })
      .eq("id", post.id);

    console.log(updatedPost);

    setPost(updatedPost);
  };

  const deletePost = async (event) => {
    event.preventDefault();

    const response = confirm("Are you sure you want to delete this post?");

    if (response) {
      await supabase.from("Posts").delete().eq("id", id);

      window.location = "/";
    }
  };

  const postComment = async (event) => {
    event.preventDefault();

    await supabase
      .from("Comments")
      .insert({
      content:newComment,
      post_id: post.id
      });

    // refresh the page
    window.location = "/postDetails/" + id;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Name: ", name, " value: ", value);
    setNewComment(value);
  };

  let navigate = useNavigate();

  const moveToEditPost = (event, id) => {
    let path = "/editPost/" + id;
    navigate(path);
  };

  const moveToNewPostDetails = (event, id) => {
    window.location = "/postDetails/" + id;
  };

  return (
    <div className="post_details_page">
      <div className="post_details_main_content">
        <div className="post_details_card">
          <div className="upvote_column">
            <button className="upvote_button" onClick={increaseUpvotes}>
              <img className="upvote_img" src="../src/assets/food_upvote.png" />
            </button>
            <h5 className="upvote_num">{post.upvotes}</h5>
          </div>
          <div className="post_details">
            <h4 className="post_details_time">Created {timeSincePost}</h4>
            <p className="post_title">{post.title}</p>
            {post.content ? <p>{post.content}</p> : null}
            {post.image_url ? (
              <img
                className="post_img"
                src={post.image_url}
                alt={"image for post " + post.title}
              />
            ) : null}
          </div>
          <div className="post_options">
            <button
              className="option_btn"
              onClick={(event) => moveToEditPost(event, post.id)}
            >
              <img className="option_img" src="../src/assets/edit_icon.png" />
            </button>
            <button className="option_btn" onClick={deletePost}>
              <img className="option_img" src="../src/assets/delete_icon.png" />
            </button>
          </div>
        </div>
        <div className="comments_section">
          <label id="comment_label">Comments</label>
          <br />
          <textarea
            className="comment_input"
            rows="5"
            cols="50"
            id="newComment"
            name="newComment"
            value={newComment}
            onChange={handleChange}
          />
          <button onClick={postComment}>Post Comment</button>
          {comments != null ? (
            <h4>{comments.length} comments</h4>
          ) : (
            <h4>0 comments</h4>
          )}
          <div className="comment_list">
            {comments != null && comments.length > 0 ? (
              comments.map((comment, index) => (
                <div className="user_comment" key={index}>
                  <h6>
                    {moment
                      .utc(comment.created_at)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </h6>
                  {comment.content}
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
      <div className="post_details_suggested_posts">
        <h3>Suggested Posts</h3>
        {randomPosts != null && randomPosts.length > 0 ? (
          randomPosts.map((post, index) => (
            <button
              onClick={(event) => moveToNewPostDetails(event, post.id)}
              className="suggested_post"
              key={index}
            >
              <h5>
                {moment
                  .utc(post.created_at)
                  .local()
                  .startOf("seconds")
                  .fromNow()}
              </h5>
              <p className="suggested_post_title">{post.title}</p>
            </button>
          ))
        ) : (
          <p>No suggested posts</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;