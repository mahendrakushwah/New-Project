function resultListData(res, index) {
  $("#tableBody").append(
    ` 
             <tr style="padding:0px;">
            <th scope="row"><center>${res.userId}</center></th>
            <td><center>${res.email}</center></td>
            <td><center>${res.emailCount}</center></td>
            <td><center>$ ${res.price * 0.01}</center></td>
            <td><center>${res.status}</center></td>
            <td><center>${res.customerId}</center></td>
            <td><center>${res.paymentId}</center></td>
            </tr>`
  );
}
function invoicesList() {
  api.billing.invoicesList(
    function (res) {
      contentLength = res.data;
  console.log(contentLength.length)
      for (let index = 0; index <= contentLength.length; index++) {
        const data = res.data[index];

        resultListData(data, index);
        // resultListData(data, index);
      }
      // if (res) {
      //   setPagination();
      // }
    },
    function (error) {
      err = JSON.parse(error);
    }
  );
}

$(document).ready(function () {
  invoicesList();
});
