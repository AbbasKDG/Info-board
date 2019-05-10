const stuDiv = document.getElementById("student");

function passData(resObj) {
  var i = 0;
  var infoHtml = [];
  var total = 0;
  var n = 0;

  // for each student
  resObj.students.forEach(s => {
    // add grades
    s.grades.forEach(g => {
      total += parseInt(g);
      n++;
    });
    //average grades
    var avg = (total / n).toFixed(2);

    infoHtml[i] =
      `<img id="dp" src="${s.pic}" >` +
      `<h1 id="name">${s.firstName}</h1>` +
      `<p id="email>${s.email}</p>` +
      `<p id="company">Company:${s.company} </p>` +
      `<p id="skill">Skill: ${s.skill}</p>` +
      `<p id="avg">Avg: ${avg} </p>`;
    i++;
    total = 0;
  });

  stuDiv.innerHTML = infoHtml;
}

function load() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      try {
        const resObj = JSON.parse(this.responseText);
        console.log(resObj);
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

var input = document.getElementById("inp");

input.addEventListener("input", function(e) {
  console.log(input.value);
  // check value inside html and remove accordingly
});
