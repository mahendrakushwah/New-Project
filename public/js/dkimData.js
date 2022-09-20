


$("#spfcheck").submit(function(e) {
    e.preventDefault();
  });
  function dkimCheck(req, res) {
     dkimAPI();
  }
  function dkimText(data1, index) {
    $("#testingformat").append(
      ` <div class="card" ><div class="row justify-content-md-center" ><h5 style = "margin-top : 15px; margin-left: 30px"> DKIM Record </h5>
      </div>
       <spam class="row justify-content-md-center" ><div style ="word-break: break-all; margin: 15px 30px 30px 60px;font-size : 15px">${data1} </div></spam> </div>
        `
    );
    }
  function dkimAPI(data1){
    // console.log(data1);
    var data1={
      domain: document.getElementById('domainId').value,
      port : document.getElementById('pingId').value 
    } 
    console.log(data1)
    api.DNS.dkimTesting(
      data1,
        function (res) { 
        const datatest = res.data
     //  $("#testingformat").remove();
       dkimText(datatest)
        },
        function (error) {
            console.log('error');
            //append this error
            console.log(error);
        }
      );
  }
  



