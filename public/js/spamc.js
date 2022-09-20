$("#spamccheck").submit(function (e) {
  e.preventDefault();
});

function spamcpost(req, res) {
  spamc();
}

function spamc(data1) {
  // console.log(data1);

  api.DNS.spamc(
    function (res) {
      console.log("responsible");
    },
    function (error) {
      console.log("error");
      //append this error
      console.log(error);
    }
  );
}

// var newFun = function async(req,res){
//     console.log(req);

// }
// pingCheck();
