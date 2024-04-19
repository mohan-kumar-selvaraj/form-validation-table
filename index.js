//============================Variable Declaration=========================

let uname = document.getElementById("name");
let email = document.getElementById("email");
let dob = document.getElementById("dob");
let cn = document.getElementById("cn");
let pan = document.getElementById("pan");
let occupation = document.getElementById("occupation");
let password = document.getElementById("password");
let username = document.getElementById("username");
let gender = document.getElementById("gender");
let education = document.getElementById("education");
let search = document.getElementById("search");
let clear = document.getElementById("clear");
let image = "";

let bname = false;
let busername = false;
let bemail = false;
let bdob = false;
let bcn = false;
let bpan = false;
let boccupation = true;
let bpassword = false;
let bgender = true;
let beducation = true;
let bimage = false;

//============================Validations=========================

const regexName = /^[a-zA-Z\s]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexContact = /^[6-9]\d{9}$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,15}$/;
const regexPAN = /^[A-Z]{5}\d{4}[A-Z]$/;
const regexOccupation = /^[a-zA-Z\s]+$/;
const regexUsername = /^[a-zA-Z0-9_-]{3,16}$/;

function isUsernameInLocal(name) {
  if (name.length === 0) return false;
  const data = JSON.parse(localStorage.getItem(name));
  return data === null ? true : false;
}

function isValidUsername(name) {
  return regexUsername.test(name);
}

function isValidName(name) {
  return regexName.test(name);
}

function isValidEmail(email) {
  return regexEmail.test(email);
}

function isValidContactNumber(number) {
  return regexContact.test(number);
}

function isValidPassword(password) {
  return regexPassword.test(password);
}
function isValidPanNumber(panNumber) {
  return regexPAN.test(panNumber);
}

function isValidOccupation(occupation) {
  return regexOccupation.test(occupation) || occupation.length === 0;
}
function isValidDate(date) {
  let year = new Date(date).getFullYear();
  if (year >= 1950 && year <= 2010) {
    return true;
  } else {
    return false;
  }
}

//============================Color Change=========================

function isTrue(validator, element) {
  element.classList.remove("is-invalid");
  element.classList.add("is-valid");
  if (validator != "gender-validation" && validator != "education-validation")
    document.getElementById(validator).innerHTML = "";
}
function isFalse(validator, text, element) {
  element.classList.remove("is-valid");
  element.classList.add("is-invalid");
  if (text === "Username")
    document.getElementById(validator).innerHTML = "Username already taken.";
  else
    document.getElementById(validator).innerHTML =
      "Please provide the valid " + text;
}

uname.addEventListener("input", (event) => {
  if (isValidName(event.target.value.trim())) {
    isTrue("name-validation", event.target);
    bname = true;
  } else {
    isFalse("name-validation", "Name", event.target);
    bname = false;
  }
});
email.addEventListener("input", (event) => {
  if (isValidEmail(event.target.value.trim())) {
    isTrue("email-validation", event.target);
    bemail = true;
  } else {
    isFalse("email-validation", "Email", event.target);
    bemail = false;
  }
});
cn.addEventListener("input", (event) => {
  if (isValidContactNumber(event.target.value.trim())) {
    isTrue("cn-validation", event.target);
    bcn = true;
  } else {
    isFalse("cn-validation", "Contact Number", event.target);
    bcn = false;
  }
});
pan.addEventListener("input", (event) => {
  if (isValidPanNumber(event.target.value.trim())) {
    isTrue("pan-validation", event.target);
    bpan = true;
  } else {
    isFalse("pan-validation", "PAN", event.target);
    bpan = false;
  }
});
occupation.addEventListener("input", (event) => {
  if (isValidOccupation(event.target.value.trim())) {
    isTrue("occupation-validation", event.target);
    boccupation = true;
  } else {
    isFalse("occupation-validation", "Occupation", event.target);
    boccupation = true;
  }
});
password.addEventListener("input", (event) => {
  if (isValidPassword(event.target.value.trim())) {
    isTrue("password-validation", event.target);
    bpassword = true;
  } else {
    isFalse("password-validation", "Password", event.target);
    bpassword = false;
  }
});

dob.addEventListener("input", (event) => {
  if (isValidDate(event.target.value)) {
    isTrue("dob-validation", dob);
    bdob = true;
  } else {
    isFalse("dob-validation", "Date", dob);
    bdob = false;
  }
});

gender.addEventListener("input", (event) => {
  isTrue("gender-validation", gender);
});

education.addEventListener("input", (event) => {
  isTrue("education-validation", education);
});

username.addEventListener("input", (event) => {
  if (
    isValidUsername(event.target.value.trim().toLowerCase()) &&
    isUsernameInLocal(event.target.value.trim().toLowerCase())
  ) {
    isTrue("username-validation", event.target);
    busername = true;
  } else if (event.target.value.trim().length === 0) {
    isFalse("username-validation", "User name", event.target);
    busername = false;
  } else if (!isValidUsername(event.target.value.trim().toLowerCase())) {
    isFalse("username-validation", "User name", event.target);
    busername = false;
  } else {
    isFalse("username-validation", "Username", event.target);
    busername = false;
  }
});

//============================Store to Local=========================

function submit1(event) {
  if (
    bname &&
    busername &&
    bcn &&
    beducation &&
    bemail &&
    bdob &&
    bpan &&
    boccupation &&
    bpassword &&
    bgender &&
    bimage
  ) {
    // console.log(bname);
    const data = {
      name: uname.value,
      email: email.value,
      pan: pan.value,
      password: password.value,
      gender: gender.value,
      education: education.value,
      contact: cn.value,
      dob: dob.value,
      imgData: image,
    };
    if (occupation.value === "") data["occupation"] = "";
    else data["occupation"] = occupation.value;
    console.log(data);

    saveToLocal(data, username.value.toLowerCase());
    alert("Successfully registered!!!");
  } else {
    event.preventDefault();
    alert("Check all the details properly");
  }
}

function saveToLocal(sdata, username) {
  const data = JSON.parse(localStorage.getItem(username));
  if (data === null) localStorage.setItem(username, JSON.stringify(sdata));
}

//============================Eye Toggle=========================

const togglePassword = document.querySelector("#togglePassword");

togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

//============================Local to Table=========================

//show data to table
function getTableData() {
  var data = [];
  var keys = Object.keys(localStorage);
  data = keys.map((key) => {
    var values = JSON.parse(localStorage.getItem(key));
    values["username"] = key;
    return values;
  });
  return data;
}
function displayTableData(data) {
  let tdata = `<tr>
  <th>Username</th>
  <th>Name</th>
  <th>Email</th>
  <th>DOB</th>
  <th>Contact</th>
  <th>PAN</th>
  <th>Occupation</th>
  <th>Gender</th>
  <th>Education</th>
  <th>Image Size</th>
  <th>Image</th>
</tr>`;
  let tableBody = data
    .map(
      (value) =>
        `
      <tr>
        <td>${value.username}</td>
        <td>${value.name}</td>
        <td>${value.email}</td>
        <td>${value.dob}</td>
        <td>${value.contact}</td>
        <td>${value.pan}</td>
        <td>${value.occupation}</td>
        <td>${value.gender}</td>
        <td>${value.education}</td>
        <td>${getImageSize(value)}</td>
        <td><image src="${value.imgData}" alt="${
          value.name
        } width="20" height="100"></td>
      </tr>
    `
    )
    .join("");

  var tbody = document.querySelector("#tbody");
  if (tableBody == "") tbody.innerHTML = tableBody;
  else {
    tbody.innerHTML = tdata + tableBody;
  }
}

//============================Search=========================

// search by name

function searchByName(name) {
  let data = getTableData();
  data = data.filter((value) => {
    return value.name.toLowerCase().startsWith(name);
  });
  displayTableData(data);
}

//search by age
function searchByAge(ageInDays) {
  let data = getTableData();
  // need to change according to age
  let ageInYears = Math.floor(ageInDays / 365);
  data = data.filter((value) => {
    let year = new Date(value.dob).getFullYear();
    let age = new Date().getFullYear() - year;
    return age <= ageInYears;
  });
  displayTableData(data);
}

function getImageSize(value) {
  var base64ImageData = value.imgData;

  // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
  var base64Data = base64ImageData.split(",")[1];

  // Calculate the size of the image in bytes
  var imageSizeInBytes = (base64Data.length * 3) / 4; // Base64 encoding uses 4 characters to represent 3 bytes
  return imageSizeInBytes;
}

function searchBySize(size) {
  let data = getTableData();

  data = data.filter((value) => {
    var imageSizeInBytes = getImageSize(value);

    return imageSizeInBytes <= size;
  });
  displayTableData(data);
}

search.addEventListener("input", (event) => {
  if (
    !(
      event.target.value.charAt(0) >= "0" && event.target.value.charAt(0) <= "9"
    ) &&
    event.target.value != ""
  ) {
    searchByName(event.target.value.toLowerCase().trim());
  } else if (event.target.value == "") {
    displayTableData([]);
  } else {
    let val = event.target.value.toLowerCase();
    if (val.includes("bytes") || val.includes("mb") || val.includes("kb")) {
      let splitArray = val.split(" ");
      if (splitArray[1] != undefined) {
        if (splitArray[1] == "bytes") searchBySize(splitArray[0]);
        if (splitArray[1] == "kb")
          searchBySize((parseFloat(splitArray[0]) * 1000).toString());
        if (splitArray[1] == "mb")
          searchBySize((parseFloat(splitArray[0]) * 1000000).toString());
      } else {
        const match = val.match(/(\d+)([a-zA-Z]+)/);
        if (match) {
          if (match[2] == "bytes") searchBySize(match[1]);
          if (match[2] == "kb")
            searchBySize((parseFloat(match[1]) * 1000).toString());
          if (match[2] == "mb")
            searchBySize((parseFloat(match[1]) * 1000000).toString());
        } else {
          console.log("Invalid string format");
        }
      }
    } else searchByAge(event.target.value);
  }
});

//============================Clear Local Storage=========================

clear.addEventListener("click", (event) => {
  localStorage.clear();
  let data = getTableData();
  displayTableData(data);
});

//============================Get Image URL=========================

// upload image
function uploadImage(input) {
  // console.log(input.files);
  // input.files = {0 : File, length : 1}
  var bannerImage = input.files[0];
  // console.log(bannerImage);
  // bannerImage = File {name: 'Screenshot from 2024-02-03 21-19-02.png', lastModified: 1706975342577, lastModifiedDate: Sat Feb 03 2024 21:19:02 GMT+0530 (India Standard Time), webkitRelativePath: '', size: 1040282, …}
  if (bannerImage.size > 2 * 1024 * 1024) {
    // bannerImage.size in bytes
    // 1 KB = 1024 bytes
    // 1 MB = 1024 KB = 1024 * 1024 bytes
    // 2 MB = 2 * 1024 KB = 2 * 1024 * 1024 bytes
    document.getElementById("image-validation").innerHTML =
      "Image must be less than 2MB";
    displayImage.src = "";
    bimage = false;
    return;
  }

  // Check if the file is an image (JPEG or PNG)
  if (!bannerImage.type.startsWith("image/")) {
    document.getElementById("image-validation").innerHTML =
      "Please select a valid image file (JPEG or PNG)";
    displayImage.src = "";
    bimage = false;
    return;
  }
  document.getElementById("image-validation").innerHTML = "";
  var reader = new FileReader();

  reader.onload = function (e) {
    // extract the file data in the form of data URL
    var imgData = e.target.result;
    image = imgData;
    // Display the image immediately after storing it
    displayImage.src = imgData;
    bimage = true;
  };
  // used to read the contents of File.
  //When the read operation is finished, the readyState becomes DONE, and the loadend is triggered.
  // At that time, the result attribute contains the data as a data: URL representing the file's data as a base64 encoded string.
  reader.readAsDataURL(bannerImage);
}
