function Student(name, year) {
	this.name = name;
  this.year = year;
}

Student.prototype.grade = 0;

var student1 = new Student("Nathan","Senior");
var student2 = new Student("Hank","Junior");


//Output Student 1 Properties
console.log("Name: " + student1.name);
console.log("Year: " + student1.year);
console.log("Grade: " + student1.grade);

console.log("\n");
//Output Student 2 Properties
console.log("Name: " + student2.name);
console.log("Year: " + student2.year);
console.log("Grade: " + student2.grade);
console.log("\n");
console.log("===== Now Changing the Student Prototype to 50");
//Change Students grade to a 50
Student.prototype.grade = 50;

//Output Student 1's Properties Again
console.log("Name: " + student1.name);
console.log("Year: " + student1.year);
console.log("Grade: " + student1.grade);

console.log("\n");
//Output Student 2's Properties Again

console.log("Name: " + student2.name);
console.log("Year: " + student2.year);
console.log("Grade: " + student2.grade);

console.log("\n");
console.log(" ===== Now Changing student1 (Nathan)'s grade to 100'");
//Change Student 1's grade to a 100
student1.grade = 100;

//Output Student 1's Properties Again
console.log("Name: " + student1.name);
console.log("Year: " + student1.year);
console.log("Grade: " + student1.grade);

console.log("\n");
//Output Student 2's Properties Again

console.log("Name: " + student2.name);
console.log("Year: " + student2.year);
console.log("Grade: " + student2.grade);
console.log("\n");
console.log("=== Now Creating a New Student (Bill)");

var student3 = new Student("Bill", "Sophopmore");
console.log("Name: " + student3.name);
console.log("Year: " + student3.year);
console.log("Grade: " + student3.grade);
console.log("\n");
console.log("======= Changing the Student Prototype Again, to 75");

//Change Students grade to a 75
Student.prototype.grade = 75;

//Output Student 1's Properties Again
console.log("Name: " + student1.name);
console.log("Year: " + student1.year);
console.log("Grade: " + student1.grade);

console.log("\n");
//Output Student 2's Properties Again

console.log("Name: " + student2.name);
console.log("Year: " + student2.year);
console.log("Grade: " + student2.grade);

console.log("\n");

console.log("Name: " + student3.name);
console.log("Year: " + student3.year);
console.log("Grade: " + student3.grade);




