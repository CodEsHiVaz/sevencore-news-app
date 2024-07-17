import React, { useState, useEffect, createContext } from "react";
import { buildQueryParams } from "../utils/utils";

export const BlogContext = createContext();

// Create the provider component
export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const [searchParams, setSearchParams] = useState({
    q: "india",
    searchIn: "title",
    sources: "",
    domains: "",
    excludeDomains: "",
    from: "",
    to: "",
    language: "",
    sortBy: "publishedAt",
    pageSize: 5,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [totalRes, setTotalRes] = useState(0);
  const getBlogs = async () => {
    setLoading(true);
    const url = process.env.REACT_APP_API_URL;
    const ApiKey = process.env.REACT_APP_API_KEY;
    const queryParams = buildQueryParams(searchParams);
    const response = await fetch(`${url}?${queryParams}&apiKey=${ApiKey}`);
    const data = await response.json();
    if (data.status === "ok") {
      setBlogs(data.articles);
      setTotalRes(data.totalResults);
      setLoading(false);
    } else {
      setBlogs([]);
      setTotalRes(0);

      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <BlogContext.Provider
      value={{ blogs, searchParams, setSearchParams, totalRes, loading }}
    >
      {children}
    </BlogContext.Provider>
  );
};
