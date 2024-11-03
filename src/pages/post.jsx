// render post as markdown
import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import MarkdownRenderer from "../components/MarkdownRender";
import Loading from "../components/LoadingView/Loading";
import Error from "../components/ErrorView/ErrorPage";

import endpoints from "../constants/endpoints";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${endpoints.getPostBySlug(slug)}`);
        setPost(response.data);
      } catch (err) {
        // console.log(Object.keys(err));
        setError(err);
      } finally {
        // setTimeout(() => {
        //   setLoading(false);
        // }, 30000);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <Loading />;
  if (error && error.response) {
    return (
      <Error
        msg={error.response.data}
        status={error.response.status}
        statusText={error.response.statusText}
      />
    );
  }
  if (!post) return <Error msg={"There is no such post"} />;

  return (
    <div>
      <MarkdownRenderer markdown={post.content}></MarkdownRenderer>
    </div>
  );
};

export default Post;
