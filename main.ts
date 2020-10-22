import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudents } from './dataStudent.js';

const coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-credits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBoxMinCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("sb-minCredits")!;
const inputSearchBoxMaxCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("sb-maxCredits")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

const informationTbody: HTMLElement = document.getElementById('information')!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredit();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(students: Student[]): void {
  console.log('Desplegando Información');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.name}</td>
                           <td>${student.value}</td>`;
    informationTbody.appendChild(trElement);
  });
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c =>   c.name.match(nameKey));
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}


function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

function applyFilterByCredit() {
  let minText :number;
  let maxText :number;
  minText = parseInt(inputSearchBoxMinCredits.value);
  maxText = parseInt(inputSearchBoxMaxCredits.value);

  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(minText, maxText, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(minKey: number, maxKey: number,  courses: Course[]) {
  return courses.filter( c => c.credits>=minKey && c.credits<=maxKey);
}
