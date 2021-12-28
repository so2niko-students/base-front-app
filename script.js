const usersURL = "https://randomuser.me/api/";

const female = 'https://w7.pngwing.com/pngs/39/57/png-transparent-gender-symbol-sign-venus-transgender-symbol-miscellaneous-cross-venus.png',
    male = 'https://img2.freepng.ru/20180730/uvg/kisspng-mars-gender-symbol-planet-symbols-jrnsymbolen-mars-5b5e9fda8a85b7.5860453015329279625674.jpg'


// menu component
let selectGender = document.querySelector('#selectGender'),
    range = document.querySelector('#data-range'),
    submitBtn = document.querySelector('#submitBtn');
// table component
let table = document.querySelector('#table');
let tbody = document.createElement('tbody')


// get data from api
function sendRequest(url, requestConfig) {
    return fetch(url + requestConfig).then(response => {
        return response.json();
    })
}


// add some style to table
function addStyleTotable(tbody) {
    for (let i = 0; i < tbody.children.length; i++) {

        tbody.children[i].classList.remove('green-tr')
    }
    for (let i = 0; i < tbody.children.length; i++) {
        if (i % 2 != 0) {
            tbody.children[i].classList = 'green-tr'
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
        <td data="${user.gender == 'female' ? 0 : 1 }"><img src="${user.gender == 'female' ? female : male }" 
     width='30px'></td>
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




function sortTable(index, type) {
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
                console.log()
        }
    }

    let rows = [].slice.call(tbody.rows);
    rows.sort(compare);


    for (let i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i])
    }

    table.appendChild(tbody)

}

// event Listeners
submitBtn.addEventListener('click', () => {
    let requestConfig = `?results=${range.value}&gender=${selectGender.value}`
    refreshTable();

    let data = sendRequest(usersURL, requestConfig)
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



    sortTable(index, type);
    addStyleTotable(tbody)

})