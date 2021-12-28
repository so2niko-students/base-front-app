//VARIABLES
const gender = document.getElementById('gender');
const users = document.getElementById('users');
const usersLabel = document.getElementById('usersLabel');
const myBtn = document.getElementById('myBtn');
const outputBody = document.getElementById('output');
let url = `https://randomuser.me/api/`;
let urlVal = {
    usersVal : '',
    genderVal: ''
}
//EVENTS
myBtn.addEventListener('click', getData);
users.addEventListener('change', getUsers);
gender.addEventListener('change', getGender);

//USERS FUNCTION
usersLabel.innerHTML = `1 user`;
function getUsers() {
   urlVal.usersVal = `?results=${this.value}`
   usersLabel.innerHTML = `${users.value} users`
}

//GENDER FUNCTION
function getGender() {
   urlVal.genderVal = `&gender=${this.value}`
}

//URL FUNCTION
function getUrl(){
    let newUrl = url + urlVal.usersVal + urlVal.genderVal;
    //console.log(newUrl);
    return newUrl;
}

//GET FUNCTION 'https://randomuser.me/api/?results=50'
async function getData (){
    const resp = await fetch(getUrl());
    const data = await resp.json();
        //console.log(data);
        let author = data.results;
        let output =``;
        author.forEach(function(lists) {
            output += `
              <tr>
              <td><img src="${lists.picture.thumbnail}"></td>
              <td>${lists.name.first} ${lists.name.last}</td>
              <td>${lists.gender === "male" ? "&#9794;" : "&#9792;"}</td>
              <td>${lists.location.city}</td>
              <td>${lists.email}</td>
              <td>${lists.login.username}</td>
              <td>${lists.login.password}</td>
              <td>${lists.nat}</td>
              <td>${lists.dob.age}</td>
              <td>${lists.dob.date}</td>
              <td>${lists.cell}</td>
              </tr>
          `;
        });   
        outputBody.innerHTML = output;
    };

//SORT FUNCTION
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
