function addRow(id, data){
    var table = document.getElementById(id);
    var row = table.insertRow(0);
    var i=0;
    data.array.forEach(element => {
        var col = row.insertCell(i);
        col.innerHTML = element[Object.keys(myobj)[i]]
        i++;
    });
}