import React from "react";
import BlogPostDetails from "../Components/BlogPostDetails";
import BlogPostList from "../Components/BlogPostList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BlogProvider } from "../Context/blogContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogPostList />,
    // loader: ,
    children: [
      {
        path: "post/:id",
        element: <BlogPostDetails />,
        // loader: ,
      },
    ],
  },
]);
const AllRoutes = () => {
  return (
    <BlogProvider>
      <RouterProvider router={router} />
    </BlogProvider>
  );
};

export default AllRoutes;
