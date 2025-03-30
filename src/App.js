import axios from "axios";
import { PiSpinner } from "react-icons/pi";
import { useEffect, useState } from "react";
import BlogCard from "./components/BlogCard";
import { LiaSearchSolid } from "react-icons/lia";

const category = [
  { name: "All", value: null },
  { name: "Business Portal", value: "business" },
  { name: "Entertainment", value: "entertainment" },
  { name: "General", value: "general" },
  { name: "Healthcare", value: "health" },
  { name: "Science and Innovation", value: "science" },
  { name: "Sports and Games", value: "sports" },
  { name: "Technology", value: "technology" },
];

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [categoryValue, setCategoryValue] = useState(null);

  const TextUrl = `https://newsapi.org/v2/top-headlines?q=${text}&apiKey=ff1bf1f874d34341ac9b9c1801f3a655`;
  const Url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=ff1bf1f874d34341ac9b9c1801f3a655`;
  const CategoryUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${categoryValue}&apiKey=ff1bf1f874d34341ac9b9c1801f3a655`;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        let response;
        if (text !== "") {
          response = await axios.get(TextUrl);
        } else if (categoryValue) {
          response = await axios.get(CategoryUrl);
        } else {
          response = await axios.get(Url);
        }
        setBlogs(response.data.articles);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [text, TextUrl, Url, categoryValue, CategoryUrl]);

  return (
    <div className="flex flex-col w-screen min-h-screen bg-white">
      <nav className="flex items-center justify-between p-4 w-full bg-black">
        <p className="text-gray-50 uppercase font-bold text-3xl text-center text-3xl">Blog</p>
        <div className="bg-white rounded-md p-1 flex items-center">
          <LiaSearchSolid className="size-4 mr-2" />
          <input
            type="text"
            className="bg-white border-none focus:outline-0 focus:ring-transparent w-[250px]"
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={() => setText(value)}
            className="bg-neutral-800 text-neutral-50 px-2 py-1 rounded-md text-sm"
          >
            Search
          </button>
        </div>
      </nav>
      <div className="flex flex-wrap w-full justify-center">
  {category.map((c, i) => (
    <button
      key={i}
      className={`bg-gray-200 text-gray-600 px-4 py-2 m-2 rounded-md ${
        categoryValue === c.value ? "bg-gray-600 text-white" : ""
      }`}
      onClick={() => {
        setCategoryValue(c.value);
      }}
    >
      {c.name}
    </button>
  ))}
</div>
      {loading && (
        <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-gray-100">
          <PiSpinner className="animate-spin text-gray-600" size={40} />
        </div>
      )}
      {blogs.length === 0 && (
        <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-gray-100">
          <p className="text-gray-600">No blogs found</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 p-6">
        {blogs.map((b, i) => (
          <BlogCard
            key={i}
            title={b.title}
            description={b.description}
            createdAt={b.publishedAt}
            author={b.author}
            url={b.url}
            imageUrl={b.urlToImage}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
