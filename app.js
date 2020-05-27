const list = document.querySelector("ul");
const form = document.querySelector("form");

const addRecipe = (recipe) => {
  let time = recipe.created_at.toDate();
  let html = `
    <li>
        <div>${recipe.title}</div>
        <div>${time}</div>
    </li>`;

  list.innerHTML += html;
};

db.collection("recipes")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      addRecipe(doc.data());
    });
  })
  .catch((err) => {
    console.log(err);
  });

//add documents
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const now = new Date();
});
