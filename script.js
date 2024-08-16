const accessKey = "z3gZRFuRcQUFB_KNR7WTF3NAGsQjqUZ2-6XfwRmR-tk";

const searchForm = document.getElementById("sh-fm");
const searchBox = document.getElementById("sh-bx");
const searchResult = document.getElementById("sh-res");
const showMoreBtn = document.getElementById("sw-mr-btn");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
try
{

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    results.map((result)=>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })

    if (data.total_pages > page) {
        showMoreBtn.style.display = "block";
    } else {
        showMoreBtn.style.display = "none";
    }
}
    catch (error) {
        console.error("Error fetching images:", error);
    }
    
}
searchForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    page=1;
    searchImages();
});

showMoreBtn.addEventListener("click",()=>{
    page++;
    searchImages();
})
