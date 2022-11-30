import Directory from "./components/directory/directory.component";

const App = () => {
  const categories = [
    {
      id: 1,
      title: "Casquettes",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: "Vestes",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: "Sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: "Femmes",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: 5,
      title: "Hommes",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    },
  ];
  return <Directory categories={categories} />;
};

export default App;
