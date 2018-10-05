function User(name) {
	this.name = name;
  this.email = name + "@byui.edu";
}

User.prototype.showInfo = function() {
	console.log("Name: " + this.name);
  console.log("Email: " + this.email);
}

function Teacher(name, subject) {
User.call(this, name);
this.subject = subject;
}

Teacher.prototype = new User(null);

Teacher.prototype.display = function() {
	console.log("I AM A TEACHER!!");
	this.showInfo();
	console.log("Subject: " + this.subject);
  console.log("\n");
}

function Student(name, year) {
	User.call(this, name);
  this.year = year;
  this.grade = 0;
}

Student.prototype = new User(null);

Student.prototype.display = function() {
	console.log("I AM A STUDENT!!");
	this.showInfo();
  console.log("Year: " + this.year);
  console.log("Grade: " + this.grade);
  console.log("\n");
};


var student1 = new Student("Nathan","Senior");
var teacher1 = new Teacher("Hank","Computer Science");

console.clear();
console.log(" ===== Fresh Start");

//Output Student 1 Properties
student1.display();
//Output Teacher 1 Properties
teacher1.display();

console.log(" ==== Change Student's Grade to a 100");
student1.grade = 100;
student1.display();

console.log(" ==== Change Teacher's Subject to Religion");
teacher1.subject = "Religion";
teacher1.display();



