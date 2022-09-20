async function dkimCheck() {
    var data = validate();
  
    api.verify.dkim(
        data,
        function (res) {
          
            res = JSON.parse(JSON.stringify(res));
           
            result(res.data);
        },
        async function (error) {
          
            showErr(error);
        }
    );
}
function validate() {
    var data = {};
    data.type = $("#type").val();
    data.domain = $("#domain").val();
    data.selector = $("#selector").val();
    return data;
}
function result(res) {
    // var jsonstr = res.data[0][0]
    // var json = jsonstr.split(";")

    // if (json[2].length > 155) {
    //     json[2] = json[2].substring(0, 154) + "...";
    // }
   

    $('#result').innerHtml = ' ';
    $('#result').append(
        '<div class="card"><div class ="body"><center><h2><b>Check Result!!</b></h2></center>' +
        '<div class="d-flex justify-content-center"><table class="table fs-5 table-responsive-md table-responsive-sm col-md-4 border">' +
        '<thead id="tHead">' +
        '</thead>' +
        '<tbody id="tableBody" class="text-left mb-2">' +
        '<tr style="padding:0px;">' +
        // '<tr><th><td> V </td><td>: </td><td>' + json[0] + '</td></th></tr>' +
        // '<tr><th><td> K </td><td>: </td><td>' + json[1] + '</td></th></tr>' +
        // '<tr><th><td> P </td><td>: </td><td>' + json[2] + '</th></tr>' +
        '<tr><th><td> P </td><td>: </td><td>' + res[0] + '</th></tr>' +
        '<tr><th><td> P </td><td>: </td><td>' + res[1] + '</th></tr>' +
        '<tr><th><td> P </td><td>: </td><td>' + res[2] + '</th></tr>' +
        '<tr><th><td> P </td><td>: </td><td>' + res[3] + '</th></tr>' +
        '<tr><th><td> P </td><td>: </td><td>' + res[4] + '</th></tr>' +


        '</tbody>' +

        '</table></div></div>'

    );
}




async function showErr(err) {
    $("#msg").append('<span style="color: red;">' + err.message + "</span>");
}