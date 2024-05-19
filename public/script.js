let weekdaylst = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let timelst = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const initialAvailableTime = {
  "Monday": Array(13).fill(true),  // 09:00 to 21:00
  "Tuesday": Array(13).fill(true),
  "Wednesday": Array(13).fill(true),
  "Thursday": Array(13).fill(true),
  "Friday": Array(13).fill(true),
  "Saturday": Array(13).fill(true),
  "Sunday": Array(13).fill(true)
};

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

let availableTime = JSON.parse(JSON.stringify(initialAvailableTime));

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(task, priority, totalTime, dueDate) {
    const queueElement = { task, priority, totalTime, dueDate };
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > queueElement.priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printQueue() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i].task + " ";
    }
    return str;
  }

  clone() {
    const newQueue = new PriorityQueue();
    for (let i = 0; i < this.items.length; i++) {
      newQueue.items.push({ ...this.items[i] });
    }
    return newQueue;
  }
  updateTask(taskName, remainingTime) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].task === taskName) {
        this.items[i].totalTime = remainingTime;
        if (totalTime <= 0) {
          this.items.splice(i, 1);
        }
        break;
      }
    }
  }
}

const priorityQueue = new PriorityQueue();


function calculateFreeTimeRate() {
  const freeTimeRates = [];
  for (let day in availableTime) {
    const freeHours = availableTime[day].filter(slot => slot).length;
    freeTimeRates.push({ day, freeHours });
  }
  return freeTimeRates.sort((a, b) => a.freeHours - b.freeHours);
}

function clearScheduleDisplay() {
  for (let day in availableTime) {
    let weekdayIndex = weekdaylst.indexOf(day);
    for (let hour = 0; hour < availableTime[day].length; hour++) {
      let index = hour.toString() + weekdayIndex;
      let cell = document.getElementById(index);
      if (cell && availableTime[day][hour] === true) { // Only clear cells that are marked as available
        cell.innerHTML = "";
        cell.style.backgroundColor = "";
      }
    }
  }
}

function clearAvailableTimeExceptPinned() {
  for (let day in availableTime) {
    for (let hour = 0; hour < availableTime[day].length; hour++) {
      if (availableTime[day][hour] !== "pinned") {
        availableTime[day][hour] = true; 
      }
    }
  }
}


function scheduleTasks() {
  clearScheduleDisplay();
  clearAvailableTimeExceptPinned();

  if (priorityQueue.isEmpty()) return;
  let workingQueue = priorityQueue.clone();

  while (!workingQueue.isEmpty()) {
    let taskElement = workingQueue.dequeue();
    let task = taskElement.task;
    let totalTime = parseInt(taskElement.totalTime);
    let priority = taskElement.priority;
    let dueDateIndex = weekdaylst.indexOf(taskElement.dueDate);
    let color = getRandomColor();

    let distritime = Math.ceil(totalTime / (dueDateIndex + 1)); 

    let freeTimeRates = calculateFreeTimeRate().filter(day => weekdaylst.indexOf(day.day) <= dueDateIndex);

    for (let { day, freeHours } of freeTimeRates) {
      let weekdayIndex = weekdaylst.indexOf(day);
      let scheduledTime = 0;

      for (let hour = 0; hour < availableTime[day].length && totalTime > 0 && scheduledTime < distritime; hour++) {
        if (availableTime[day][hour] === true) { 
          availableTime[day][hour] = false;
          let str = hour.toString();
          let index = str + weekdayIndex;
          document.getElementById(index).innerHTML = task;
          document.getElementById(index).style.backgroundColor = color;
          totalTime--;
          scheduledTime++;

          
        }
        if(totalTime == 0 || distritime == scheduledTime){
          if(hour != availableTime[day].length){
            availableTime[day][hour+1] = false;
          }
        }
      }
    }
  }
  
}




document.getElementById('inputForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let task = document.getElementById("task").value;
  let priority = parseInt(document.getElementById("priority").value);
  let totalTime = document.getElementById("totalTime").value;
  let duedate = document.getElementById("duedate").value;

  priorityQueue.enqueue(task, priority, totalTime, duedate);

  console.log(priorityQueue.printQueue());
  addtoDone(task);
  scheduleTasks(); 
});

document.getElementById('pinTask').addEventListener('submit', function(event) {
  event.preventDefault();
  let taskpin = document.getElementById("taskpin").value;
  let weekday = document.getElementById("weekday").value;
  let startTime = document.getElementById("startTime").value;
  let endTime = document.getElementById("endTime").value;
  let weekdayindex = weekdaylst.indexOf(weekday);
  let startTimeindex = timelst.indexOf(startTime);
  let endTimeindex = timelst.indexOf(endTime);
  let color = getRandomColor();

  if (startTimeindex > 0 && availableTime[weekday][startTimeindex - 1] === true) {
    availableTime[weekday][startTimeindex - 1] = "pinned";
    let str = (startTimeindex - 1).toString();
    let index = str + weekdayindex;
  }

  for (let i = startTimeindex; i < endTimeindex; i++) {
    let str = i.toString();
    let index = str + weekdayindex;
    document.getElementById(index).innerHTML = taskpin;
    document.getElementById(index).style.backgroundColor = color;
    availableTime[weekday][i] = "pinned"; 
  }

  if (endTimeindex < availableTime[weekday].length && availableTime[weekday][endTimeindex] === true) {
    availableTime[weekday][endTimeindex] = "pinned";
    let str = endTimeindex.toString();
    let index = str + weekdayindex;
  }

  scheduleTasks(); 
});




document.getElementById('done').addEventListener('submit', function(event) {
  // Prevent the form from submitting the traditional way
  event.preventDefault();

  let task = document.getElementById("taskdone").value;
  let time = document.getElementById("timedone").value;

  removeTaskHours(task, time);
});


function removeTaskHours(taskName, hoursToRemove) {
  let hoursLeftToRemove = parseInt(hoursToRemove);
  let remainingHours = 0;

  for (let day in availableTime) {
    for (let hour = 0; hour < availableTime[day].length; hour++) {
      let weekdayIndex = weekdaylst.indexOf(day);
      let index = hour.toString() + weekdayIndex;
      let cell = document.getElementById(index);

      if (cell && cell.innerHTML === taskName) {
        if (hoursLeftToRemove > 0) {
          cell.innerHTML = "";
          cell.style.backgroundColor = "";
          availableTime[day][hour] = true;
          hoursLeftToRemove--;
        } 
        else {
          remainingHours++;
        }
      }
    }
  }

  priorityQueue.updateTask(taskName, remainingHours);
}




