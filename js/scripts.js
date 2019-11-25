// Universitätsbibliothek Öffnungszeiten
// Öffnungszeiten:
// Sonntag	Geschlossen
// Montag	09:00–18:00
// Dienstag	09:00–18:00
// Mittwoch	09:00–18:00
// Donnerstag	09:00–18:00
// Freitag	09:00–17:00
// Samstag	09:00–15:00
openingHours = [
  ["Sunday"],
  ["Monday", 9.00, 18.00],
  ["Tuesday", 9.00, 18.00],
  ["Wednesday", 9.00, 18.00],
  ["Thursday", 9.00, 18.00],
  ["Friday", 9.00, 17.00],
  ["Saturday", 9.00, 15.00],
]

function startTime() {
  var today = new Date(); // example new Date('November 25, 2019 09:35:32');
  var d = today.getDay(); // 0=Sunday, 1=Monday
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;

  var openingInfo; // Time info depending on current time and opening hours
  var isOpen; // Status based on opening hours (close/open)
  var day = openingHours[d]; // Current day
  var ts = h + "." + m; // Current timestamp

  openingInfo = day[2] - ts;

  if (ts > day[1] && ts < day[2]) {
    isOpen = true;
    openingInfo = day[2];

  }
   else {
    isOpen = false;
    document.getElementById('seadsFree').innerHTML = "-";
    document.getElementById('seadsInfo').style.color = "red";
    if (d == 6) { // get opening hours of next day
      openingInfo = "übermorgen um " + openingHours[1][1];
    } else {
      openingInfo = "morgen um " + openingHours[++d][1];
    }
  }

  checkOpeningHours(isOpen, openingInfo); // Update Status
  var t = setTimeout(startTime, 500);

}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function checkOpeningHours(isOpen, openingInfo) {


  document.getElementById('openingStatus').innerHTML = (isOpen ? "noch bis " + openingInfo + " Uhr geöffnet" : "geschlossen! Öffnet " + openingInfo + " Uhr");

}


function chooseRoom(room) {
  for (var i=1; i < 5;i++) {
    document.getElementById("room" + i).style.borderColor = "black";
  }
  room.style.borderColor = "orange";
  if (room.id == "room1") {
    document.getElementById("viewRoom1").style.display = "";
    document.getElementById("viewRoom2").style.display = "none";
    document.getElementById("viewRoom1").scrollIntoView({block: 'start', behavior: 'smooth'});
  } else {
    document.getElementById("viewRoom1").style.display = "none";
    document.getElementById("viewRoom2").style.display = "";
    document.getElementById("viewRoom2").scrollIntoView({block: 'start', behavior: 'smooth'});
  }

}

function handleSeatInfo(seatInfoEle) {
  seadId = seatInfoEle.id.split("seat")[1];
  document.getElementById("seatPopup" + seadId).style.display = "inline-block";
}

function hideSeatInfo(seatInfoEle){
  seadId = seatInfoEle.id.split("seatPopup1")[1];
  seatInfoEle.style.display = "none";

}

// Taken from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
