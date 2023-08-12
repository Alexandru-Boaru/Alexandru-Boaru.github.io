
window.addEventListener("load", loadPage)
//document.addEventListener("click", loadPage)
let globalSubImages = [];
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
        var pageVideo = document.getElementById("pageVideo");
        var pageLink = document.getElementById("pageLink");
        var pageImage = document.getElementById("pageImage");
        var pageSubimages = document.getElementById("pageSubimages");
        
        //CHANGE THIS NUMBER TO DISPLAY PROJECTS
        var numOfProjects = 8;

        //console.log(data[Number(a[0])-1].title);
        //console.log(pageTitle.innerHTML);
        if(Number(a[0]) < 1 || Number(a[0]) > numOfProjects)
        {
            window.location = path.split("/")[0] + "index.html";
            return;
        }
        pageTitle.innerHTML = data[Number(a[0])-1].title;
        pageDate.innerHTML = data[Number(a[0])-1].date;
        pageDescription.innerHTML = data[Number(a[0])-1].description.replace(/(?:\r\n|\r|\n)/g, '');
        pageVideo.href = data[Number(a[0]-1)].video;
        pageLink.href = data[Number(a[0])-1].link;
        
        pageImage.src = data[Number(a[0])-1].titleImage;
        pageSubimages.innerHTML = "";

        globalSubImages = data[Number(a[0])-1].subImages;

        for(let i = 0; i < data[Number(a[0])-1].subImages.length; i++)
        {
            //console.log(`<div class="col-2"><span class="image fit"><img class="myImg" src="${data[Number(a[0])-1].subImages[i]}" alt="${i}" onclick="displayModal(this)"></span></div>`);
            pageSubimages.insertAdjacentHTML("beforeend", `<div class="col-2"><span class="image fit"><img class="myImg" src="${data[Number(a[0])-1].subImages[i]}" alt="${i}" onclick="displayModal(this)"></span></div>`)
        }
        console.log(data[Number(a[0])-1].video);
        if(data[Number(a[0])-1].video !== undefined)
        {
            pageVideo.innerHTML = "Link to Video";
        }

        if(data[Number(a[0])-1].link != "")
        {
            pageLink.innerHTML = "Link to Project Page";
        }

    }
}
