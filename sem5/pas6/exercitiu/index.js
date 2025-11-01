const apiUrl = 'http://localhost:8000/api/'

async function get(url) {
    return (await axios.get(url)).data
}

async function post(url, body) {
    return (await axios.post(url, JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } })).data
}

async function loadTable() {
    let data = await get(apiUrl + "getList")
    let tableDiv = document.getElementById('tableData')

    if (!data || !tableDiv) {
        return
    }
    let myTable = document.getElementById('myTable')
    if (myTable)
        myTable.remove
    let myHtmlCode = []
    myHtmlCode.push("<table id='myTable' >")
    myHtmlCode.push('<thead>')
    myHtmlCode.push('<tr> <th hidden> Id </th> <th> Name </th> <th> Age </th> </tr>')
    myHtmlCode.push('</thead>')
    myHtmlCode.push('<tbody>')

    for (let item of data)
        myHtmlCode.push(`<tr> <td hidden> 
    ${item.id} </td> <td> ${item.name} </td> <td> ${item.age} </td> </tr>`)

    myHtmlCode.push('</tbody>')
    myHtmlCode.push('</table>')

    tableDiv.innerHTML = myHtmlCode.join("")
}

async function sendData() {
    let name = document.getElementById('inputName').value
    let age = document.getElementById('inputAge').value

    if (!name || !age) {
        alert('You must enter a name and a age')
        return
    }

    await post(apiUrl + "postList", { name: name, age: age })
    await loadTable()

}

loadTable()


async function getDataById() {
    let id = document.getElementById('inputId').value;
    let resultDiv = document.getElementById('resultData');

    if (!id) {
        resultDiv.innerHTML = "<p style='color: red;'>Va rugam introduceti un ID.</p>";
        return;
    }

    resultDiv.innerHTML = `<p>Se cauta ID: ${id}...</p>`;

    try {
        let item = await get(apiUrl + "getItem/" + id);

        if (item) {
            resultDiv.innerHTML = `
                <h4>Rezultat pentru ID: ${item.id}</h4>
                <p><strong>Nume:</strong> ${item.name}</p>
                <p><strong>Varsta:</strong> ${item.age}</p>
            `;
        } else {
            resultDiv.innerHTML = `<p style='color: orange;'>Nu s-a gasit niciun rezultat pentru ID-ul ${id}.</p>`;
        }

    } catch (error) {
        console.error("Eroare la preluarea datelor dupa ID:", error);
        resultDiv.innerHTML = `<p style='color: red;'>Eroare: Nu s-a putut gasi resursa (ID: ${id}).</p>`;
    }
}