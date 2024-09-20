
class Student {
  static #allStudents = []
  #fullname
  #age
  #finalCgpa
  #semesterGrade
  #finalGrade
  #numberOfYearsToGraduate
  static studentId = 0

  constructor(firstName, lastName, fullName, dob, age, semesterCgpaArray, finalCgpa, semesterGrade, finalGrade, yearOfEnrollment, yearOfPassing, numberOfYearsToGraduate) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = fullName
    this.dob = dob
    this.age = age
    this.semesterCgpaArray = semesterCgpaArray
    this.finalCgpa = finalCgpa
    this.semesterGrade = semesterGrade
    this.finalGrade = finalGrade
    this.yearOfEnrollment = yearOfEnrollment
    this.yearOfPassing = yearOfPassing
    this.numberOfYearsToGraduate = numberOfYearsToGraduate
    this.studentId = Student.studentId++
  }
  getFullname() {
    return this.#fullname
  }
  getAge() {
    return this.#age
  }
  getFinalCgpa() {
    return this.#finalCgpa
  }
  getSemesterGrade() {
    return this.#semesterGrade
  }
  getFinalGrade() {
    return this.#finalGrade
  }
  getNumberOfYearsToGraduate() {
    return this.#numberOfYearsToGraduate
  }

  //factory function
  static createStudent(firstName, lastName, dob, semesterCgpaArray, yearOfEnrollment, yearOfPassing) {
    //validation
    try {
      if (typeof firstName != 'string') {
        throw new Error("first name invalid")
      }
      if (typeof lastName != "string") {
        throw new Error("last name invalid")
      }
      if (firstName == lastName) {
        throw new Error(" firstname should not be equal to lastname")
      }
      if (typeof dob != "string") {
        throw new Error("invalid")
      }
      if (typeof semesterCgpaArray != "object" && semesterCgpaArray.length != 8) {
        throw new Error("invalid")
      }
      if (typeof yearOfEnrollment != "number") {
        throw new Error("invalid")
      }
      if (typeof yearOfPassing != "number") {
        throw new Error("invalid")
      }
      if (yearOfEnrollment > yearOfPassing) {
        throw new Error("invalid")
      }

      const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const dobmatch = dob.match(datePattern);
      if (!dobmatch) {
        throw new Error("invalid dob format")
      }
      
      let fullName = firstName + " " + lastName
      let age = new Date().getFullYear() - new Date(dob).getFullYear()
     
      let semesterGrade = []
      for (let i = 0; i < semesterCgpaArray.length; i++) {
        if (semesterCgpaArray[i] >= 9) {
          semesterGrade[i] = "A"
        }
        else if (semesterCgpaArray[i] >= 8) {
          semesterGrade[i] = "B"
        }
        else if (semesterCgpaArray[i] >= 7) {
          semesterGrade[i] = "C"
        }
        else if (semesterCgpaArray[i] >= 6) {
          semesterGrade[i] = "D"
        }
        else {
          semesterGrade[i] = "F"
        }
      }

     
      let finalCgpa = semesterCgpaArray.reduce((a, b) => a + b, 0) / semesterCgpaArray.length
     
      let finalGrade = ""
      if (finalCgpa >= 9) {
        finalGrade = "A"
      }
      else if (finalCgpa >= 8) {
        finalGrade = "B"
      }
      else if (finalCgpa >= 7) {
        finalGrade = "C"
      }
      else if (finalCgpa >= 6) {
        finalGrade = "D"
      }
      else {
        finalGrade = "F"
      }
      
      let numberOfYearsToGraduate = yearOfPassing - yearOfEnrollment
   
      let tempStudentObject = new Student(firstName, lastName, fullName, dob, age, semesterCgpaArray, finalCgpa, semesterGrade, finalGrade, yearOfEnrollment, yearOfPassing, numberOfYearsToGraduate)
      Student.#allStudents.push(tempStudentObject)
      return tempStudentObject
    }


    catch (error) {
      console.log(error)
    }

  }

  static getAllStudents() {
    return Student.#allStudents
  }
  static getStudentById(studId) {
    try{
     
      if (studId < 0) {
        throw new Error("Student ID cannot be negative")
      }
      if(typeof studId != "number")
      {
        throw new Error("Student ID must be a number")
      }
      
      let allStudents = Student.getAllStudents()
      if(allStudents.length ==0)
      {
        throw new Error("No students found")
      }
      
      let student1 = allStudents.find(currentStudent => currentStudent.studentId === studId)

      if (student1 == undefined) {
        throw new Error("Student not found")
      }
      return student1
    }
    catch(error)
    {
      console.log(error)
    }

    
  }

  static validateStudentID(studId)
  {
    try{
      if (studId < 0) {
        throw new Error("Student ID cannot be negative")
      }
      if(typeof studId != "number")
      {
        throw new Error("Student ID must be a number")
      }
    }
    catch(error)
    {
      console.log(error)
    }

  }

 //update starting from here
 updateFullName() {
  this.fullName = this.firstName + " " + this.lastName
 
}
updateFirstName(value) {
  try{
    if (typeof value != "string") {
      throw new Error("invalid first name")
    }
    this.firstName = value
    this.updateFullName()
  }
  catch(error)
  {
    console.log(error)
  }

 
}
updateLastName(value) {
  try{
    if (typeof value != "string") {
      throw new Error("invalid last name")
    }
    this.lastName = value
    this.updateFullName()
  }
  catch(error)
  {
    console.log(error)
  }
  
}

updateAge() {
  let currentDate = new Date();
  let birthDate = new Date(this.dob);
  this.age = currentDate.getFullYear() - birthDate.getFullYear();
}
updateDOb(value) {
  try{
    if (typeof value != "string") {
      throw new Error("invalid date of birth")
    }
    if (value.length != 10) {
      throw new Error("invalid date of birth")
    }
    if (value[2] != "/" || value[5] != "/") {
      throw new Error("invalid date of birth")
    }
    this.dob = value
    this.updateAge()
    }
    catch(error)
    {
      console.log(error)
    }
   

}

updateNumberOfYearsToGraduate() {
  let enrollmentYear = new Date(this.yearOfEnrollment);
  let passingYear = new Date(this.yearOfPassing);
  this.numberOfYearsToGraduate =
    enrollmentYear.getFullYear() - passingYear.getFullYear();
}
updateYearOfEnrollment(yearOfEnrollment) {
  try {
    if (yearOfEnrollment != "string")
      throw new Error("Enter a valid year of enrollment");
    const validYearPattern = /^\d{4}$/;

    const enrollmentYearMatch = yearOfEnrollment.match(validYearPattern);
    if (!enrollmentYearMatch) throw new Error("invalid enrollment year!");

    this.yearOfEnrollment = yearOfEnrollment;
    this.updateNumberOfYearsToGraduate();
  } catch (error) {
    console.log(error);
  }
}
updateYearOfPassng(yearOfPassing) {
  try {
    if (yearOfPassing != "string")
      throw new Error("Enter a valid year of enrollment");
    const validYearPattern = /^\d{4}$/;

    const enrollmentYearMatch = yearOfPassing.match(validYearPattern);
    if (!enrollmentYearMatch) throw new Error("invalid enrollment year!");

    this.yearOfPassing = yearOfPassing;
    this.updateNumberOfYearsToGraduate();
  } catch (error) {
    console.log(error);
  }
}
updateFinalGrade() {
  if (this.finalCGPA >= 8.0 && this.finalCGPA <= 10.0) {
    this.finalGrade = "A";
  } else if (this.finalCGPA >= 6.0 && this.finalCGPA < 8.0) {
    this.#finalGrade = "B";
  } else if (this.finalCGPA >= 5.0 && this.finalCGPA < 6.0) {
    this.#finalGrade = "C";
  } else if (this.finalCGPA >= 4.0 && this.finalCGPA < 5.0) {
    this.#finalGrade = "D";
  } else {
    this.finalGrade = "F";
  }
}
updateFinalCGPA() {
  let cgpaList = this.semesterCgpaArray;
  let sum = 0;
  for (let perSemCGPA of cgpaList) {
    sum += perSemCGPA;
  }
  this.finalCGPA = Math.round(sum / 8);
  this.updateFinalGrade();
}

updatesemesterGrade() {
  // let semesterGrade = [];
  for (let i = 0; i < this.semesterCgpaArray.length; i++) {
    let currentCGPA = this.semesterCgpaArray[i];
    if (currentCGPA >= 8.0 && currentCGPA <= 10.0) {
      this.semesterGrade[i] = "A";
    } else if (currentCGPA >= 6.0 && currentCGPA < 8.0) {
      this.semesterGrade[i] = "B";
    } else if (currentCGPA >= 5.0 && currentCGPA < 6.0) {
      this.semesterGrade[i] = "C";
    } else if (currentCGPA >= 4.0 && currentCGPA < 5.0) {
      this.semesterGrade[i] = "D";
    } else {
      this.semesterGrade[i] = "F";
    }
  }
}
updateCGPAlist(semesterCgpaArray) {
  try {
    if (!Array.isArray(semesterCgpaArray))
      throw new Error("Enter a valid CGPA list");

    if (semesterCgpaArray.length != 8)
      throw new Error("Enter a valid CGPA list");

    for (let perSemCGPA of semesterCgpaArray) {
      if (isNaN(perSemCGPA)) throw new Error("Enter a valid CGPA list!");
      if (perSemCGPA < 0.0) throw new Error("CGPA cannot be less than 0!");
      if (perSemCGPA > 10.0) throw new Error("CGPA cannot be more tha 10!");
    }

    this.semesterCgpaArray = semesterCgpaArray;
    this.updateFinalCGPA();
    this.updatesemesterGrade();
  } catch (error) {
    console.log(error);
  }
}

//update student by id
static updateStudentByID(studentID, parameter, value) {
  try {
    Student.validateStudentID(studentID);

    let foundStudent = Student.getStudentById(studentID);

    switch (parameter) {
      case "firstName":
        foundStudent.updateFirstName(value);
        break;
      case "lastName":
        foundStudent.updateLastName(value);
        break;
      case "dob":
        foundStudent.updateDOb(value);
        break;
      case "semesterCgpaArray":
        foundStudent.updateCGPAlist(value);
        break;
      case "yearOfEnrollment":
        foundStudent.updateYearOfEnrollment(value);
        break;
      case "yearOfPassing":
        foundStudent.updateYearOfPassng(value);
        break;

      default:
        console.log("Enter a valid parameter to change!");
    }
    return foundStudent;
  } catch (error) {
    console.log(error);
  }
}

static deleteStudentById(studId)
{
  try {
    Student.validateStudentID(studId);
    let allStudents = Student.#allStudents
    const indexOfStudent = allStudents.findIndex((object) => {
      return object.studentId == studId;
    })
    allStudents.splice(indexOfStudent, 1)
    console.log("Student deleted successfully")
    
    
  } catch (error) {
    console.log(error);
  }
}


  //end of class
}

let aneesh = Student.createStudent("Aneesh", "Kumar", "01/13/2003", [9.8, 9.4, 9.1, 8.7, 9.1, 8.4, 9.18, 8.9], 2019, 2023)
let john = Student.createStudent("John", "Doe", "01/13/2003", [9.8, 9.4, 9.1, 8.7, 9.1, 8.4, 9.18, 8.9], 2019, 2023)
// Employee.updateById(1, "lastName", "gupta")

Student.updateStudentByID(1,"firstName","rohan")
Student.deleteStudentById(1)
console.log(Student.getAllStudents())
