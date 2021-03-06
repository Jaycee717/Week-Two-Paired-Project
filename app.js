"use strict";
// person writing code 
// 1. git add .
// 2. git commit -m "put the message here"
// 3. git push 
// now you are ready for your partner to do a pull and then they can take controll and write code
// after partner pushes you will run 
// git pull
//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people){
 //let billy = findPersonById(272822514); 
 //mainMenu(billy, people);
 //return;
  let searchType = promptFor(
    "Do you know the name you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      searchResults = searchByEyeColor(people)
      // TODO: search by traits
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person.firstName +
      " " +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );
  

  switch (displayOption) {
    case "info":
      displayPersonInfo(person);
      // TODO: get person's info
      break;
    case "family":
      displayPersonFamily(person, people);
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function displayPersonFamily(person, people){
  let parents = person.parents.map((id)=>findById(id,people)); 
  if (parents.length > 0) {
    displayPeople(parents)
  }else{alert('This person has no parents.')}
}

function searchById (id, people){
  let found = people.find(function(person){
    if (person.id === id){
      return true;
    } else {return false;}
  });
  return found;
}

function findById(id, people) {
  return people.find((person) => person.id == id);
}
//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });
  // TODO: find the person single person object using the name they entered.
  console.log(foundPerson)
  return foundPerson[0];
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people) {
 let personEyeColor = promptFor("What is the person's eye color?" , autoValid);

 let eyeColor = people.filter(function (potentialMatch) {
    if (
      potentialMatch.eyeColor === personEyeColor
      )
      {
      return true;
    } else {
      return false;
    }
  })
  return eyeColor
}
//TODO: add other trait filter functions here.

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "eyeColor"+ personEyeColor + "/n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  let response;
  do {
    response = prompt(question).trim(); 
    isValid = valid(response);
  } while (response === "" || isValid === false);
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

function displayPersonInfo(person){
  let info = `eyeColor = ${person.eyeColor}, gender = ${person.gender} height = ${person.height} weight = ${person.weight} occupation = ${person.occupation}, birth = ${person.dob}`;
  alert(info);
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {}

//{#endregion}