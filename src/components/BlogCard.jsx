import { formatDistance } from "date-fns";

const BlogCard = ({ title, description, createdAt, author, url, imageUrl }) => {
  return (
    <a
      className="flex flex-col sm:flex-row items-center gap-4 p-[2%] bg-gray-300 text-black rounded-md shadow-md w-[70%] mx-auto cursor-pointer"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={imageUrl}
        alt={author || "Author"}
        className="object-cover rounded-md w-full sm:w-1/3 h-40"
      />
      <div className="flex flex-col justify-between w-full sm:w-2/3">
        <div className="flex justify-between text-xs text-gray-600">
          <p>{author ? `By ${author}` : "By Unknown Author"}</p>
          <p>{formatDistance(createdAt, new Date(), { addSuffix: true })}</p>
        </div>
        <h2 className="text-lg font-bold text-black">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </a>
  );
};

export default BlogCard;
