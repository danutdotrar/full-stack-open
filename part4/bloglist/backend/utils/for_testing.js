const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    if (blogs.length == 1) {
        const result = blogs[0].likes;
        return result;
    }

    if (blogs.length > 1) {
        const likes = blogs.map((blog) => blog.likes);

        return likes.reduce((acc, val) => acc + val, 0);
    }
};

const favoriteBlog = (blogs) => {
    // find the blog with the maximum number of likes
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes));

    // find the object with the same number of likes as maxLikes
    const favoriteObject = blogs.find((blog) => blog.likes === maxLikes);

    return favoriteObject;
};

module.exports = { dummy, totalLikes, favoriteBlog };
