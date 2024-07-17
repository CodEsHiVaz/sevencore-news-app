import React, { useContext, useState } from "react";
import { BlogContext } from "../Context/blogContext";
import { isEven, timestampConversion } from "../utils/utils";
import "../App.css";
import { Input, Button, Row, Col, FormGroup, Label } from "reactstrap";
import { AiFillCalendar } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
const BlogPostList = () => {
  const { blogs, searchParams, setSearchParams, totalRes, loading } =
    useContext(BlogContext);
  const [tempParams, setTempParams] = useState(searchParams);
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchParams(tempParams);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempParams((prevParams) => ({ ...prevParams, [name]: value }));
  };
  const handlePageChange = (newPage) => {
    const newParams = { ...tempParams, page: newPage };
    setSearchParams(newParams);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <form onSubmit={handleSearch} className="px-4 pt-3">
        <Row className="m-0">
          <Col lg="4" md="6">
            <FormGroup>
              <Label>Search:</Label>
              <Input
                type="text"
                size={"sm"}
                name="q"
                value={tempParams.q}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            {" "}
            <FormGroup>
              <Label>Search In:</Label>
              <Input
                type="select"
                size={"sm"}
                name="searchIn"
                value={tempParams.searchIn}
                onChange={handleChange}
              >
                <option value="title">Title</option>
                <option value="description">Description</option>
                <option value="content">content</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            {" "}
            <FormGroup>
              <Label>Sources:</Label>
              <Input
                type="text"
                size={"sm"}
                name="sources"
                value={tempParams.sources}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label>Language:</Label>
              <Input
                type="select"
                size={"sm"}
                name="language"
                value={tempParams.language}
                onChange={handleChange}
              >
                <option value="ar">ar</option>
                <option value="de">de</option>
                <option value="en">en</option>
                <option value="es">es</option>
                <option value="fr">fr</option>
                <option value="he">he</option>
                <option value="it">it</option>
                <option value="nl">nl</option>
                <option value="no">no</option>
                <option value="pt">pt</option>
                <option value="ru">ru</option>
                <option value="sv">sv</option>
                <option value="ud">ud</option>
                <option value="zh">zh</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label>Domains:</Label>
              <Input
                type="text"
                size={"sm"}
                name="domains"
                value={tempParams.domains}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>

          <Col lg="4" md="6">
            <FormGroup>
              <Label>Exclude Domains:</Label>
              <Input
                type="text"
                size={"sm"}
                name="excludeDomains"
                value={tempParams.excludeDomains}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>

          <Col lg="4" md="6">
            <FormGroup>
              <Label>To Date:</Label>
              <Input
                type="date"
                size={"sm"}
                name="to"
                value={tempParams.to}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label>From Date:</Label>
              <Input
                type="date"
                size={"sm"}
                name="from"
                value={tempParams.from}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>

          <Col lg="4" md="6">
            <FormGroup>
              <Label>Sort By:</Label>
              <Input
                size={"sm"}
                name="sortBy"
                type="select"
                value={tempParams.sortBy}
                onChange={handleChange}
              >
                <option value="relevancy">Relevancy</option>
                <option value="popularity">Popularity</option>
                <option value="publishedAt">Published At</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label>Page Size:</Label>
              <Input
                type="select"
                size={"sm"}
                name="pageSize"
                value={tempParams.pageSize}
                onChange={handleChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={100}>100</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <div className="d-flex pt-1 flex-wrap justify-content-center align-items-center align-content-center text-center align-middle">
              <Button
                color="primary"
                className="mt-4   btn-primary"
                type="submit"
              >
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </form>
      <h4 className="px-4">Results found:{totalRes}</h4>
      <section>
        {loading ? (
          <div className="d-flex justify-content-center align-content-center align-items-center m-5 p-5">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="container">
            {blogs.map((blog, ind) => (
              <div
                key={blog.source.id + blog.publishedAt}
                className={
                  ind === 0
                    ? "row mb-5 border bg-light shadow rounded-3"
                    : "row my-5 border bg-light shadow rounded-3"
                }
              >
                <div
                  className={
                    isEven(ind)
                      ? "col-md-6 bg-img rounded-start-3 thumbnailImage"
                      : "col-md-6 order-2 bg-img rounded-end-3 thumbnailImage"
                  }
                  style={{
                    backgroundImage: `url(${
                      blog.urlToImage ??
                      "https://getlogovector.com/wp-content/uploads/2020/09/gulf-news-logo-vector.png"
                    })`,
                  }}
                ></div>
                <div className="col-md-6 align-self-center p-4 ">
                  <h3 className=""> {blog.title}</h3>
                  <p className="">
                    <div className="d-flex gap-3">
                      <div className="d-flex gap-1 justify-content-center align-content-center align-items-center">
                        <FaCircleUser /> {blog.author}
                      </div>
                      <div className="d-flex gap-1 justify-content-center align-content-center align-items-center">
                        <AiFillCalendar />
                        {timestampConversion(blog.publishedAt)}
                      </div>
                    </div>
                  </p>
                  <p>{blog.description}</p>
                  <a href="#" className="btn btn-outline-success btn-sm">
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="m-5 px-5">
        <div className="d-flex justify-content-end gap-2">
          <Button
            onClick={() => handlePageChange(searchParams.page - 1)}
            disabled={searchParams.page === 1}
          >
            Previous
          </Button>
          <Button
            outline
            className="d-flex justify-content-center align-content-center align-items-center"
          >
            {" "}
            {searchParams.page}
          </Button>
          <Button
            onClick={() => handlePageChange(searchParams.page + 1)}
            disabled={searchParams.page * searchParams.pageSize >= totalRes}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default BlogPostList;
