let weekdaylst = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let timelst = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

function addtoDone(name) {
  let select = document.getElementById('taskdone');
  var opt = document.createElement('option');
    opt.value = name;
    opt.innerHTML = name;
    select.appendChild(opt);
}

function getRandomColor() {
  var letters = '89ABCDEF'; 
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
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
  console.log(taskpin);
  console.log(weekday);
  console.log(startTime);
  console.log(endTime);
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
  let i = 0;
  while(i<=time){
    if (task === taskpin) {
      let str = i.toString();
      displayImageInCell(str, 'goodjob.jpg');
    }
    i++;
  }
  });
  
  function displayImageInCell(cellId, imageUrl) {
    const cell = document.getElementById(cellId);
    cell.innerHTML = ''; 
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Good job';
    img.style.maxWidth = '100%';
    cell.appendChild(img);
  }




function showForm(formId) {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('main-content').style.display = 'none';
  document.getElementById(formId).style.display = 'block';
}

function signUp() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  alert('Sign-Up Successful! Pleaswwwe log in.');
  showForm('login-form');
}

function gotologIn(){
  showForm('login-form');
}

function gotosignUp(){
  showForm('signup-form');
}

function logIn() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (username === storedUsername && password === storedPassword) {
      alert('Log-In Successful!');
      showForm('main-content');
  } else {
      alert('Invalid credentials. Pleaseqwe try again.');
      showForm('signup-form');
  }
}

window.onload = function() {
  if (localStorage.getItem('username') && localStorage.getItem('password')) {
      showForm('login-form');
  } else {
      showForm('signup-form');
  }
}

