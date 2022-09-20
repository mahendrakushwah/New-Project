$('#sidebarToggle').on('click', function(){
    $('.burger').css("display", "block");
});

$('.burger').on('click' , function(){
    if ($(window).width() < 768) {
        $('.burger').css("display", "block");
    } else{
        $('.burger').css("display", "none");
    }
})

function active_sidebar() {
    var params = window.location.pathname;
    // console.log(params);
    if( params === '/single-email' || params === '/dashboard'){
        $('#single-email').addClass("white");
        $('#single-email i').addClass("white");
        $("#bulk-email, #api-generate, #integrated-tools, #shareCredit, #integrations, #orders, #invoices, #buyCredits").each(function(){
            $(this).removeClass("white");
        });
    } else if(params === '/bulk-email'){
        $('#bulk-email').addClass("white");
        $('#bulk-email i').addClass("white");
        $("#single-email, #api-generate, #integrated-tools, #shareCredit, #integrations, #orders, #invoices, #buyCredits").each(function(){
            $(this).removeClass("white");
        });
    } else if(params === '/api-generate'){
        $('#api-generate').addClass("white");
        $('#api-generate i').addClass("white");
        $("#bulk-email, #single-email, #shareCredit, #integrated-tools, #integrations, #orders, #invoices, #buyCredits").each(function(){
            $(this).removeClass("white");
        });
    } else if(params === '/integrated-tools'){
        $('#integrated-tools').addClass("white");
        $('#integrated-tools i').addClass("white");
        $("#bulk-email, #shareCredit, #api-generate, #single-email, #integrations, #orders, #invoices, #buyCredits").each(function(){
            $(this).removeClass("white");
        });
    } else if(params === '/integrations'){
        $('#integrations').addClass("white");
        $('#integrations i').addClass("white");
        $("#bulk-email, #api-generate, #shareCredit, #integrated-tools, #single-email, #orders, #invoices, #buyCredits").each(function(){
            $(this).removeClass("white");
        });
    } else if(params === '/orders'){
        $('#orders').addClass("white");
        $('#orders i').addClass("white");
        $("#bulk-email, #shareCredit, #api-generate, #integrated-tools, #single-email, #integrations, #invoices, #buyCredits").each(function(){
            $(this).removeClass("white");
        });
    } else if(params === '/invoices'){
        $('#invoices').addClass("white");
        $('#invoices i').addClass("white");
        $("#bulk-email, #shareCredit, #api-generate, #integrated-tools, #single-email, #integrations, #orders, #buyCredits").each(function(){
            $(this).removeClass("white");
        });
    } else if(params === '/buyCredits'){
        $('#buyCredits').addClass("white");
        $('#buyCredits i').addClass("white");
        $("#bulk-email, #shareCredit, #api-generate, #integrated-tools, #single-email, #integrations, #orders, #invoices").each(function(){
            $(this).removeClass("white");
        });
    
    } else if(params === '/shareCredit'){
    $('#shareCredit').addClass("white");
    $('#shareCredit i').addClass("white");
    $("#bulk-email, #api-generate, #integrated-tools, #single-email, #integrations, #orders, #invoices, #buyCredits").each(function(){
        $(this).removeClass("white");
        });
    }
}

active_sidebar();

$(document).ready(function(){
    if ($(window).width() < 768) {
        $('.sidenav').addClass("toggled")
    }
});


