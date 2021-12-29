class DataList {
    constructor() {
        this.dataService = new DataService();
        this.addEventListeners();
    }


    addEventListeners() {
        document.getElementById('form').addEventListener('submit', event =>
            this.genericSubmit(event));
    }

    async genericSubmit(event) {
        const gender = document.querySelector('#my-selector');
        const count = document.querySelector('#my-range');

        const data = await this.dataService.getData(gender.value, parseInt(count.value));

        this.renderData(data);

    }

    async renderData(data) {
        const tableData = document.querySelector('#my_tbody');

        let dataListDomStr = "";

        for (let item of data.results) {
            dataListDomStr += `<tr> 
            <td><img src="${item.picture.thumbnail}" alt="photo" > </td>
            <td> ${item.name.first} ${item.name.last}</td>
            <td> ${item.gender === 'male' ? "\u2642":"\u2640" }  </td>
            <td> ${item.location.city}</td>
            <td> ${item.email}</td>
            <td> ${item.login.username}</td>
            <td> ${item.login.password}</td>
            <td> ${item.nat}</td>
            <td> ${item.dob.age}</td>
            <td> ${item.dob.date}</td>
            <td> ${item.cell}</td>
        </tr>`;
        }

        tableData.innerHTML = dataListDomStr;
    }

}