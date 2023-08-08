import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { FormInput } from "./components/Form";
import Notification from "./components/Notification";
TODO: REMAKE 5a EXERCISES
const App = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [likes, setLikes] = useState("");
    const [blog, setBlogList] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Access the RESTful API created with NodeJS and Express
    useEffect(() => {
        blogService.getAll().then((response) => setBlogList(response));
    }, []);

    const handleTitleInput = (e) => {
        setTitle(e.target.value);
    };

    const handleAuthorInput = (e) => {
        setAuthor(e.target.value);
    };

    const handleUrlInput = (e) => {
        setUrl(e.target.value);
    };

    const handleLikesInput = (e) => {
        setLikes(e.target.value);
    };

    // Save blog object
    const saveBlogObject = (e) => {
        e.preventDefault();

        const blogObject = {
            title: title,
            author: author,
            url: url,
            likes: likes,
        };

        blogService.create(blogObject).then((response) => {
            setBlogList(blog.concat(response));

            setTitle("");
            setAuthor("");
            setUrl("");
            setLikes("");
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            blogService.setToken(user.token);

            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    const blogForm = () => (
        <form onSubmit={saveBlogObject}>
            <FormInput
                text={"title"}
                value={title}
                handler={handleTitleInput}
            />
            <FormInput
                text={"author"}
                value={author}
                handler={handleAuthorInput}
            />
            <FormInput text={"url"} value={url} handler={handleUrlInput} />
            <FormInput
                text={"likes"}
                value={likes}
                handler={handleLikesInput}
            />
            <button type="submit">Save Blog List</button>
        </form>
    );
    return (
        <>
            <h1>Bloglist</h1>

            <Notification message={errorMessage} />

            <h1>Blog Input Details</h1>

            {!user && loginForm()}
            {user && (
                <div>
                    <p>{user.name} logged in</p>
                    {blogForm()}
                </div>
            )}

            <h1>Saved Blogs</h1>
            <div>
                {blog.map((item) => {
                    console.log(item);
                    return (
                        <ul key={item.id}>
                            <li>Title: {item.title}</li>
                            <li>Author: {item.author}</li>
                            <li>Url: {item.url}</li>
                            <li>Likes: {item.likes}</li>
                        </ul>
                    );
                })}
            </div>
        </>
    );
};

export default App;
