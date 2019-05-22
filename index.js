const stuDiv = document.getElementById("student");
var input = document.getElementById("inp");
var resObj;
var i;
var grades = "";
var burgerMenu = "";
var toggleList = "";
var toggleBtn = "";
var infoHtml = "";

// function contract() {
//   var x = document.getElementById("grades");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }

function listenName(resObj) {
  input.addEventListener("input", function(e) {
    console.log(input.value);

    var filtered = resObj.students.filter(
      d => d.firstName.includes(input.value) || d.lastName.includes(input.value)
    );

    var i = 0;
    var infoHtml = [];
    var total = 0;
    var n = 0;
    grades = "";

    filtered.forEach(f => {
      // add grades
      f.grades.forEach(g => {
        grades += `<p id="grades">${g}</p>`;
        total += parseInt(g);
        n++;
      });
      //average grades
      var avg = (total / n).toFixed(2);

      // <button id="minus" onclick="contract()"><span>&#8722;</span></button>  `;
      toggleList = ``;
      toggleBtn = `<button id="${
        f.firstName
      }" onclick="expand(this)" ><span>&#43;</span></button>`;

      infoHtml[i] =
        `<img id="dp" src="${f.pic}" >` +
        `<div classname="infobox" ><h1 id="name">${f.firstName} ${
          f.lastName
        }</h1>` +
        `<p id="email>${f.email}</p>` +
        `<p id="company">Company:${f.company} </p>` +
        `<p id="skill">Skill: ${f.skill}</p>` +
        `<p id="avg">Avg: ${avg} </p></div>` +
        toggleBtn +
        `<div class="grades" id="${f.firstName}Grades"  >${grades}</div>`;

      i++;
      grades = "";
      total = 0;
    });
    stuDiv.innerHTML = infoHtml;
    listenName(resObj);
  });
}

function passData(resObj) {
  var i = 0;
  var infoHtml = [];
  var total = 0;
  var n = 0;
  grades = "";

  // for each student
  resObj.students.forEach(s => {
    // add grades
    s.grades.forEach(g => {
      grades += `<p id="grades">${g}</p>`;
      total += parseInt(g);
      n++;
    });
    //average grades
    var avg = (total / n).toFixed(2);

    toggleList = ``;
    toggleBtn = `<button id="${
      s.firstName
    }" onclick="expand(this)" ><span>&#43;</span></button>`;

    infoHtml[i] =
      `<img id="dp" src="${s.pic}" >` +
      `<div classname="infobox" ><h1 id="name">${s.firstName} ${
        s.lastName
      }</h1>` +
      `<p id="email>${s.email}</p>` +
      `<p id="company">Company:${s.company} </p>` +
      `<p id="skill">Skill: ${s.skill}</p>` +
      `<p id="avg">Avg: ${avg} </p></div>` +
      toggleBtn +
      `<div class="grades" id="${s.firstName}Grades" >${grades}</div>`;
    i++;

    grades = "";

    total = 0;
  });
  stuDiv.innerHTML = infoHtml;
  listenName(resObj);
}

function expand(a) {
  console.log(`${a.id}Grades`);

  var x = document.getElementById(`${a.id}Grades`);

  if (x.className !== "expand") {
    x.classList.remove("concat");
    x.classList.add("expand");
    x.classList.remove("grades");
    console.log("expanding", x);
  } else if (x.className === "expand") {
    x.classList.remove("expand");
    x.classList.add("concat");
    console.log(x);
  }
}

function load() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      try {
        const resObj = JSON.parse(this.responseText);
        passData(resObj);
      } catch (e) {
        console.warn("Error in JSON.parse");
      }
    } else {
      console.warn("Did not receive 200 OK");
    }
  };

  xhr.open("GET", "https://www.hatchways.io/api/assessment/students");
  xhr.send();
}
load();
