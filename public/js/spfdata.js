



function spfCheck(req, res) {
   spfAPI();
}
function spfText(data1, index) {
  $("#testingformat").append(
    ` <div class="card" id = "testingremove" ><div class="row justify-content-md-center" ><h5 style = "margin-top : 15px; margin-left : 30px">SPF Record </h5>
    </div>
     <spam class="row justify-content-md-center" ><div style ="word-break: break-all; margin: 15px 30px 30px 60px;">${data1} </div></spam> </div>
      `
  );
}
$("#dnstext").click(function(){
  $("#testingremove").remove();
 })
function spfAPI(data1){
  // console.log(data1);
  var data1={
    domain: document.getElementById('domainId').value,
   
  } 

  api.DNS.spfTesting(
    data1,
      function (res) {
     console.log(res)
       const dataFormat = res.data
          spfText(dataFormat);
      },
      function (error) {
          console.log('error');
          //append this error
          console.log(error);

      }
    );
}






// var newFun = function async(req,res){
//     console.log(req);

   
// }
// pingCheck();