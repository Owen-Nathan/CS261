//Both Teachers and Students are Users. They both have a name and an email address
function User(name) {
	this.name = name;
  this.email = name + "@byui.edu";
}

var output = "";
//Both have a showInfo function that will display their name and email.
User.prototype.showInfo = function() {
	output += "Name: " + this.name + "<br>";
    output += "Email: " + this.email + "<br>"
}

//A Teacher also has a subject property.
function Teacher(name, subject) {
User.call(this, name);
this.subject = subject;
}

//A teacher is a User.
Teacher.prototype = new User(null);

//A teacher has a display function that calls the showInfo function as well as displays the subject.
Teacher.prototype.display = function() {	
	this.showInfo();
    output += "Subject: " + this.subject + "<br><br>";
    updateDisplay();    
}

//A subject has a year and a grade property as well as the User Properties it inherited
function Student(name, year) {
	User.call(this, name);
  this.year = year;
  this.grade = 0;
}

//A student is a user.
Student.prototype = new User(null);

//The student's display function will run its parent showInfo function as well as display Year and Grade.
Student.prototype.display = function() {
	this.showInfo();
    output += "Year: " + this.year + "<br>";
    output += "Grade: " + this.grade + "<br><br>";
    updateDisplay();    
};



var student;
var teacher;

//Here we get the value from the fields and create a new Teacher Object. Then we call the display function
function createTeacher()
{
    var name = document.getElementById('name2').value;
    var subject = document.getElementById('subject').value;
    teacher = new Teacher(name,subject);
    teacher.display();
}

//Here we get the value from the fields and create a new Student Object. Then we call the display function
function createStudent()
{
    var name = document.getElementById('name').value;
    var year = document.getElementById('year').value;
    student = new Student(name,year);
    student.display();

}

//Here we find the grade field and update the student's grade. We then re-display the student
function updateGrade() {
    var grade = document.getElementById('grade').value;
    student.grade = grade;
    student.display();
}

//Here we find the subject field and update the teacher's subject. We then re-display the teacher
function updateSubject() {
    var subject = document.getElementById('subject2').value;
    teacher.subject = subject;
    teacher.display();
}

//Here we get the paragraph object with an id named display and update it with the new output.
function updateDisplay() {
    document.getElementById('display').innerHTML = output;
}

//This is just a simple function that receives in a document id and hides that element
function hide(id) {
    document.getElementById(id).style.display = 'none';
}

//This is just a simple function that receives in a document id and shows that element
function show(id) {
    document.getElementById(id).style.display = 'block';
}