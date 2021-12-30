const submitButton = document.querySelector(".submit-button");
const gender = document.querySelector(".gender");
const range = document.querySelector(".amount");
const rangeOutput = document.querySelector(".user-amount");
const tableOutput = document.querySelector(".tableOutput");

let urlData = {
  genderInfo: "",
  results: "results=50",
};

const urlBuilder = () => {
  return `https://randomuser.me/api/` + "?" + Object.values(urlData).join("&");
};

const getUsersData = async (e) => {
  e.preventDefault();
  const res = await fetch(urlBuilder());
  const data = await res.json();

  let tableHtml = "";
  data.results.forEach((user) => {
    tableHtml += `
      <tr>
        <td>
          <img src="${user.picture.thumbnail}" alt="${user.name.first} ${
      user.name.last
    } avatar image" /></td>
        <td>${user.name.first} ${user.name.last}</td>
        <td><small>${
          user.gender === "female" ? "&#9792;" : "&#9794;"
        }</small></td>
        <td>${user.location.city}</td>
        <td>${user.email}</td>
        <td>${user.login.username}</td>
        <td>${user.login.password}</td>
        <td>${user.location.country}</td>
        <td>${user.dob.age}</td>
        <td>${user.dob.date}</td>
        <td>${user.cell}</td>
      </tr>
      `;
  });
  tableOutput.innerHTML = tableHtml;
};

submitButton.addEventListener("click", getUsersData);

function genderHandler() {
  if (this.value === "all") {
    return (urlData.genderInfo = ``);
  }
  urlData.genderInfo = `gender=${this.value}`;
}

gender.addEventListener("change", genderHandler);

function rangeHandler() {
  rangeOutput.innerHTML = `${this.value} users`;
  urlData.results = `results=${this.value}`;
}

range.addEventListener("input", rangeHandler);

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.querySelector(".sortable-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

document.querySelector(".sort-names").onclick = () => {
  sortTable(1);
};
document.querySelector(".sort-genders").onclick = () => {
  sortTable(2);
};
document.querySelector(".sort-cities").onclick = () => {
  sortTable(3);
};
document.querySelector(".sort-logins").onclick = () => {
  sortTable(5);
};
