const App = () => {
  const categories = [
    {
      id: 1,
      title: "Casquettes",
    },
    {
      id: 2,
      title: "Vestes",
    },
    {
      id: 3,
      title: "Sneakers",
    },
    {
      id: 4,
      title: "Femmes",
    },
    {
      id: 5,
      title: "Hommes",
    },
  ];
  return (
    <div className="categories-container">
      {categories.map(({ title, id }) => (
        <div className="category-container" key={id}>
          <div className="background-image">
            <div className="category-body-container">
              <h2>{title}</h2>
              <p>Achetez maintenant</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
