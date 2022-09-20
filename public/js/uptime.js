$("#pingcheck").submit(function(e) {
    e.preventDefault();
});

function uptime(req, res) {
    montiorUptime();
 }

function blackList(res){
    const stringres = res.listed.toString();
  
    $("#tablechat").append(
    `<tr style="padding:0px; background-color : white;" id = "list">
                <th scope="row"><center>${res.blacklist}</center></th>
                <th scope="row" id = "listed"><center>${stringres.toUpperCase()}</center></th></tr>`
      );
}
$("#btnbox").click(function(){
$("#list th").remove();
})


function montiorUptime(data1){
// console.log(data1);
var data1={
    domain: document.getElementById('pingId').value,    
} 
api.Monitor.monitor(
    data1,
    function (res) {
   //console.log(res)
   var dnslooptest = res.data
   try {
    for(let i = 0 ; i<= dnslooptest.length ; i++){    
        const data = res.data[i]; 
        console.log(data.blacklist);
        console.log(typeof data.listed)
        console.log("typeofdata")
        blackList(data);
    } 
   } catch (error) {
       console.log(error)
   }
  
    },
    function (error) {
        console.log('error');
        //append this error
        console.log(error);
    }
    );
}