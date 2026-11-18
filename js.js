// 1. SELECT
const nameInput = document.getElementById("studentName");
const markInputs = [
  document.getElementById("mark1"),
  document.getElementById("mark2"),
  document.getElementById("mark3"),
];
const resultBox = document.getElementById("result");
const calcBtn = document.getElementById("calcBtn");
const studentList = document.getElementById("studentList");

// Array that stores every student (exercise 3)
const students = [];

// Logic: number in, letter out
function getGrade(avg) {
  if (avg >= 80) return "A";
  else if (avg >= 70) return "B";
  else if (avg >= 60) return "C";
  else if (avg >= 50) return "D";
  else return "F";
}

// Draw the whole list from the array
function renderList() {
  studentList.innerHTML = "";               // clear old items
  students.forEach(function (s) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = s.name + " | Average: " + s.average +
                     " | Grade: " + s.grade + " | " + s.status;
    studentList.appendChild(li);
  });
}

// 2. LISTEN
calcBtn.addEventListener("click", function () {
  // 3. PROCESS
  const name = nameInput.value.trim();

  if (name === "") {
    resultBox.textContent = "Please enter the student name.";
    return;
  }

  // Read and validate each subject
  const marks = [];
  for (let i = 0; i < markInputs.length; i++) {
    const text = markInputs[i].value;
    const mark = Number(text);

    if (text === "") {
      resultBox.textContent = "Please enter the mark for Subject " + (i + 1) + ".";
      return;
    }
    if (mark < 0 || mark > 100) {
      resultBox.textContent = "Subject " + (i + 1) + " must be between 0 and 100.";
      return;
    }
    marks.push(mark);
  }

  // Average of the three subjects
  const total = marks[0] + marks[1] + marks[2];
  const average = Math.round(total / marks.length);
  const grade = getGrade(average);
  const status = average >= 50 ? "Pass" : "Fail";

  // Save the student (exercise 3)
  students.push({ name: name, average: average, grade: grade, status: status });

  // 4. DISPLAY
  resultBox.textContent =
    "Student: " + name + "\n" +
    "Average: " + average + "\n" +
    "Grade: " + grade + "\n" +
    "Status: " + status;

  renderList();

  // Clear the form for the next student
  nameInput.value = "";
  markInputs.forEach(function (input) { input.value = ""; });
  nameInput.focus();
});