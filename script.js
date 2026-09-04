document.addEventListener("DOMContentLoaded", function () {

  // Percentage Calculator
  document.getElementById("calculateBtn").addEventListener("click", function () {
    const total = Number(document.getElementById("total").value);
    const obtained = Number(document.getElementById("obtained").value);

    if (total <= 0) {
      alert("Please enter total marks");
      return;
    }

    if (obtained < 0 || obtained > total) {
      alert("Obtained marks total marks se zyada nahi ho sakte");
      return;
    }

    const percentage = (obtained / total) * 100;

    document.getElementById("result").textContent =
      "Your Percentage: " + percentage.toFixed(2) + "%";
  });


  // Study Timer
  let timer;
  let timeLeft = 0;

  document.getElementById("startTimer").addEventListener("click", function () {
    const minutes = Number(document.getElementById("minutes").value);

    if (minutes <= 0) {
      alert("Please enter minutes");
      return;
    }

    timeLeft = minutes * 60;
    clearInterval(timer);

    timer = setInterval(function () {
      let min = Math.floor(timeLeft / 60);
      let sec = timeLeft % 60;

      document.getElementById("timerDisplay").innerText =
        String(min).padStart(2, "0") + ":" +
        String(sec).padStart(2, "0");

      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Study Time Complete! 🎉");
        return;
      }

      timeLeft--;
    }, 1000);
  });

  document.getElementById("pauseTimer").addEventListener("click", function () {
    clearInterval(timer);
  });

  document.getElementById("resetTimer").addEventListener("click", function () {
    clearInterval(timer);
    timeLeft = 0;

    document.getElementById("timerDisplay").innerText = "00:00";
    document.getElementById("minutes").value = "";
  });


  // Exam Countdown
  document.getElementById("countdownBtn").addEventListener("click", function () {
    const date = document.getElementById("examDate").value;

    if (date === "") {
      alert("Please select exam date");
      return;
    }

    const today = new Date();
    const examDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);

    const days = Math.ceil(
      (examDate - today) / (1000 * 60 * 60 * 24)
    );

    document.getElementById("countdownResult").innerText =
      days + " Days Left for Exam 📚";
  });


  // To-Do List
  document.getElementById("addTask").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task");
      return;
    }

    const li = document.createElement("li");

    const taskName = document.createElement("span");
    taskName.textContent = "📚 " + taskText;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";

    doneBtn.onclick = function () {
      taskName.style.textDecoration = "line-through";
      taskName.textContent = "✅ " + taskText;
      doneBtn.remove();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function () {
      li.remove();
    };

    li.appendChild(taskName);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
  });


  // Quick Notes
  const notesInput = document.getElementById("notesInput");
  const notesMessage = document.getElementById("notesMessage");

  // Saved notes automatically load
  const savedNotes = localStorage.getItem("studySaathiNotes");

  if (savedNotes) {
    notesInput.value = savedNotes;
  }

  // Save notes
  document.getElementById("saveNotes").addEventListener("click", function () {
    const notes = notesInput.value.trim();

    if (notes === "") {
      notesMessage.textContent = "Pehle notes likho.";
      return;
    }

    localStorage.setItem("studySaathiNotes", notes);

    notesMessage.textContent = "✅ Notes saved successfully!";
  });


  // Study Planner
  document.getElementById("addPlan").addEventListener("click", function () {
    const subject = document.getElementById("subjectInput").value.trim();
    const task = document.getElementById("plannerTask").value.trim();

    if (subject === "" || task === "") {
      alert("Please enter subject and study task");
      return;
    }

    const li = document.createElement("li");

    li.textContent = "📚 " + subject + " — " + task;

    document.getElementById("planList").appendChild(li);

    document.getElementById("subjectInput").value = "";
    document.getElementById("plannerTask").value = "";
  });


  // CGPA Calculator
  document.getElementById("createSubjects").addEventListener("click", function () {
    const count = Number(document.getElementById("subjectCount").value);
    const container = document.getElementById("subjectInputs");

    container.innerHTML = "";

    if (count <= 0) {
      alert("Please enter number of subjects");
      return;
    }

    for (let i = 1; i <= count; i++) {
      const row = document.createElement("div");
      row.className = "subject-row";

      row.innerHTML = `
        <input type="text" placeholder="Subject ${i}">
        <input
          type="number"
          class="gradeInput"
          placeholder="Grade Point"
          min="0"
          max="10"
          step="0.1"
        >
      `;

      container.appendChild(row);
    }
  });

  document.getElementById("calculateCGPA").addEventListener("click", function () {
    const grades = document.querySelectorAll(".gradeInput");

    if (grades.length === 0) {
      alert("First add subjects");
      return;
    }

    let total = 0;

    for (let grade of grades) {
      if (grade.value === "") {
        alert("Please enter all grade points");
        return;
      }

      const value = Number(grade.value);

      if (value < 0 || value > 10) {
        alert("Grade Point 0 se 10 ke beech hona chahiye");
        return;
      }

      total += value;
    }

    const cgpa = total / grades.length;

    document.getElementById("cgpaResult").textContent =
      "Your CGPA: " + cgpa.toFixed(2);
  });


  // Pomodoro Timer
  let pomodoroTimer;
  let pomodoroTime = 25 * 60;

  function updatePomodoroDisplay() {
    const minutes = Math.floor(pomodoroTime / 60);
    const seconds = pomodoroTime % 60;

    document.getElementById("pomodoroDisplay").textContent =
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
  }

  document.getElementById("startPomodoro").addEventListener("click", function () {
    clearInterval(pomodoroTimer);

    document.getElementById("pomodoroStatus").textContent =
      "Study Time Started! 📚";

    pomodoroTimer = setInterval(function () {
      if (pomodoroTime <= 0) {
        clearInterval(pomodoroTimer);

        document.getElementById("pomodoroStatus").textContent =
          "Study Time Complete! 🎉";

        return;
      }

      pomodoroTime--;
      updatePomodoroDisplay();
    }, 1000);
  });

  document.getElementById("pausePomodoro").addEventListener("click", function () {
    clearInterval(pomodoroTimer);

    document.getElementById("pomodoroStatus").textContent =
      "Timer Paused ⏸️";
  });

  document.getElementById("resetPomodoro").addEventListener("click", function () {
    clearInterval(pomodoroTimer);

    pomodoroTime = 25 * 60;
    updatePomodoroDisplay();

    document.getElementById("pomodoroStatus").textContent =
      "Ready to Study 📚";
  });

  updatePomodoroDisplay();

});