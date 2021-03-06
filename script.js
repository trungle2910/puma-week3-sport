let baseUrl = `https://www.thesportsdb.com/api/v1/json/1/`;
let lastUrl = "eventspastleague.php?id=4328";

const getData = async () => {
  try {
    document.getElementById(
      "viewContent"
    ).innerHTML = `<div class="spinner-border text-success" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-border text-warning" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only"></span>
    </div>
    <h1>L o a d i n g...</h1>`;
    let data = await fetch(`${baseUrl}${lastUrl}`);
    let res = await data.json();
    // console.log(lastUrl);
    // console.log(res.teams);
    renderFirstData(res);
    renderSearchPlayer(res);
    renderSearchTeam(res);
    // renderViewTeam(res);
  } catch (error) {
    console.log(error);
  }
};

const goHome = () => {
  lastUrl = `eventspastleague.php?id=4328`;
  return getData();
};
const renderFirstData = async (res) => {
  let data = res.events
    .map((item) => {
      return ` <div class="col-xs-12 col-sm-6 col-md-4">
        <div
          class="image-flip"
          ontouchstart="this.classList.toggle('hover');"
        >
          <div class="mainflip">
            <div class="frontside">
              <div class="card">
                <div class="card-body text-center">
                <img src=${item.strThumb} class="card-img" alt="...">
                <h5 class="card-title">${item.strEvent}</h5>
                <P>${item.strSport} Tournament </P>
                <P> The ${item.strLeague} (${item.strSeason})</P>
                </div>
                </div>
                </div>
                <div class="backside">
                <div class="card">
                <div class="card-body text-center mt-4">
                <p>${item.dateEventLocal}</p>
                <p>Start at ${item.strTimeLocal}</p>
           <p>Organize in ${item.strCountry} in ${item.strVenue} </p>
           <p>${item.strStatus}</p>
           <p>Result: ${item.strHomeTeam} ${item.intHomeScore} : ${item.intAwayScore} ${item.strAwayTeam}  </p>
            <br>
            <br>
           </div>
           </div>
           </div>
           </div>
           </div>
           </div>`;
    })
    .join("");
  document.getElementById("viewContent").innerHTML = data;
};
let form = document.getElementById("search-input");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

const handleSearchPlayersClick = () => {
  let namePlayer = document.getElementById("search-input").value;
  // console.log(namePlayer);
  lastUrl = `searchplayers.php?p=${namePlayer}`;
  getData();
};

const handleSearchTeamClick = () => {
  let nameTeam = document.getElementById("search-input").value;
  lastUrl = `searchteams.php?t=${nameTeam}`;
  getData();
};

const renderSearchPlayer = async (data) => {
  const getDataPlayer = data.player
    .map((item) => {
      return `
          <div class="card mb-3" style="max-width: 440px;margin-left: 15px;">
          <div class="row no-gutters">
          <div class="col-md-4">
        <img src=${item.strThumb} class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
          <h5 class="card-title">${item.strPlayer} </h5>   
          <h6>${item.strGender}
          <i class="fas fa-check"></i></h6> 
          <p> Come from ${item.strNationality}</p>
        <p>Debut Date: ${item.intFormedYear}</p>
        <p>Now Playing ${item.strSport}</p>
        <button type="button" class=""btn btn-outline-secondary "" data-toggle="modal" data-target=".bd-example-modal-lg">More Info</button>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
           
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src=${item.strRender} class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src=${item.strCutout} class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src=${item.strThumb} class="d-block w-100" alt="...">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
            <div >
              <h5 class="card-title">${item.strPlayer} </h5>   
              <h6>${item.strGender}
              <i class="fas fa-check"></i></h6> 
              <p> Come from ${item.strNationality}</p>
              <p>was Born in ${item.dateBorn} in ${item.strBirthLocations} Height:${item.strHeight} Weight:${item.strWeight}</p>
              <p>now play for ${item.strTeam}</p>
              <p>Debut Date: ${item.intFormedYear}</p>
              <p>Now Playing ${item.strSport}</p>
              <p></p>
            </div>
            <div>${item.strDescriptionEN}</div>
            <br>
          </div>
            </div>
          </div>
        </div>
            </div>
          </div>
        </div>
        </div>`;
    })
    .join("");
  document.getElementById("viewContent").innerHTML = getDataPlayer;
};

const renderSearchTeam = async (data) => {
  const getTeamData = data.teams
    .map((item) => {
      return `
 <div class="card mb-3" style="max-width: 440px;margin-left: 15px;
 ">
 <div class="row no-gutters">
 <div class="col-md-4">
     <img src=${item.strTeamBadge} class="card-img" alt="...">
     </div>
     <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title">${
        item.strAlternate == "" ? item.strTeam : item.strAlternate
      }</h5>    
      <p>${
        !item.strTeamShort
          ? "this team don't have team short name "
          : item.strTeamShort
      }</p>
     <p>Debut Date: ${item.intFormedYear}</p>
     <p>Now Playing ${item.strSport}</p>
        <p>${item.strStadium}</p> 
        <button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target=".bd-example-modal-lg">More Info</button>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
         
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src=${item.strTeamBadge} class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src=${item.strTeamJersey} class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src=${item.strTeamLogo} class="d-block w-100" alt="...">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
          <div >
            <h5 class="card-title">${item.strTeam} (${
        item.strTeamShort
      }) </h5>   
            <h6>Debut Date: ${item.intFormedYear} in ${
        item.strCountry
      } and play ${item.strSport} </h6> 
            <div>
            <div>
            <div>${item.strStadium}</div>
            <img src=${item.strStadiumThumb} style="width: 500px">
            <p>${item.strStadiumDescription}</p>
            </div>
            <p></p>
          </div>
          <div>${item.strDescriptionEN}</div>
          <br>
        </div>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
     </div>
    </div>`;
    })
    .join("");
  document.getElementById("viewContent").innerHTML = getTeamData;
};
// const moreInfo = (idPlayer) =>{
//   lastUrl = `lookupteam.php?id=${idPlayer}`
//   getData()
// }
getData();
