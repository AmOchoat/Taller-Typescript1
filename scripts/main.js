import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-credits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBoxMinCredits = document.getElementById("sb-minCredits");
var inputSearchBoxMaxCredits = document.getElementById("sb-maxCredits");
var totalCreditElm = document.getElementById("total-credits");
var informationTbody = document.getElementById('information');
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredit(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudents);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(students) {
    console.log('Desplegando Información');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.name + "</td>\n                           <td>" + student.value + "</td>";
        informationTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) { return c.name.match(nameKey); });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
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
    var minText;
    var maxText;
    minText = parseInt(inputSearchBoxMinCredits.value);
    maxText = parseInt(inputSearchBoxMaxCredits.value);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(minText, maxText, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(minKey, maxKey, courses) {
    return courses.filter(function (c) { return c.credits >= minKey && c.credits <= maxKey; });
}
