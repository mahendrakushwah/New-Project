// toggle checkboxes
if (document.getElementById("selectall")) {
  document.getElementById("selectall").onclick = function () {
    var checkboxes = document.getElementsByName("email");
    for (var checkbox of checkboxes) {
      checkbox.checked = this.checked;
    }
  };
}
// select email by category
// get all checkboxes in category by classname
// get textarea
// aet value of checkboxes to textarea

  //  set value of textarea to selected checkboxes
   $(document).ready(function () {
     $(".form-check-input").click(() => {
       let text = [];
       $(".form-check-input:checked").each(function () {
         text.push($(this).val());
       });
       console.log(text.shift())
       $("#selectedIds").val(text);
     });
   });

  //  copy to clipboard
const Copy = (textfield) => {
      /* Get the text field */
  let copyText = document.getElementById(textfield);
      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText.value);
    }


// generate random numbers 
   const tokenGenerator = () => {
    let  result           = '';
    let  characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let  charactersLength = characters.length;
    for ( let  i = 0; i < 4; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

// create mail ID code
if (document.getElementById("tokengenerator")) {
  const x = document.getElementById("tokengenerator");
  const tokenfield = document.createElement("INPUT");
  tokenfield.setAttribute("type", "text");
  let word1 = tokenGenerator();
  let word2 = tokenGenerator();
  let tokenvalue = `${word1}-xEmail-${word2}`;
  tokenfield.setAttribute("value", tokenvalue);
  tokenfield.setAttribute("id", "token");
  tokenfield.setAttribute("class", "form-control");
  x.appendChild(tokenfield);
}

   // create link element to fetch results
if (document.getElementById('token')) {
  const mailtoken = document.getElementById('token').value
  const a = document.createElement('a');
  const linkText = document.createTextNode("View Results");
  a.appendChild(linkText);
  a.title = "view-result";
  a.className = "btn btn-bg btn-primary";
  a.href = `/manualtestresult/${mailtoken}`;
  
  const y = document.getElementById('result-button')
y.appendChild(a);
}

// define mail-fetching function
if (document.getElementById('resultstatus').value === 'failed') {
  const fetchMails = () => {
    const mailtoken = document.getElementById("mailtoken").value;
    const url = `/fetchmanualmails/${mailtoken}`;
    fetch(url).then((response) => response.json())
      .then((result) => {
          // clearInterval(fetchMailsatInterval);
          // find amount landed in inbox and spam
          
                let inbox = 0
                let spam = 0
       
        result.recipients.forEach(recipient => {
          let tr = document.getElementById(recipient.address);
          if (!tr) {
              if (recipient.boxname == "Inbox" || recipient.boxname == "INBOX") {
                inbox ++
                console.log('inbox: ', inbox)
              }

              if (recipient.boxname.includes("Spam") || recipient.boxname.includes("Junk")) {
                spam ++
                console.log('spam: ', spam)
            }
            console.log(inbox)
            let total = result.total;
            let inboxpercent = inbox / total * 100;
            let spampercent = spam / total * 100;
            let missingresult = total - result.recipients.length;
                  
            console.log(inboxpercent, inbox, spam);
            

              if (spampercent > 0) {
                document.getElementById('nospam').innerHTML = `${spampercent} Spam Detected`
              }
              if (spampercent == 0) {
                document.getElementById('nospam').innerHTML = 'Hurray! No Spam Detected!'
              }
          
              document.getElementById('inboxprogress').innerText = `${Math.floor(inboxpercent)} %`
              document.getElementById('inboxprogress').style.width = `${Math.floor(inboxpercent)}%`
              document.getElementById('spamprogress').innerText = `${Math.floor(spampercent)}%`
              document.getElementById('spamprogress').innerText = `${Math.floor(spampercent)}%`
              document.getElementById('missingvalue').style.width = "100%"
              document.getElementById('missingvalue').innerHTML = `${missingresult} Missing`
              document.getElementById('ip').innerHTML = `${result.IP} `
              document.getElementById('sender').innerHTML = `${result.sender}`

            let tbody = document.getElementsByTagName('tbody')[0];
            
            let blacklist
            if (result.Blacklisted == true) {
              blacklist = `<td><div class="bg-danger w-75 rounded px-2 text-white d-flex justify-content-center ">${result.Blacklisted}</div></td>`
            }
            if (result.Blacklisted != true) {
              blacklist = `<td><div class="bg-success w-75 rounded px-2 text-white d-flex justify-content-center ">${result.Blacklisted}</div></td>`
            }
            let boxname
            if (recipient.boxname == "INBOX" || recipient.boxname == "Inbox") {
              boxname = `<td><div class="bg-success w-75 rounded px-2 text-white d-flex justify-content-center ">${recipient.boxname} </div></td>`
            } else {
            boxname = `<td><div class="bg-danger w-75 rounded px-2 text-white d-flex justify-content-center ">${recipient.boxname} </div></td>`
              }

                  let address = recipient.address
                  let template = `
                <tr>
                <th scope="row" id="${address}">${recipient.address}</th>
                ${boxname}
                <td>${result.IP}</td>
                <td><div class="bg-success w-75 rounded px-2 text-white d-flex justify-content-center ">${result.SPF}</div></td>
                <td><div class="bg-success w-75 rounded px-2 text-white d-flex justify-content-center ">${result.DKIM}</div></td>
                <td><div class="bg-success w-75 rounded px-2 text-white d-flex justify-content-center ">${result.DMARC}</div></td>
                ${blacklist}
              </tr>
                `
              //  append result to table
                tbody.innerHTML += template
              document.getElementById('overlay').style.display = "none"
              }
            })
      })
  }

  // fetch mails and update page without refreshing page
  let fetchMailsatInterval = setInterval(() => {
    console.log('fetching emails!')
    fetchMails()
  }, 3000);

  setTimeout(() => {
    clearInterval(fetchMailsatInterval);
    // document.getElementById('container').innerHTML = '<p>Message Not Received</p>'
    console.log('Searching Stopped')
    document.getElementById('overlay').style.display = "none"
  }, 180000);

}

  // compare password reset values
if (document.getElementById("correct-hint")) {
function verifyPassword (){
  if(document.getElementById("password").value === document.getElementById("passwordconfirmation").value) {
    document.getElementById('wrong-hint').style.display = 'none'
    document.getElementById('correct-hint').style.display = 'block'
    let hint = document.getElementById('correct-hint');
    hint.innerHTML = '<p>Passwords Match</p>'
    document.getElementById('resetPassword').removeAttribute('disabled');
    } else {
    document.getElementById('wrong-hint').style.display = 'block'
    document.getElementById('correct-hint').style.display = 'none'
    document.getElementById('wrong-hint').innerHTML = '<p>Passwords Do Not Match</p>'
    }
  }
  const input = document.getElementById('passwordconfirmation');
  input.addEventListener('input', verifyPassword);
    }

// get fetch result again if not ready
if (document.readyState === "complete" || document.readyState === "interactive") {
  if(document.getElementById('results').innerhtml != []) {
    console.log('docs found')
  }
}


function CopyShareLink() {
  /* Get the text field */
  let copyText = document.getElementById("share-link");

  /* Select the text field */
  copyText.type = 'text';
  copyText.select();
  // copyText.setSelectionRange(0, 99999); /* For mobile devices */
  copyText.type = 'hidden';

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  alert("Link copied to clipboard");
} 

// modal data
// get the value of the click button
function deletedata (btn) {
  let link = btn.href
  document.getElementById('deletebtn').setAttribute('href', link);
}
// set it as value for button