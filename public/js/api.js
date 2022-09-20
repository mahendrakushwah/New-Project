var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function query(e, t, n, r, success, error, showError) {
  showError = typeof showError !== "undefined" ? showError : true;
  if (typeof mprogress != "undefined") {
    mprogress.start();
  }
  $("#loader-wrap").show();
  var params = {};
  if (t == "GET" && n != undefined) {
    params = $.extend({}, params, n);
    n = undefined;
  }
  return $.ajax({
    url: "/api" + e + "?" + jQuery.param(params),
    async: r,
    method: t,
    data: n != undefined ? JSON.stringify(n) : "",
    dataType: "json",
    contentType: "application/json",
    success: function (msg) {
      if (typeof mprogress != "undefined") {
        mprogress.end(true);
      }
      $("#loader-wrap").hide();
      success(msg);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (typeof mprogress != "undefined") {
        mprogress.end(true);
      }
      $("#loader-wrap").hide();
      if (showError)
        showAPIError(
          jqXHR.status,
          jqXHR.responseJSON ?
          jqXHR.responseJSON :
          jqXHR.responseText === "Unauthorized" ? {
            errors: ["Invalid Credentials"]
          } :
          jqXHR.responseText
        );
      if (error != undefined) error(jqXHR.responseJSON);
    },
  });
}

function mediaQuery(e, t, n, r, success, error) {
  if (typeof mprogress != "undefined") {
    mprogress.start();
  }
  return $.ajax({
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener(
        "progress",
        function (evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            $(".ajax-file-loading").css({
              width: percentComplete * 100 + "%",
            });
            if (percentComplete === 1) {
              $(".ajax-file-loading").addClass("hide");
            }
          }
        },
        false
      );
      return xhr;
    },
    url: "/api" + e,
    async: r,
    method: t,
    data: n != undefined ? n : "",
    mimeType: "multipart/form-data",
    processData: false,
    contentType: false,
    success: function (msg) {
      if (typeof mprogress != "undefined") {
        mprogress.end(true);
      }
      success(msg);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (typeof mprogress != "undefined") {
        mprogress.end(true);
      }
      showAPIError(
        jqXHR.status,
        jqXHR.responseJSON ?
        jqXHR.responseJSON :
        jqXHR.responseText === "Unauthorized" ? {
          errors: ["Invalid Credentials"]
        } :
        jqXHR.responseText
      );
      if (error != undefined) error(jqXHR.responseJSON);
    },
  });
}

function queryURL(e, t, n, r, success, error) {
  if (typeof mprogress != "undefined") {
    mprogress.start();
  }
  return $.ajax({
    url: e,
    async: r,
    method: t,
    data: n != undefined ? n : "",
    processData: false,
    contentType: false,
    success: function (msg) {
      if (typeof mprogress != "undefined") {
        mprogress.end(true);
      }
      success(msg);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (typeof mprogress != "undefined") {
        mprogress.end(true);
      }
      showAPIError(
        jqXHR.status,
        jqXHR.responseJSON ?
        jqXHR.responseJSON :
        jqXHR.responseText === "Unauthorized" ? {
          errors: ["Invalid Credentials"]
        } :
        jqXHR.responseText
      );
      if (error != undefined) error(jqXHR.responseJSON);
    },
  });
}

var api = {
  DNS: {
    pingCheck: function (data,success, error) {
      return query("/pingCheck","POST",data,1,success,error);
    },
    dnsCheck: function (data,success, error) {
      return query("/dnsCheck","POST",data,1,success,error);
    },
    spfTesting: function (data,success, error) {
      return query("/spfInfo","POST",data,1,success,error);
    }, 
    dkimTesting: function (data,success, error) {
      return query("/dkimInfo","POST",data,1,success,error);
    },
    dimarcTesting: function (data,success, error) {
      return query("/dimarcInfo","POST",data,1,success,error);
    }, 
    reveresipTesting: function (data,success, error) {
      return query("/reverseiptest","POST",data,1,success,error);
    }, 
    spamc: function (data,success, error) {
      return query("/spamc","POST",data,1,success,error);
    }, 
  },
  billing : {
    invoicesList: function (success, error) {
      return query("/invoices", "GET", null, 1, success, error);
    },
  },
    Monitor: {
      monitor: function (data,success, error) {
        return query("/monitordata","POST",data,1,success,error);
      },   
  },
 
};