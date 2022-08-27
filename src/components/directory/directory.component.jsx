import DirectoryItem from "../directory-item/directory-item.component";

import "./directory.styles.scss";

const categories = [
  {
    id: 1,
    title: "drones",
    imageUrl: "https://i.ibb.co/rdzqvRK/drones.jpg",
  },
  {
    id: 2,
    title: "gimbals",
    imageUrl: "https://i.ibb.co/1QbdfDz/gimbals.png",
    position: "top",
  },
  {
    id: 3,
    title: "tripods",
    imageUrl: "https://i.ibb.co/w4hZyt6/tripods.jpg",
    position: "top right",
  },
  {
    id: 4,
    title: "dslrs",
    imageUrl: "https://i.ibb.co/pXqGf1z/dslr.jpg",
    size: "large",
  },
  {
    id: 5,
    title: "mirrorless",
    imageUrl: "https://i.ibb.co/bvbrHh9/mirrorless.jpg",
    size: "large",
  },
];

const Directory = () => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
