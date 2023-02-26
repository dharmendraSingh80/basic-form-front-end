import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { createUser, getUsers } from "./functions";

export const url = process.env.REACT_APP_BASE_URL;

function App() {
  const [item, setItem] = useState({
    name: "",
    image: "",
    password: "",
    email: "",
  });
  const [items, setItems] = useState([]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let mimeType = item.image.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    // console.log(mimeType);
    if (mimeType == "image/jpeg" || "image/jpg" || "image/png") {
      const result = await createUser(item);
      setItems([...items, result]);
    }
    return;
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await getUsers();
      // console.log("fetch data;m", result);
      setItems(result);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="title">
        <h1>Basic Form</h1>
      </div>
      <div className="container">
        {/* <pre>{JSON.stringify(item, null, "\t")}</pre> */}
        <form action="" onSubmit={onSubmitHandler}>
          <label className="label" for="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="inputBox"
            placeholder="Enter your name"
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          />
          <label className="label" for="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="inputBox"
            placeholder="Enter your email"
            onChange={(e) => setItem({ ...item, email: e.target.value })}
          />
          <label className="label" for="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="inputBox"
            placeholder="Enter your password"
            onChange={(e) => setItem({ ...item, password: e.target.value })}
          />
          <label className="label" for="profile">
            Display Profile
          </label>
          <div className="inputBox">
            <FileBase64
              type="file"
              id="profile"
              multiple={false}
              onDone={({ base64 }) => setItem({ ...item, image: base64 })}
            />
          </div>

          <button className="appButton">submit</button>
        </form>
        <div>
          {items?.map((item) => (
            <div className="content" key={item._id}>
              <div className="image">
                <img className="activator" src={item.image} />
              </div>
              <div className="desc">
                <span className="name">Name : {item.name}</span>
                <span className="email">Email : {item.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
