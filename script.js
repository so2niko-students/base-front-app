const usersURL = "https://randomuser.me/api/";

const female = '♀',
    male = '♂ '


// menu component
let selectGender = document.querySelector('#selectGender'),
    range = document.querySelector('#data-range'),
    submitBtn = document.querySelector('#submitBtn'),
    rangeCounter = document.querySelector('#range-counter');
// table component
let table = document.querySelector('#table');
let tbody = document.createElement('tbody')


// get data from api
// function sendRequest(url, requestConfig) {
//     return fetch(url + requestConfig).then(response => {
//         return response.json();
//     })
// }

const sendRequest = url => fetch(url).then(response => response.json())


// add some style to table
function addStyleTotable(tbody) {
    for (let i = 0; i < tbody.children.length; i++) {
        tbody.children[i].classList.remove('green-tr');
        if (i % 2) {
            tbody.children[i].classList.add('green-tr');
        }
    }

}



function drawTable(data) {
    for (user of data.results) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <tr>
        <td><img src="${user.picture.thumbnail}"></td>
        <td>${user.name.first} ${user.name.last}</td>
        <td data="${user.gender == 'female' ? 0 : 1 }">${user.gender == 'female' ? female : male }</td>
        <td>${user.location.city}</td>
        <td>${user.email}</td>
        <td>${user.login.username}</td>
        <td>${user.login.password}</td>
        <td>${user.nat}</td>
        <td>${user.dob.age}</td>
        <td>${user.dob.date}</td>
        <td>${user.cell}</td>  
        </tr>  
        `
        tbody.appendChild(row)
    }
    table.append(tbody)
    addStyleTotable(tbody)
}

function refreshTable() {
    while (tbody.children.length > 1) {
        tbody.children[1].remove()
    }

}




function sortTable(index, type, element) {
    console.log(tbody)

    function compare(rowA, rowB) {
        let rowDataA = rowA.cells[index].innerHTML;
        let rowDataB = rowB.cells[index].innerHTML;
        // console.log(rowDataA, rowDataB)
        switch (type) {
            case 'number':
                return rowDataA - rowDataB
            case 'string':
                if (rowDataA < rowDataB) return -1;
                else if (rowDataA > rowDataB) return 1
                else return 0
            case 'gender':
                return rowA.children[2].getAttribute('data') - rowB.children[2].getAttribute('data')
        }
    }
    let rows = [].slice.call(tbody.rows);
    rows.sort(compare);
    // rows.reverse()
    if (element.classList.contains('sorted')) {
        rows.reverse()
        element.classList.remove('sorted');
    } else {
        element.classList.add('sorted');
    }
    for (let i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i])
    }

    table.appendChild(tbody)

}

// event Listeners
submitBtn.addEventListener('click', () => {
    let requestConfig = `?results=${range.value}&gender=${selectGender.value}`
    refreshTable();
    let data = sendRequest(usersURL + requestConfig)
        .then(data => drawTable(data))
        .catch(err => console.log(err))


})

table.addEventListener('click', (e) => {
    let el = e.target;
    if (el.nodeName != 'TH') return
    console.log(el)
    let index = el.cellIndex;
    let type = el.getAttribute('data-type');
    console.log(index, type)
    sortTable(index, type, el);
    addStyleTotable(tbody)

})

range.addEventListener('input', updateValue);

function updateValue(event) {
    rangeCounter.textContent = event.target.value;
}