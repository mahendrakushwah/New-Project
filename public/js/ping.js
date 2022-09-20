// // $("#pingcheck").submit(function(e) {
// //     e.preventDefault();
// // });
// var data12 ={};
// function pingCheck(req, res) {
//    pingAPI();
// }



// //ping
function PINGdata(data1) {
  $("#result").append(
    `<table class="table fs-5 table-responsive-md table-responsive-sm table-responsive-lg " id = "tablechat" style = "justify-content: center;">
    <thead  style = "background-color: #9E9E9E; font-size : 18px"><tr>
    
    <th scope="col"><center style = "color : white">Host</center></th>
    <th scope="col"><center style = "color : white">IP</center></th>
    <th scope="col"><center style = "color : white">Time</center></th>
    <th scope="col"><center style = "color : white">Output</center></th>
    </thead>
    </tr><tr style="padding:0px; background-color : white; font-size : 15px">
            <th scope="row"><center>${data1.host}</center ></th>
            <th scope="row"><center>${data1.numeric_host}</center ></th>
            <th scope="row"><center>${data1.time}</center ></th>
            <th scope="row">${data1.output}</th>   
            </tr>
            
            </table>`

  );
}
// //ping tcp
function portData(data1) {
  $("#porttext").append(
    `<table class="table fs-5 table-responsive-md table-responsive-sm table-responsive-lg " id = "tablechat" style = "justify-content: center;">
    <thead  style = "background-color: #9E9E9E; font-size : 18px"><tr>
    
    <th scope="col"><center style = "color : white">Host</center></th>
    <th scope="col"><center style= "color : white">Port</center></th>
    <th scope="col"><center style= "color : white">Ip</center></th>
    <th scope="col"><center style= "color : white">Online</center></th>
    </thead>
    </tr><tr style="padding:0px; background-color : white; font-size : 18px">
            <th scope="row"><center>${data1.host}</center></th>
            <th scope="row"><center>${data1.port}</center></th>
            <th scope="row"><center>${data1.ip}</center></th>
            <th scope="row"><center>${data1.online}</center></th>
           
            </tr>
 
            </table>`

  );
}
 
// $("#pingtext").click(function(){
//   console.log("btn")
//   $("#result th").remove();
//   $("#porttext th").remove();
//  })

function pingAPI(data1){
  // console.log(data1);
  var data1={
    domain: document.getElementById('pingId').value,
    port : document.getElementById('portId').value 
  } 
  api.DNS.pingCheck(
    data1,
      function (res) {
        console.log(data1.port)
        if(data1.port == 'NA'){
        const constantdata = res.data;
        PINGdata(constantdata);
        }
        else{
               const portdetail = res.dataport
               portData(portdetail);
               
        }
      },
      function (error) {
          console.log('error');
          //append this error
        console.log(error);

      }
    );
}






// // var newFun = function async(req,res){
// //     console.log(req);

   
// // }
// // pingCheck();