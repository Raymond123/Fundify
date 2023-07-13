function addRow(id, data){
    var table = document.getElementById(id);
    var row = table.insertRow(1);
    var i=0;
    data.forEach(element => {
        for(const key in element){
            var col = row.insertCell(i);
            col.innerHTML = element[key];
            i++;
        }
    });
}