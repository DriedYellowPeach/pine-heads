// render post as markdown
import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import MarkdownRenderer from "../components/markdown/MarkdownRender";
import Error from "../components/ErrorView/ErrorPage";
import LoadingWrapper from "../components/LoadingView/LoadingWrapper";

import endpoints from "../constants/endpoints";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${endpoints.getPostBySlug(slug)}`);
        setPost(response.data);
      } catch (err) {
        setError(err);
      } finally {
        // setTimeout(() => {
        //   setLoading(false);
        // }, 200);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (error && error.response) {
    return (
      <Error
        msg={error.response.data}
        status={error.response.status}
        statusText={error.response.statusText}
      />
    );
  }

  // TEST:
  // PRESET: 1 150 8000, will enter stage 0 - 2: enter directly, no flash, this is the most common situation
  // PRESET: 9000 8000 8000, will enter stage 0 - 1 - 2: and stay in each very long
  // PRODUCTION: 0 150 300, the most natural way
  return (
    <LoadingWrapper isLoading={loading} threshold={150} minDisplayTime={300}>
      <div>
        <MarkdownRenderer
          markdown={post.content}
          slug={post.slug}
          title={post.title}
        ></MarkdownRenderer>
      </div>
    </LoadingWrapper>
  );
};

export default Post;
