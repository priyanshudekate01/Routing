import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  NavLink,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <div className="post-container">
        {posts.map((post) => (
          <NavLink
            className="post-titles"
            style={{ display: "block" }}
            to={`/post/${post.id}`}
          >
            {post.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

const Setting = () => {
  return (
    <div>
      <h1>Setting Page</h1>
    </div>
  );
};

const SayUser = () => {
  const params = useParams();

  return (
    <div>
      <h1>Your name is {params.userId} </h1>
    </div>
  );
};

const PostPage = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`).then(
      (data) => data.json().then((data) => setData(data))
    );
  }, []);

  if (data === null) {
    return <h1>Loding...</h1>;
  }
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
};
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Dynamic Routing */}
        <Route path="/user/:userId" element={<SayUser />} />
        <Route path="post/:postId" element={<PostPage />} />

        {/* nested Routing */}
        <Route path="accounts">
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
