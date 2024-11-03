export const API_URL = process.env.REACT_APP_API_URL;

const endpoints = {
  getPosts: `${API_URL}/posts`,
  getPostById: (id) => `${API_URL}/posts/${id}`,
  getPostBySlug: (slug) => `${API_URL}/posts/slug/${slug}`,
  getPostsCount: `${API_URL}/posts/count`,
  createPost: `${API_URL}/posts`,
};

export default endpoints;
