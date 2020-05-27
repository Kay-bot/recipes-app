const list = document.querySelector(".list");
const form = document.querySelector("#myForm");

const addRecipe = (recipe, id) => {
  let time = recipe.created_at.toDate();
  let now = new Date();
  const timeCreated = dateFns.distanceInWords(now, time, { addSuffix: true });
  let html = `
  <div class="col-12 col-lg-4 px-2">
    <div class="li my-2 px-2 py-2 border bg-light" data-id="${id}">
        <div>Recipe name:${recipe.title}</div>
        <div>Created at:${timeCreated}</div>
        <div>Author: ${recipe.author}</div>
        <button class="btn btn-danger btn-sm my-2">delete</button>
    </div>
</div>`;

  list.innerHTML += html;
};

const deleteRecipe = (id) => {
  const recipes = document.querySelectorAll(".li");
  recipes.forEach((recipe) => {
    if (recipe.getAttribute("data-id") === id) {
      recipe.remove();
    }
  });
};

//get document real time
db.collection("recipes").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const doc = change.doc;
    if (change.type === "added") {
      addRecipe(doc.data(), doc.id);
    } else if (change.type === "removed") {
      deleteRecipe(doc.id);
    }
  });
});

//add documents
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const now = new Date();
  const author = "anonymous";
  const recipe = {
    title: form.recipe.value.trim(),
    author: author,
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };
  db.collection("recipes")
    .add(recipe)
    .then(() => {
      console.log("recipe added");
    })
    .catch((err) => {
      console.log(err);
    });
  form.reset();
});

// deleting data
list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.parentElement.getAttribute("data-id");
    db.collection("recipes")
      .doc(id)
      .delete()
      .then(() => {
        console.log("recipe deleted");
      });
  }
});
