var req = new XMLHttpRequest();
var btn = document.getElementById('get-details');
var div = document.getElementById('results');
var count = 0;

btn.addEventListener('click', function () {
    req.open('GET', 'Question7.json');
    req.onload = function () {
        if (req.status === 200) {
            var data = JSON.parse(req.responseText);
            console.log(data);
            renderHtml(data);
        } else {
            console.log('ERROR! Server did not respond');
        }
    };

    req.send();
    count++;
    if (count >= 1) {
        btn.setAttribute('disabled', 'disabled');
    }
});

function renderHtml(data) {
    var str = '';
    str += '<table><tr><th>Name</th> <th>Age</th> <th>Weight</th> <th>Type</th> <th>Likes</th></tr>';
    for (i = 0; i < data.length; i++) {
        str += '<tr><td>' + data[i].name + '</td>';
        str += '<td>' + data[i].age + '</td>';
        str += '<td>' + data[i].weight + '</td>';
        str += '<td>' + data[i].type + '</td>';
        str += '<td>' + data[i].like + '</td></tr>';
    }
    str += '</table>';
    div.insertAdjacentHTML('beforebegin', str);
}