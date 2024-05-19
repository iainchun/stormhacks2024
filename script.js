let weekdaylst = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let timelst = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

function addtoDone(name) {
  let select = document.getElementById('taskdone');
  var opt = document.createElement('option');
    opt.value = name;
    opt.innerHTML = name;
    select.appendChild(opt);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.getElementById('inputForm').addEventListener('submit', function(event) {
  // Prevent the form from submitting the traditional way
  event.preventDefault();
  let task = document.getElementById("task").value;
  let priority = document.getElementById("priority").value;
  let totalTime = document.getElementById("totalTime").value;
  let duedate = document.getElementById("duedate").value;

  console.log(task);
  console.log(priority);
  console.log(totalTime);
  console.log(duedate);
  addtoDone(task);
});

document.getElementById('pinTask').addEventListener('submit', function(event) {
  // Prevent the form from submitting the traditional way
  event.preventDefault();
  let taskpin = document.getElementById("taskpin").value;
  let weekday = document.getElementById("weekday").value;
  let startTime = document.getElementById("startTime").value;
  let endTime = document.getElementById("endTime").value;
  let weekdayindex = weekdaylst.indexOf(weekday);
  let startTimeindex = timelst.indexOf(startTime);
  let endTimeindex = timelst.indexOf(endTime);
  let color = getRandomColor();
  // console.log(taskpin);
  // console.log(weekday);
  // console.log(startTime);
  // console.log(endTime);
  for(let i = startTimeindex; i < endTimeindex; i++){
    let str = i.toString();
    let index = str + weekdayindex;
    console.log(index);
    document.getElementById(index).innerHTML = taskpin;
    document.getElementById(index).style.backgroundColor = color;
  }
});

document.getElementById('done').addEventListener('submit', function(event) {
  // Prevent the form from submitting the traditional way
  event.preventDefault();
  let task = document.getElementById("taskdone").value;
  let time = document.getElementById("timedone").value;
  console.log(task);
  console.log(time);
});