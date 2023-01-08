import Post from "../Post/post";

const AllPosts = ({ posts, selectByTags }) => {

  const handleClearTag = (value) => {
    return ((value).slice(0, 50)).toLowerCase().replace(/\s/g, "")
  }

  if (!selectByTags) {
    return posts?.map((res) => (
      <Post key={res._id} {...res} />
      // if ((tag.slice(0, 50)).toLowerCase().replace(/\s/g, "").includes(selectByTags)) {
      //   console.log(res);
      // }
    ));
  } else {
    //  (res.slice(0, 50)).toLowerCase().replace(/\s/g, "").includes(selectByTags))
    // console.log(filtered);
    let allTags = [];
    posts?.map((res) => {
      res.tags.map((tag) => {
        if (handleClearTag(tag) === selectByTags) {
          allTags = [...allTags, res];
        }
      } )
      // console.log(allTags) 
    });
    return allTags.map((res) => (
      <Post key={res._id} {...res} />
    ))
  }
};

export default AllPosts;
