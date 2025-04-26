import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card";
import { supabase } from "../client";

const HomeFeed = () => {
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("Posts")
        .select()
        .order("created_at", { ascending: true });

      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPostsByNewest = async () => {
    const { data } = await supabase
      .from("Posts")
      .select()
      .order("created_at", { ascending: false });

    setPosts(data);
  };

  const filterPostsByMostUpvotes = async () => {
    const { data } = await supabase
      .from("Posts")
      .select()
      .order("upvotes", { ascending: false });

    setPosts(data);
  };

  const updateUpvotes = async (postData) => {
    // copy the posts so we can update it
    let newArr = [...posts];
    // find the index of the postData so we can update the specific post
    let index = posts.findIndex(checkPosts);
    if (index != -1) {
      // update postData's upvotes
      newArr[index]["upvotes"] = postData.upvotes + 1;
      event.preventDefault();

      // send updated data to database
      await supabase
        .from("Posts")
        .update({ upvotes: newArr[index]["upvotes"] })
        .eq("id", postData.id);

      // locally update the posts to the array
      setPosts(newArr);
    }

    function checkPosts(post) {
      return post.id == postData.id;
    }
  };

  return (
    <div className="homefeed_container">
      <div className="filters">
        <div className="search_bar_container">
          <input
            className="search_bar"
            type="text"
            placeholder="Search by title"
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <div className="btn_filter_container">
          <span>Sort by: </span>
          <button className="btn_filter" onClick={filterPostsByNewest}>
            Time
          </button>
          <button className="btn_filter" onClick={filterPostsByMostUpvotes}>
            Most Upvotes
          </button>
        </div>
      </div>
      {posts != null && posts.length > 0 ? (
        // filter out the data based on the search input
        posts
          .filter((val) => {
            if (searchInput == "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              return val;
            }
            // map the resulting entries from the search
          })
          .map((post, index) => (
            <div key={index}>
              <Card postData={post} updateUpvotes={updateUpvotes} />
            </div>
          ))
      ) : (
        <div>
          <p className="post_title">No Posts Created Yet!</p>
          <Link to="/createPost">
            <button>Create one Here 🥚</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeFeed;