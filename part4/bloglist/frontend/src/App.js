import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import { FormInput } from "./components/Form";

const App = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [likes, setLikes] = useState("");
    const [blog, setBlogList] = useState([]);

    // Access the RESTful API created with NodeJS and Express
    useEffect(() => {
        blogService.getAll().then((response) => setBlogList(response.data));
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
            setBlogList(blog.concat(response.data));

            setTitle("");
            setAuthor("");
            setUrl("");
            setLikes("");
        });
    };

    return (
        <>
            <h1>Bloglist</h1>

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

            <h1>Saved Blogs</h1>

            <div>
                {blog.map((item) => {
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
