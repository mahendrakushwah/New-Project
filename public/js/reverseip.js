$("#spfcheck").submit(function (e) {
  e.preventDefault();
});



function IPCheck(req, res) {
    reverseipAPI();
}

function reverseText(data1, index) {
  $("#testingformat").append(
    `<div class="card" id = "testingremove" ><div class="row justify-content-md-center" ><h5 style = "margin-top : 15px;margin-left : 30px">Domain</h5>
      </div>
       <spam class="row justify-content-md-center" ><h6 style ="word-break: break-all; margin: 20px 30px 30px 60px;">${data1} </h6></spam> </div>
        `
  );
}

$("#dnstext").click(function(){
  $("#testingremove").remove();
 })

function reverseipAPI(data1) {
  // console.log(data1);
  var data1 = {
    ip: document.getElementById("domainId").value,

  };
  console.log(data1);
  api.DNS.reveresipTesting(
    data1,
    function (res) {
      const datatest = res.dataip
      console.log(datatest);
      //  $("#testingformat").remove();
       reverseText(datatest);
    },
    function (error) {
      console.log("error");
      //append this error
      console.log(error);
    }
  );
}
