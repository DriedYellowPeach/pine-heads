import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/blog.css";
import endpoints from "../constants/endpoints";
import config from "../constants/config";
import LoadingWrapper from "../components/LoadingView/LoadingWrapper";
import Error from "../components/ErrorView/ErrorPage";

function formatDate(dateStr) {
  const [month, day] = dateStr.split(" ");
  const formattedDay = day.padStart(2, "0");
  return `${month} ${formattedDay}`;
}

function convertPostsData(data) {
  const groupedPosts = {};

  // Group posts by year
  data.forEach((post) => {
    const postDate = new Date(post.date);
    const year = postDate.getUTCFullYear();
    const formattedDate = formatDate(
      postDate.toLocaleString("en-US", { month: "short", day: "numeric" }),
    );

    // Initialize the year in the grouped object if it doesn't exist
    if (!groupedPosts[year]) {
      groupedPosts[year] = [];
    }

    // Push the formatted post to the year group
    groupedPosts[year].push({
      title: post.title,
      date: formattedDate,
      slug: post.slug,
      id: post.id,
    });
  });

  // Convert the grouped object to the desired array format
  return Object.keys(groupedPosts)
    .map((year) => ({
      year: parseInt(year), // Convert year back to number
      posts: groupedPosts[year],
    }))
    .sort((a, b) => b.year - a.year);
}

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [jumpPage, setJumpPage] = useState("");

  const handleJumpToPage = () => {
    const page = parseInt(jumpPage, 10);
    if (page > 0 && page <= pageCount) {
      setPage(page);
    } else {
      alert(`Please enter a page number between 1 and ${pageCount}`);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response1 = await axios.get(endpoints.getPostsCount);
        const count = response1.data.count;

        setPageCount(Math.ceil(count / config.pageSize));
        const response = await axios.get(
          `${endpoints.getPosts}?page=${page}&page_size=${config.pageSize}`,
        );
        const formattedPosts = convertPostsData(response.data);
        setPosts(formattedPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        // setTimeout(() => setLoading(false), 1000);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (error) return <Error />;

  return (
    <LoadingWrapper isLoading={loading} threshold={150} minDisplayTime={300}>
      <main>
        <div className="container">
          <div className="grid">
            <div className="blog-content">
              <header className="intro">
                <h1>Blog Posts</h1>
                <div className="intro-description">
                  <p>
                    To share challenges, dedication, insights, inspirations,
                    and, most importantly, the passions that drive me—in
                    programming and beyond.
                  </p>
                </div>
                <button className="button small">View All Tags</button>
              </header>

              {posts.map((yearGroup, index) => (
                <section key={index} className="segment">
                  <h2>{yearGroup.year}</h2>
                  <div className="posts">
                    {yearGroup.posts.map((post, idx) => (
                      <Link
                        to={`/posts/${post.slug}`}
                        className="post"
                        key={post.id}
                      >
                        <h3>{post.title}</h3>
                        <time>{post.date}</time>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}

              <div className="pagination">
                <button
                  className="button medium"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>

                <div className="jump-to-page">
                  <input
                    type="number"
                    min="1"
                    max={pageCount}
                    value={jumpPage}
                    placeholder={page}
                    onChange={(e) => setJumpPage(e.target.value)}
                  />
                  <button
                    id="goto"
                    className="button medium"
                    onClick={handleJumpToPage}
                  >
                    Go
                  </button>
                </div>

                <button
                  className="button medium"
                  onClick={() => setPage(page + 1)}
                  disabled={page === pageCount}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LoadingWrapper>
  );
}

export default Blog;
