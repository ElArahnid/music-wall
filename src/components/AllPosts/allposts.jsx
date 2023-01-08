import { List } from "antd";
import Post from "../Post/post";

const AllPosts = ({ posts, selectByTags }) => {
  // console.log(posts);

  const handleClearTag = (value) => {
    return value.slice(0, 50).toLowerCase().replace(/\s/g, "");
  };

  if (!selectByTags) {
    const data = posts?.map((res, i) => ({
      avatar: res.author.avatar,
      authorName: res.author.name,
      title: res.title,
      text: res.text.slice(0, 100) + " >>",
      _id: res._id,
      image: res.image,
      likes: res.likes,
      comments: res.comments,
    }));
    return (
      <List
        dataSource={data}
        itemLayout="horizontal"
        size="default"
        grid={{ gutter: { xxl: 12 } }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        renderItem={(item) => (
          <>
            <Post key={item._id} likes={item.likes} {...item} />
          </>
        )}
      />
    );
  } else {

    let allTags = [];
    posts?.map((res) => {
      res.tags.map((tag) => {
        if (handleClearTag(tag) === selectByTags) {
          allTags = [...allTags, res];
        }
      });
    });

    const data = allTags?.map((res, i) => ({
      avatar: res.author.avatar,
      authorName: res.author.name,
      title: res.title,
      text: res.text.slice(0, 100) + " >>",
      _id: res._id,
      image: res.image,
      likes: res.likes,
      comments: res.comments,
    }));
    return (
      <List
        dataSource={data}
        itemLayout="horizontal"
        size="default"
        grid={{ gutter: { xxl: 12 } }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        renderItem={(item) => (
          <>
            <Post key={item._id} likes={item.likes} {...item} />
          </>
        )}
      />
    );
    
  }
};

export default AllPosts;
