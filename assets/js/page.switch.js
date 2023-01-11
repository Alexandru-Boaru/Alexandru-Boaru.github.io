
window.addEventListener("load", loadPage)
//document.addEventListener("click", loadPage)
function loadPage()
{
    var queryString = location.search.substring(1);
    var a = queryString.split("|");

    var path = window.location.pathname;
    var page = path.split("/").pop();
    if(page != "generic.html")
        return;
    if(a.length > 0){
        var pageTitle = document.getElementById("pageTitle");
        var pageDate = document.getElementById("pageDate");
        var pageDescription = document.getElementById("pageDescription");
        var pageLink = document.getElementById("pageLink");
        var pageImage = document.getElementById("pageImage");
        var pageSubimages = document.getElementById("pageSubimages");
        
        //console.log(data[Number(a[0])-1].title);
        //console.log(pageTitle.innerHTML);
        if(Number(a[0]) < 1 || a[0] > 6)
        {
            window.location = path.split("/")[0] + "index.html";
            return;
        }
        pageTitle.innerHTML = data[Number(a[0])-1].title;
        pageDate.innerHTML = data[Number(a[0])-1].date;
        pageDescription.innerHTML = data[Number(a[0])-1].description.replace(/(?:\r\n|\r|\n)/g, '');
        pageLink.href = data[Number(a[0])-1].link;
        
        pageImage.src = data[Number(a[0])-1].titleImage;
        pageSubimages.innerHTML = "";

        for(let i = 0; i < data[Number(a[0])-1].subImages.length; i++)
        {
            //console.log(`<div class="col-2"><span class="image fit"><img class="myImg" src="${data[Number(a[0])-1].subImages[i]}" alt="${i}" onclick="displayModal(this)"></span></div>`);
            pageSubimages.insertAdjacentHTML("beforeend", `<div class="col-2"><span class="image fit"><img class="myImg" src="${data[Number(a[0])-1].subImages[i]}" alt="${i}" onclick="displayModal(this)"></span></div>`)
        }

    }
}
