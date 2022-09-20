
$("#dimarccheck").submit(function(e) {
    e.preventDefault();
  });
  
  
  function dimarcCheck(req, res) {
    dimarcAPI();
  }
  

  function dmarcText(data1, index) {
    $("#testingformat").append(
      `<div class="container" id = "testingremove"><div class="row justify-content-md-center" ><h5>DMARC Record </h5>
      </div>
       <spam class="row justify-content-md-center"><div style = "font-size : 15px">${data1.record} </div></spam> </div>`
    );
  }

 
  function dmarcDis(data1, index) {
    $("#tablechat").append(
      ` <thead  style = "background-image: gray;font-size : 18px"><tr><th scope="col"><center>Tag</center></th>
      <th scope="col"><center>Value</center></th><th scope="col"><center>explanation</center></th>
      </tr>
      </thead>
              <tr style="padding:0px;font-size : 15px">
              <td><center>v</center></td>
              <td><center>${data1.tags.v.value}</center></td>
              <td>${data1.tags.v.description}</td>
             
              </tr>
              <tr style="padding:0px;font-size : 15px">
              <td><center>p</center></td>
              <td><center>${data1.tags.p.value}</center></td>
              <td>${data1.tags.p.description}</td>
             
              </tr>
              <tr style="padding:0px;font-size : 15px">
              <td><center>rua</center></td>
              <td><center>${data1.tags.p.value}</center></td>
              <td>${data1.tags.p.description}</td>
             
              </tr>
              `
    );
  }
  $("#dnstext").click(function(){
    $("#testingremove").remove();
   })

  $("#dnstext").click(function(){
    console.log("btn")
    $("#tablechat th").remove();
    $("#tablechat td").remove();
  
   })


  function dimarcAPI(data1){
    // console.log(data1);
    var data1={
      domain: document.getElementById('domainId').value,
      
    } 
    api.DNS.dimarcTesting(
      data1,
        function (res) {
       console.log(res)
      const dataDimarc = res.data
      dmarcText(dataDimarc)
      dmarcDis(dataDimarc)
      const tags = dataDimarc.tags
      console.log(tags)
      for(let i = 0; i< tags.length; i++){
        const dataDim = tags[i]
        console.log(dataDim)
      }
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