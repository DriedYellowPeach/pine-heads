// import {
//   BrowserRouter as Router,
//   ScrollRestoration,
// } from "react-router-dom";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/blog";
import Post from "./pages/post";
import Note from "./pages/note";
import Me from "./pages/me";
import Project from "./pages/project";
import NotFoundWrapper from "./pages/NotFoundWarpper";

import Error from "./components/ErrorView/ErrorPage";
import Loading from "./components/LoadingView/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="App">
        <Navbar />
        <ScrollRestoration />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      { index: true, element: <Me /> },
      { path: "blogs", element: <Blog /> },
      { path: "notes", element: <Note /> },
      { path: "projects", element: <Project /> },
      { path: "me", element: <Me /> },
      { path: "posts/:slug", element: <Post /> },
      {
        path: "internal_error",
        element: <Error msg="Don't panic, this error is intentional" />,
      },
      { path: "loading", element: <Loading /> },
      { path: "loading2", element: <Loading delay={10000} /> },
      { path: "*", element: <NotFoundWrapper /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <ScrollRestoration />
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Me />} />
//           <Route path="/blogs" element={<Blog />} />
//           <Route path="/notes" element={<Note />} />
//           <Route path="/projects" element={<Project />} />
//           <Route path="/me" element={<Me />} />
//           <Route path="/posts/:slug" element={<Post />} />
//           {/* Path Below is for test */}
//           <Route
//             path="/internal_error"
//             element={<Error msg={"Don't panic, this error is intentional"} />}
//           />
//           <Route path="/loading" element={<Loading />} />
//           <Route path="*" element={<NotFoundWrapper />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }
//
// export default App;
