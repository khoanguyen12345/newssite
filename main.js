let newsList=[]
let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0522218bbc7946e58e85fc62723b8faa` 
let pageSize = 20
const changeURL = (category)=>{
    if (category == null){
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0522218bbc7946e58e85fc62723b8faa`
    pageSize = 20;
    }else{
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=0522218bbc7946e58e85fc62723b8faa`
    pageSize = 20;
    }
    callApi()
}

const searchKeyWord= ()=>{
    let keyword = document.getElementById("searchBar").value
    if (keyword == null){
        url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0522218bbc7946e58e85fc62723b8faa`
        }else{
        url = `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=0522218bbc7946e58e85fc62723b8faa`
        }
        callApi()
}

const searchSource= ()=>{
    let source = document.getElementById("searchBar").value
    if (source == null){
        url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0522218bbc7946e58e85fc62723b8faa`
        }else{
        url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=0522218bbc7946e58e85fc62723b8faa`
        }
        callApi()
}

const callApi = async()=>{
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    if (newsList.length<pageSize || pageSize == 100){
        document.getElementById("loadMoreBtn").style.visibility = 'hidden';
    }else if (newsList.length<=20){
        document.getElementById("loadMoreBtn").style.visibility = 'visible';
    }
    render(newsList)
}

const loadMore = ()=>{
    let newurl = ""
    pageSize+=20
    let toRemove = pageSize-20
    if (toRemove ==20){
    url = url + "&pageSize=" + pageSize
    }else if (pageSize > 20 && pageSize<=100){
    url = url.replace(toRemove,pageSize)
    }
    callApi();
}


let calculateTime = (time)=>{
    let hourTime = time.slice(11,19)
    let dateTime = time.slice(0,10)
    var d = new Date();
    var hours = d.getHours();
    var minutes=d.getMinutes();
    var days = d.getDate();
    let timeArray = hourTime.split(":")
    let dayArray = dateTime.split("-")
    if (dayArray[2]-days == 0){
    if (timeArray[0]-hours == 0){
        if (timeArray[1]-minutes==0){
            return "a few seconds ago"
        }else if (timeArray[1]-minutes<0){
            return minutes-timeArray[1] + " minutes ago"
        }
    }else if (timeArray[0]-hours <0){
        return hours-timeArray[0] + " hours ago"
    }}else{
        return days - dayArray[2] + " day(s) ago"
    }
}

const render = (list)=>{
    let newsHTML = list.map(item=>{
        return `<div class="card" style="width: 18rem;">
        <img src="${item.urlToImage}" class="card-img-top" alt="No Image Because Google News Sucks">
        <div class="card-body">
          <a href="${item.url}" class="card-link">${item.title}</a>
          <p class="card-text">${item.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${item.author}</li>
          <li class="list-group-item">${item.source.name}</li>
          <li class="list-group-item">${calculateTime(item.publishedAt)}</li>
        </ul>
      </div>`
    })


    document.getElementById("newsListArea").innerHTML = newsHTML
}


window.onscroll = function() {followHeader()};
var header = document.getElementById("navBar");
var sticky = header.offsetTop;
function followHeader() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
callApi()