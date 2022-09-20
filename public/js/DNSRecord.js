$("#pingcheck").submit(function (e) {
  e.preventDefault();
});

function MXHead(data1,index){
  $("#tablechat").append(
    ` <thead  style = "background-color : #9E9E9E"><tr style = "color : white"><th scope="col"><center>Host Name</center></th><th scope="col"><center>Priority</center></th></tr>
    </thead>`)
}


function MXdata(data1, index) {

  $("#tablechat").append(
    `
             <tr style="padding:0px;font-size : 15px;">
            <th scope="row"><center>${data1.exchange}</center></th>
            <td><center>${data1.priority}</center></td>
            </tr>`
  );
  
}

function NSHead(data1, index) {
  $("#tablechat").append(
    ` <thead  style = "background-color: #9E9E9E ; font-size : 18px"><tr style = "color : white"><th scope="col"><center>Name</center></th><th scope="col"><center>TTL</center></th>
    <th scope="col"><center>Type</center></th><th scope="col"><center>Value</center></th>
    </tr>
    </thead>`)
}
function NSdata(data1, index) {
  $("#tablechat").append(
    ` 
            <tr style="padding:0px;font-size : 15px;">
            <th scope="row"><center>${data1.name}</center></th>
            <td><center>${data1.ttl}</center></td>
            <td><center>${data1.type}</center></td>
            <td><center>${data1.value}</center></td>
            </tr>`
  );
}


function TXTHead(data1, index) {
  $("#tablechat").append(
    ` <thead  style = "background-color : #9E9E9E; font-size : 18px"><tr style = "color : white"><th scope="col"><center>Name</center></th><th scope="col"><center>TTL</center></th>
    <th scope="col"><center>Type</center></th><th scope="col"><center>Value</center></th>
    </tr>
    </thead>`)
}

function TXTdata(data1, index) {
  $("#tablechat").append(
    ` 
            <tr style="padding:0px;font-size : 15px;">
            <th scope="row"><center>${data1.name}</center></th>
            <td><center>${data1.ttl}</center></td>
            <td><center>${data1.type}</center></td>
            <td><center>${data1.value}</center></td>
            </tr>`
  );
}

function SOAHead(data1, index) {
  $("#tablechat").append(
    ` 
    <thead  style = "background-color : #9E9E9E ; font-size : 18px"><tr style = "color : white"><th scope="col"><center>Name</center></th><th scope="col"><center>TTL</center></th>
        <th scope="col"><center>Type</center></th><th scope="col"><center>Value</center></th>
        </tr>
        </thead>`)
}




function SOAdata(data1, index) {
  $("#tablechat").append(
    ` 
            <tr style="padding:0px;font-size : 15px;">
            <th scope="row"><center>${data1.name}</center></th>
            <td><center>${data1.ttl}</center></td>
            <td><center>${data1.type}</center></td>
            <td><center>${data1.value}</center></td>
            </tr>`
  );
}
function PTRdata(data1, index) {
  $("#tablechat").append(
    ` <thead  style = "background-color : #9E9E9E ; font-size : 18px"><tr style = "color : white"><th scope="col"><center>Name</center></th><th scope="col"><center>TTL</center></th>
    <th scope="col"><center>Type</center></th><th scope="col"><center>Value</center></th>
    </tr>
    </thead>
            <tr style="padding:0px;font-size : 15px;">
            <th scope="row"><center>${data1.name}</center></th>
            <td><center>${data1.ttl}</center></td>
            <td><center>${data1.type}</center></td>
            <td><center>${data1.value}</center></td>
            </tr>`
  );
}

function NAPTERdata(data1) {
  $("#tablechat").append(
    ` <thead  style = "background-color : #9E9E9E; font-size : 18px"><tr style = "color : white"  ><th scope="col"><center>Name</center></th><th scope="col"><center>TTL</center></th>
    <th scope="col"><center>Value</center></th>
    </tr>
    </thead>
            <tr style="padding:0px;font-size : 15px;">
            <th scope="row"><center>${data1[0].domain}</center></th>
            <td><center>${data1[0].ttl}</center></td>
            <td><center>${data1[0].value}</center></td>
            </tr>`
  );
}


$("#dnstext").click(function(){
  console.log("btn")
  $("#tablechat th").remove();
  $("#tablechat td").remove();

 })

function DNSCheck(req, res) {
  var data = {
    domain: document.getElementById("DNSName").value,
    selector: document.getElementById("DNSValue").value,
  };

  api.DNS.dnsCheck(
    data,
    function (res) {
      console.log(res);
      switch (data.selector) {
        case "MX":
          contentLength = res.data;
          console.log(contentLength, " content Length ")
          for (let index = 0;index <= contentLength.addresses.length;index++) {
            const data2 = res.data.addresses[index];
            console.log(res.data.addresses[0])
            if(data2 == res.data.addresses[0]){
              console.log(data2.exchange)
              MXHead(data2, index);
            }
            else{
            console.log(res.data.addresses[1])
            console.log("data[index]")
            MXdata(data2, index);
            }
          }
          break;
          case "NS":
            contentLength = res.data;
            console.log(contentLength.length)
            for (let index = 0;index <= contentLength.length;index++) {
              const data = res.data[index];
              if(data ==  res.data[0]){
                NSHead(data, index);
              }
              else{
              NSdata(data, index);
              }
            }
            break;
            case "TXT":
            contentLength = res.data;
            console.log(res)
            for (let index = 0;index <= contentLength.length;index++) {
              const data = res.data[index];
              if(data == res.data[0]){
                TXTHead(data, index);
              }
              else{
              TXTdata(data, index);
              }
            }
            break;
            case "SOA":
            contentLength = res.data;
            console.log(contentLength)
            for (let index = 0;index <= contentLength.length;index++) {
              const dataindex = res.data[index];
            
              if(dataindex == res.data[0]){
                SOAHead(dataindex, index);
                SOAdata(dataindex, index);
              }
              else{
                console.log("dataindex.name")
                SOAdata(dataindex, index);
              }
            }
            break;
            case "NAPTER":
              contentLength = res.data.answer;
              console.log(contentLength);
              console.log(data);
              NAPTERdata(contentLength);
              break;
              case "PTR":
                contentLength = res.data;
                console.log(contentLength)
                PTRdata(contentLength);
                break;
              
        default:
          break;
      }
      // append this result
    },
    function (error) {
      //apend this eror
      console.log(error);
    }
  );
}
