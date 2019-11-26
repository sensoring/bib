// Universitätsbibliothek Öffnungszeiten
// Öffnungszeiten:
// Sonntag	Geschlossen
// Montag	09:00–18:00
// Dienstag	09:00–18:00
// Mittwoch	09:00–18:00
// Donnerstag	09:00–18:00
// Freitag	09:00–17:00
// Samstag	09:00–15:00
openingHours1 = [
  ["Sunday"],
  ["Monday", 7.00, 23.00],
  ["Tuesday", 7.00, 23.00],
  ["Wednesday", 7.00, 23.00],
  ["Thursday", 7.00, 23.00],
  ["Friday", 7.00, 23.00],
  ["Saturday", 8.00, 20.00],
];

openingHours2 = [
  ["Sunday"],
  ["Monday", 8.00, 22.00],
  ["Tuesday", 8.00, 22.00],
  ["Wednesday", 8.00, 22.00],
  ["Thursday", 8.00, 22.00],
  ["Friday", 8.00, 22.00],
  ["Saturday", 8.00, 22.00],
];

openingHours3 = [
  ["Sunday"],
  ["Monday", 7.00, 24.00],
  ["Tuesday", 7.00, 24.00],
  ["Wednesday", 7.00, 24.00],
  ["Thursday", 7.00, 24.00],
  ["Friday", 7.00, 24.00],
  ["Saturday", 8.00, 22.00],
];

openingHours4 = [
  ["Sunday"],
  ["Monday", 9.00, 18.00],
  ["Tuesday", 9.00, 18.00],
  ["Wednesday", 9.00, 18.00],
  ["Thursday", 9.00, 18.00],
  ["Friday", 9.00, 18.00],
  ["Saturday"],
]

function startTime() {
  var today = new Date(); // example new Date('November 25, 2019 09:35:32'); / 'December 24, 2019 09:35:32'  'January 04, 2020 09:35:32'  'January 08, 2020 23:35:32' 'February 14, 2020 09:35:32' 'February 14, 2020 19:35:32' 'February 15, 2020 19:35:32'
  var d = today.getDay(); // 0=Sunday, 1=Monday
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;

  var minDate1 = new Date('10/01/2019');
  var maxDate1 = new Date('12/22/2019');
  var minDate2 = new Date('12/23/2019');
  var maxDate2 = new Date('01/01/2020');
  var minDate3 = new Date('01/02/2020');
  var maxDate3 = new Date('01/06/2020');
  var minDate4 = new Date('01/07/2020');
  var maxDate4 = new Date('02/11/2020');
  var minDate5 = new Date('02/12/2020');
  var maxDate5 = new Date('03/14/2020');

  if (today > minDate1 && today < maxDate1) {
    openingHours = openingHours1;
  } else if (today > minDate2 && today < maxDate2) {
    openingInfo = "am 02.01.2020 um 8.00";
    isOpen = false;
    openingHours = false;
  } else if (today > minDate3 && today < maxDate3) {
    openingHours = openingHours2;
  } else if (today > minDate4 && today < maxDate4) {
    openingHours = openingHours3;
  } else if (today > minDate5 && today < maxDate5) {
    openingHours = openingHours4;
  } else {
    openingHours = openingHours1;
  }

  if (openingHours) {
    var openingInfo; // Time info depending on current time and opening hours
    var isOpen; // Status based on opening hours (close/open)
    var day = openingHours[d]; // Current day
    var ts = h + "." + m; // Current timestamp

    openingInfo = day[2] - ts;

    if (ts > day[1] && ts < day[2]) {
      isOpen = true;
      openingInfo = day[2];

    } else {
      isOpen = false;
      document.getElementById('seadsFree').innerHTML = "-";
      document.getElementById('seadsInfo').style.color = "red";
      if (d == 6) { // get opening hours of next day
        openingInfo = "Montag um " + openingHours[1][1];
      } else {
        if (d == 5 && today > minDate5) {
          openingInfo = "Montag um " + openingHours[1][1];
        } else {
          openingInfo = "morgen um " + openingHours[++d][1];
        }

      }
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
  for (var i=1; i < 3;i++) {
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
