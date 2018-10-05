function Student(name, year) {
	this.name = name;
  this.year = year;
  this.grade = 0;
}


Student.prototype.display = function() {
	console.log("Name: " + this.name);
  console.log("Year: " + this.year);
  console.log("Grade: " + this.grade);
  console.log("\n");
};


var student1 = new Student("Nathan","Senior");
var student2 = new Student("Hank","Junior");

console.clear();
console.log(" ===== Fresh Start");

//Output Student 1 Properties
student1.display();
//Output Student 2 Properties
student2.display();
console.log(" ===== Now Changing student1 (Nathan)'s grade to 100");
//Change Student 1's grade to a 100
student1.grade = 100;
student1.display();
student2.display();

console.log(" ===== Now Changing student2 (Hank)'s grade to 95");
//Change Student 2's grade to a 95
student2.grade = 95;
student1.display();
student2.display();


