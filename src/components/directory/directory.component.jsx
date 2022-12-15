import { CategoriesContainer } from "./directory.styles.jsx";
import DirectoryItem from "../directory-item/directory-item.component";

const Directory = () => {
  const categories = [
    {
      id: 1,
      title: "Chapeaux",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      route: "shop/chapeaux",
    },
    {
      id: 2,
      title: "Vestes",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      route: "shop/vestes",
    },
    {
      id: 3,
      title: "Sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      route: "shop/sneakers",
    },
    {
      id: 4,
      title: "Femmes",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      route: "shop/femmes",
    },
    {
      id: 5,
      title: "Hommes",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      route: "shop/hommes",
    },
  ];
  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </CategoriesContainer>
  );
};

export default Directory;
