var availableColor = {
    "1": "#e8938e",
    "2": '#ea837c',
    "3": "#f5746b",
    "4": "#f1655c",
    "5": "#d2534b",
    "6": "#CF382D",
    "7": "#C3342A",
    "8": "#c3372e",
    "9": "#B63128",
    "10": "#9a0a00"
}

var errors = [];
var successToasts = [];
var pageNoCollection = [];
var limitCollection = [];
var totalPages = [];

pageNoCollection[0] = 1;
limitCollection[0] = 10;

var getColor = function(percentage) {
    if(percentage <= 33.33)
        return '#CC402B';
    if((percentage > 33.33 && percentage <= 66.66))
        return '#F29255';
    if((percentage > 66.66 && percentage <= 100))
        return '#7cc761';
}

var clearErrors = function(key){
    if(key){
        successToasts.splice(successToasts.indexOf(key), 1);
        if(successToasts.length == 0)
            $('#showToast').html('');
    }
    $('#toast-error #desc #errorList').html('');
    for(var key in errors){
        $('#' + key).removeClass('is-invalid');
    }
    errors = [];
}
var validatePhoneNumber = function(mobile) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(mobile.match(phoneno) == false){
        return false;
    }
    return true;
}

var CheckIsValidDomain = function(domain) { 
	var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
	return domain.match(re);
} 

var validateEmail = function(emailField){
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(emailField) == false) {
        return false;
    }
    return true;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

function secondsToTime(secs){
    var hours = Math.floor(secs / (60 * 60));
   
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
 
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    
    return hours.pad()+":"+minutes.pad()+":"+seconds.pad();
}

function downloadCSV(fileName, content){
    var items = content;
    var replacer = function (key, value) { return value === null ? '' : value }
    var header = Object.keys(items[0])
    var csv = items.map(function (row) {
        return header.map(function (fieldName) { 
            return JSON.stringify(row[fieldName], replacer) 
        }).join(',');
    })
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')

    var link = document.createElement("a");
    link.id = "lnkDwnldLnk";
    document.body.appendChild(link);
    blob = new Blob([csv], { type: 'text/csv' });
    var csvUrl = window.webkitURL.createObjectURL(blob);
    var filename = fileName + '.csv';
    jQuery("#lnkDwnldLnk")
        .attr({
            'download': filename,
            'href': csvUrl
        });
    jQuery('#lnkDwnldLnk')[0].click();
    document.body.removeChild(link);
}

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
  
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}

function isPageHidden(){
    return document.hidden || document.msHidden || document.webkitHidden || document.mozHidden;
}

var hasError = function(){
    return Object.keys(errors).length > 0;
}

var addErrorToList = function(msg){
    $('#toast-error #errorList').append('<li>'+msg+'</li>');
}

var addError = function(key, msg){
    errors[key] = msg;
}

var showErrors = function(){
    for(var key in errors){
        $('#' + key).addClass('is-invalid');
        addErrorToList(errors[key]);
    }
    launchToast('error');
}

var flashModal = function(modelId, status, msg){

}

var flashError = function(type, tagId, msg){
    if(type=='model'){
        flashModal(tagId, 'error', msg);
    }
}

var isURL = function(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}

var addPagination = function(pages, count, id) {
    if(pageNoCollection[(id == undefined)?0:id] == undefined){
        pageNoCollection[(id == undefined)?0:id] = 1;
    }
    totalPages[(id == undefined)?0:id] = pages;
    $('#pagination'+((id == undefined)?'':id)).html('<li class="page-item"><a class="page-link" href="#" aria-label="Previous" onclick="changePage(0, -1, '+((id == undefined)?'0':id)+')"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>');
    if(getPageNo(id) > 2){
        $('#pagination'+((id == undefined)?'':id)).append('<li class="page-item'+ (1 == getPageNo(id)? ' active': '') +'" onclick="changePage(1, 0, '+((id == undefined)?'0':id)+')"><a class="page-link" href="#">1</a></li>');    
        if(getPageNo(id) > 3)
            $('#pagination'+((id == undefined)?'':id)).append('<li class="page-item"><a class="page-link" href="#">...</a></li>');    
    }
    for(var i=(getPageNo(id)>1?(getPageNo(id)-1):1);i<=getPageNo(id)+1 && i<=pages ;i++){
        $('#pagination'+((id == undefined)?'':id)).append('<li class="page-item'+ (i == getPageNo(id)? ' active': '') +'" onclick="changePage(' + i + ', 0, '+((id == undefined)?'0':id)+')"><a class="page-link" href="#">' + i + '</a></li>');
    }
    if(getPageNo(id) < pages-1){
        if(getPageNo(id) <= pages-3) 
            $('#pagination'+((id == undefined)?'':id)).append('<li class="page-item"><a class="page-link" href="#">...</a></li>');    
        if(getPageNo(id) < pages){
            $('#pagination'+((id == undefined)?'':id)).append('<li class="page-item'+ (pages == getPageNo(id)? ' active': '') +'" onclick="changePage(' + pages + ', 0, '+((id == undefined)?'0':id)+')"><a class="page-link" href="#">' + pages + '</a></li>');    
        }
    }
    $('#pagination'+((id == undefined)?'':id)).append('<li class="page-item"><a class="page-link" href="#" aria-label="Next" onclick="changePage(0, 1, '+(((id == undefined)?'':id))+')"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>');
    $('#pagecount'+((id == undefined)?'':id)).html('<div><span class="font-weight-bold">'+(count?getPageNo(id)*getLimit()-getLimit()+1:'0')+'-'+(getPageNo(id)*getLimit()>count?count:getPageNo(id)*getLimit())+'</span> of '+count+' records</div>');
    $('#gotopage'+((id == undefined)?'':id)).html('<form class="form-inline my-2 my-lg-0" onSubmit="return false"> Go To Page <input class="form-control mr-sm-2 ml-2 w-25 form-control-sm"  type="search" id="pageno'+((id == undefined)?'':id)+'" aria-label="Search"> <button type="button" onclick="pageNo('+id+','+pages+')" class="btn btn-primary"><i class="fas fa-chevron-right"></i></button> </form>');
}

var pageNo = function(id, pages) {
    var pageNo = parseInt($('#pageno'+((id == undefined)?'':id)).val());
    if(id == undefined)
        id = 0;
    if(pageNo <= pages){
        setPage(pageNo, id);
        reloadList(id);
    }
}

function launchToast(type) {
    successToasts.push(type);
    if(!type || type == 'success'){
        type = '';
    }else if(type == 'error'){
        type = '-error';
    }
    $('#toast'+type).addClass('show');
    $('#toast'+type).show()
    $('html, body').animate({scrollTop:0},500);
    setTimeout(function(){ 
        $('#toast'+type).removeClass('show'); 
        clearErrors(type);
     }, 3000);
}

function showError(msg){
    clearErrors();
    if(msg != undefined){
        if(msg.message != undefined){
            addErrorToList(msg.message);
        }else{
            addErrorToList(msg);
        }
    }else{
        addErrorToList('Something went wrong!');                
    }
    launchToast('error');
}

function showAPIError(errorCode, msg){
    if(errorCode == 500 || errorCode == 401){
        if(msg.errors != undefined){
            clearErrors();
            var count = 0;
            msg.errors.forEach(function(err){
                addError(count++, err);
            });
            showErrors();
        }
    }else if(errorCode == 400){
        if(msg.isJoi){
            clearErrors();
            var count = 0;
            msg.details.forEach(function(detail){
                addError(count++, detail.message);
            });
            showErrors();
        }
    }
}

function timeInAgoFormat(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

function showSuccess(msg){
    var randomId = makeid(5);
    var html = '<div class="toast show" id="toast'+randomId+'" role="alert" aria-live="assertive" aria-atomic="true" data-delay="1000"> <div class="toast-body"><span style="color:forestgreen"><i class="fa fa-check-circle"></i> '+msg+'</span></div> </div>';
    $('#showToast').append(html);
    launchToast(randomId);
}

function showPageLoader(){
    if(typeof mprogress != 'undefined'){
        mprogress.start();
    }
}

function hidePageLoader(){
    if(typeof mprogress != 'undefined'){
        mprogress.end(true);
    }
}

var getLimit = function(id) {
    if(id == undefined)
        id = 0;
    return this.limitCollection[id];
}

var setLimit = function (limit, id) {
    if(id == undefined){
        id = 0;
    }
    limitCollection[id] = limit;
} 

var getPageNo = function(id) {
    if(id==undefined)
        id = 0;
    return this.pageNoCollection[id];
}

var setPage = function(pageNo, id) {
    if(id == undefined)
        id = 0;
    pageNoCollection[id] = pageNo;
}

var changePage = function(pageNo, incrementPage, id){
    if(id == undefined)
        id = 0;
    if(incrementPage == 0){
        this.pageNoCollection[id] = pageNo;
    }else{
        if((incrementPage < 0 && this.pageNoCollection[id] > 1) || (incrementPage > 0 && this.totalPages[id] > this.pageNoCollection[id])){
            this.pageNoCollection[id] = this.pageNoCollection[id] + incrementPage;
        }
    }
    reloadList(id);
}

var getQueryParam = (query, param) => {
    const urlParams = new URLSearchParams(query);
    const myParam = urlParams.get(param);
    return myParam
}

var dataDmarc = {};
    var dmarcGenerate = function(data, type) {
    var record = '';
    var forwardedRecord = 'v=DMARC1; ' + 'p=' + data.p+ '; ';
    var directRecord = 'v=DMARC1; ' + 'p=' + data.p+ '; ';
    var arrayRuaf = data.rua;
    var arrayRuad = data.rua;
    if(arrayRuaf){
        for(var i = 0;i<arrayRuaf.length;i++){
            arrayRuaf[i] = 'mailto:'+arrayRuaf[i];
        }
        var ruaMailTof = 'rua='+arrayRuaf.join(', ');
        forwardedRecord =  forwardedRecord + ruaMailTof+'; '
    }
    if(arrayRuad){ // arrayruad is assign call by reference mailto is already added
        arrayRuad.push("mailto:"+type);
        var ruaMailTod = 'rua='+arrayRuad.join(', ')
        directRecord = directRecord + ruaMailTod+'; '
    }else{
        directRecord = directRecord + 'rua=mailto:'+type;
    }
    var arrayRuf = data.ruf;
    if(arrayRuf){
        for(var i = 0;i<arrayRuf.length;i++){
            arrayRuf[i] = 'mailto:'+arrayRuf[i];
        }
        var rufMailTo = 'ruf='+arrayRuf.join(',')+'; fo=' + data.fo;
        record = record + rufMailTo+'; '
    }
    if(data.sp)
        record = record +'sp=' + data.sp + '; '
    if(data.adkim == 's')
        record =  record +'adkim='+ data.adkim +'; ';
    if(data.aspf == 's')
        record = record +'aspf='+data.aspf +'; ';
    if(data.pct < 100)
        record = record +'pct=' +data.pct + ';';
    dataDmarc.forwardedDmarc = forwardedRecord + record;
    dataDmarc.directDmarc = directRecord + record;
    return dataDmarc;
}