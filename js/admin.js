const blogBtn = document.querySelector("#blog-button");
const blogPage = document.querySelector("#blog");
const datesBtn = document.querySelector("#dates-button");
const datesPage = document.querySelector("#dates");
const articleList = document.querySelector("#article-list");

const articles = [
    {
        ID: 0,
        image: "image",
        titre: "je suis sérieux",
        article: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad alias a, ducimus harum autem dolor. Quibusdam rem voluptas, eos consequuntur dolor esse perspiciatis eius id corporis atque, facilis, non maiores!"
    },
    {
        ID: 1,
        image: "image",
        titre: "je suis motivé",
        article: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad alias a, ducimus harum autem dolor. Quibusdam rem voluptas, eos consequuntur dolor esse perspiciatis eius id corporis atque, facilis, non maiores!"
    },
    {
        ID: 2,
        image: "image",
        titre: "embauchez moi la",
        article: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad alias a, ducimus harum autem dolor. Quibusdam rem voluptas, eos consequuntur dolor esse perspiciatis eius id corporis atque, facilis, non maiores!"
    }
]

blogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
});

datesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    datesPage.classList.add("dates-class");
    blogPage.classList.remove("blog-class");
})

window.onload = () => {
    let html = showArticles(articles);
    articleList.innerHTML += html;
};

function showArticles(articles){
    
   return articles.map(i => {
        return `
        <tr id="article">
                            <td>${i.ID}</td>
                            <td>${i.image}</td>
                            <td>${i.titre}</td>
                            <td>${i.article}</td>
                            <td><button class="button btn-outline-info p-1 mb-1">Edit</button><button class="button btn-outline-danger p-1">Delete</button></td>
                        </tr>
        `;
    }).join("");
};


var docRef = db.collection("users");

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});