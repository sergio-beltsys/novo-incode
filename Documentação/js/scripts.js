function zoom(idImagem, valor) {
  idImagem.width = idImagem.width + valor;
  idImagem.height = idImagem.height + valor;
}

function mostreMenu(id) {
  var d = document.getElementById(id);
  var menu = document.querySelector("#" + id + "> div:nth-child(1) > a")
  for (var i = 1; i <= 10; i++) {
    elemento = document.getElementById('smenu' + i)
    if (elemento) {
      elemento.style.display = 'none';
      elemento.parentNode.classList.remove("navbarDropdown-active")
    }
  }
  if (menu != null) {
    if (d && d.innerHTML.length > 14) {
      d.style.display = 'block';
      d.parentNode.classList.add("navbarDropdown-active")
    }
  }
}


var tpcon;
var sis;

function Pesquisar() {
  if (document.PESQUISAR.tpConsulta.checked == true) {
    tpcon = '1';
  }
  else {
    tpcon = '0';
  }

  document.PESQUISAR.sis.value = document.PESQUISAR.drpSistema.value;
  document.PESQUISAR.tpcons.value = tpcon;

  if (document.PESQUISAR.palavra.value.trim() == "") {
    Swal.fire("O campo palavra é obrigatório!")
    return false;
  }
}

function popoupOk(url1, redirectTo) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  let url = url1;

  fetch(url, requestOptions)
    .then(response => response.text())
    .then((result) => {
      if (result.length > 0) {
        return alertOk(result, redirectTo);
      }
    });
}


function alertOk(result, redirectTo) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(result, "text/html");
  var div = doc.querySelector("#pagincode > div > table > tbody > tr:nth-child(2) > td");
  if(div == null){
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Erro!',
      showConfirmButton: false,
      timer: 1500
    })
  }else{
    Swal.fire({
      position: 'top-end',
      title: div.innerText.trim(),
      showConfirmButton: false,
      timer: 2000,
      willClose: () => {
        if (redirectTo == undefined) {
          window.open(document.referrer, '_self')
        } else {
          window.open(redirectTo, '_self')
        }  
      }
    })

  }
  // return false;
}
  


  // alert(div.innerText.trim());




function isNumber(v) {

  var ValidChars = '0123456789';
  var isNumber = true;
  var Char;
  for (i = 0; i < v.length && isNumber == true; i++) {
    Char = v.charAt(i);
    if (ValidChars.indexOf(Char) == -1) {
      isNumber = false;
    }
  }

  if (v == '') {
    isNumber = false;
  }
  return isNumber;
}

// function closeablePopup3ok(){

//   let result = document.querySelector("#popup3 > table > tbody > tr:nth-child(2) > td > font").innerHTML;
//   console.log(result); 

//   document.querySelector("#popup3 > table").remove();

//   var novaTabela = document.createElement("table");
//   novaTabela.classList.add("Table")

//   var cabecalho = document.createElement("thead");
//   var trtitulo = document.createElement("tr");
//   var titulo = document.createElement("td");
//   titulo.innerHTML = "Resultado";

//   var corpo = document.createElement("tbody");
//   var trresultado = document.createElement("tr");
//   var resultado = document.createElement("td");
//   resultado.classList.add("destaque-texto")
//   resultado.innerHTML = result;

//   trtitulo.appendChild(titulo);
//   cabecalho.appendChild(trtitulo);

//   trresultado.appendChild(resultado);
//   corpo.appendChild(trresultado);

//   novaTabela.appendChild(cabecalho);
//   novaTabela.appendChild(corpo);

//   document.getElementById("popup3").appendChild(novaTabela);

//   setTimeout(function(){
//     close();
//   }, 5000)
// }

function mascara_data(data, imputdata) {
  var mydata = '';
  if (mydata.length == 10) {
    verifica_data(imputdata);
  }
}

function verifica_data(imputdata) {
  dia = (imputdata.value.substring(0, 2));
  mes = (imputdata.value.substring(3, 5));
  ano = (imputdata.value.substring(6, 10));

  diaB = isNumeric(dia);
  mesB = isNumeric(mes);
  anoB = isNumeric(ano);

  if (diaB & mesB & anoB) {
    situacao = "";
    // verifica o dia valido para cada mes
    if ((dia < 01) || (dia < 01 || dia > 30) && (mes == 04 || mes == 06 || mes == 09 || mes == 11) || dia > 31) {
      situacao = "falsa";
    }

    // verifica se o mes e valido
    if (mes < 01 || mes > 12) {
      situacao = "falsa";
    }

    // verifica se e ano bissexto
    if (mes == 2 && (dia < 01 || dia > 29 || (dia > 28 && (parseInt(ano / 4) != ano / 4)))) {
      situacao = "falsa";
    }

    if (document.forms[0].datainicio.value == "") {
      situacao = "falsa";
    }

    if (situacao == "falsa") {
      //alert("Data inválida!");
      imputdata.focus();
      return "false";
    }
    else {
      return "true";
    }
  }
  else {
    return "false";
  }
}

function isNumeric(str) {
  var er = /^[0-9]+$/;
  return (er.test(str));
}


function novatabela(url1) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  let url = url1;

  fetch(url, requestOptions)
    .then(response => response.text())
    .then((result) => {
      if (result.length > 0) {
        preencheDiv(result);
      } else {
        document.getElementById("loadingTr").style.display = "none"
      }
    })
    .catch(error => document.getElementById("loadingTr").style.display = "none");
}

function preencheDiv(result) {
  document.querySelector("#tabelaRetornada").innerHTML = '';

  let parser = new DOMParser();
  let doc = parser.parseFromString(result, "text/html");
  var div = doc.querySelector("#pagincode > div > table");

  if (div == null) {
    let p = document.createElement("p");
    p.classList.add("h3");
    p.classList.add("text-center");
    p.classList.add("destaque-texto");
    p.innerText = "Nenhum resultado encontrado"
    document.querySelector("#tabelaRetornada").appendChild(p);
  } else {
    var tr = doc.querySelector("#pagincode > div > table > tbody > tr:nth-child(1)");
    let tds = tr.querySelectorAll("td");
    let trNova = document.createElement("tr");
    tr.remove();
    tds.forEach(td => {
      let tdNova = document.createElement("td");
      tdNova.innerText = td.innerText.trim();
      td.innerHTML = ''
      trNova.appendChild(tdNova);
    });

    let fontsReplace = doc.querySelectorAll("#pagincode > div > table > tbody > tr > td > font");

    fontsReplace.forEach(font => {
      font.removeAttribute("face")
      font.removeAttribute("size")
    })

    let theadNova = document.createElement("thead");
    theadNova.appendChild(trNova);

    div.appendChild(theadNova);

    div.classList.add("table");

    document.querySelector("#tabelaRetornada").appendChild(div);
  }

  document.getElementById("loadingTr").style.display = "none"
}


function novatabelaNoModal(url1) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  let url = url1;

  fetch(url, requestOptions)
    .then(response => response.text())
    .then((result) => {
      if (result.length > 0) {
        preencheModal(result);
      } else {

      }
    })

}

function preencheModal(result) {

  let parser = new DOMParser();
  let doc = parser.parseFromString(result, "text/html");
  var div = doc.querySelector("#pagincode > div > table");
  if (div == null) {
    let p = doc.createElement("p");
    div = doc.createElement("div");
    p.classList.add("h3");
    p.classList.add("text-center");
    p.classList.add("destaque-texto");
    p.innerText = "Nenhum resultado encontrado"

    div.appendChild(p);

    modalPopup(div, "ok")
  } else {
    let divResponsive1 = doc.createElement("div")
    divResponsive1.classList.add("container-fluid");
    divResponsive1.style.maxHeight = "80vh"
    divResponsive1.style.whiteSpace = "nowrap";
    let divResponsive2 = doc.createElement("div")
    divResponsive2.classList.add("table-responsive");

    divResponsive1.appendChild(divResponsive2)

    var tr = doc.querySelector("#pagincode > div > table > tbody > tr:nth-child(1)");
    let tds = tr.querySelectorAll("td");
    let trNova = doc.createElement("tr");
    tr.remove();
    tds.forEach(td => {
      let tdNova = doc.createElement("td");
      tdNova.innerText = td.innerText.trim();
      td.innerHTML = ''
      trNova.appendChild(tdNova);
    });

    let fontsReplace = doc.querySelectorAll("#pagincode > div > table > tbody > tr > td > font");
    let tdsReplace = doc.querySelectorAll("#pagincode > div > table > tbody > tr > td");

    fontsReplace.forEach(font => {
      font.removeAttribute("face")
      font.removeAttribute("size")
    })

    tdsReplace.forEach(font => {
      font.removeAttribute("width")
      font.classList.add("text-start")
    })

    let theadNova = doc.createElement("thead");
    theadNova.appendChild(trNova);

    div.appendChild(theadNova);

    div.classList.add("table");

    divResponsive2.appendChild(div);

    modalPopup(divResponsive1, "tabela");
  }

  // Swal.fire({
  //   width: '100%',
  //   html: div,
  //   showCloseButton: true,
  //   showCancelButton: true,
  //   focusConfirm: false,
  //   confirmButtonText:
  //     '<i class="fa fa-thumbs-up"></i> Great!',
  //   confirmButtonAriaLabel: 'Thumbs up, great!',
  // })
}

function modalPopup(parm, modelo) {
  switch (modelo) {
    case "tabela":
      Swal.fire({
        width: 'auto',
        html: parm,
        showCloseButton: false,
        showDenyButton: true,
        showCancelButton: true,

        confirmButtonText: 'Exportar XLS',

        denyButtonText: `Exportar DOC`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          exportTableToExcel(parm)

        } else if (result.isDenied) {
          exportTableToDoc(parm)
        }
      })
      break;
    case "ok":
      Swal.fire({
        html: parm,
      })
      break;
    case "confirmeErrCarga":
      Swal.fire({
        showCloseButton: false,
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        title: 'Excluir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Excluir!'
      }).then((result) => {
        if (result.isConfirmed) {
          excluirErrCargaSigla(parm)
        }
      })
      break;
  }
}

function excluirErrCargaSigla(url) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url, requestOptions)
    .then(response => response.text())
    .then((result) => {
      if (result.length > 0) {

        let parser = new DOMParser();
        let doc = parser.parseFromString(result, "text/html");
        
        var div = doc.querySelector("#popup3 > table > tbody > tr:nth-child(2) > td > font");

        Swal.fire({
          position: 'top-end',
          title: div.innerText.trim(),
          showConfirmButton: false,
          timer: 2000,
          willClose: () => {
            window.open(document.referrer, '_self')
          }
        })
      }
    });
}

function exportTableToExcel(table, filename = 'export') {
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableHTML = table.outerHTML.replace(/ /g, '%20');

  filename = filename ? filename + '.xls' : 'excel_data.xls';

  downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);
  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHTML], {
      type: dataType
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

    downloadLink.download = filename;

    downloadLink.click();
  }
}


function exportTableToDoc(table, filename = 'export.doc') {
  var blob = new Blob([table.outerHTML], {
    type: 'application/msword'
  });

  var url = URL.createObjectURL(blob);

  var downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;

  downloadLink.click();
}








// var pagatual = 2;

// function InfiniteScroll(table, parm1, parm2){

//   document.getElementById("loadingTr").style.visibility = "initial";

//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//   var urlencoded = new URLSearchParams();
//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow'
//   };

//   let url = "https://beltsys035/docmf/incode.exe/menu?pag=menu+pagtam=30+pagnum="+ pagatual +"+query1="+parm1+'+query2='+ parm2
//   pagatual += 1;
//   fetch(url, requestOptions)
//     .then(response => response.text())
//     .then((result) => {
//       if(result.length > 0){
//         RetornarTrs(table, result);
//       }else{
//             document.getElementById("loadingTr").style.visibility = "hidden"
//           }
//         })
//         .catch(error => document.getElementById("loadingTr").style.visibility = "hidden"); 
// }



// function RetornarTrs(table, htmlFull){
//   let parser = new DOMParser();
//   let doc = parser.parseFromString(htmlFull, "text/html");
//   var trs = doc.querySelectorAll("#tableMenu > tbody > tr");

//   let pagina = document.querySelector(table + "> tbody")

//   trs.forEach(tr => {
//     let tds = tr.querySelectorAll('td');
//     let trNova = document.createElement("tr");
//     tds.forEach(td => {
//         let tdNova = document.createElement("td");
//         tdNova.innerHTML = td.innerHTML;
//         trNova.appendChild(tdNova);
//     });
//     pagina.appendChild(trNova);
// });



// document.getElementById("loadingTr").style.visibility = "hidden";


// }


function modalFonte(url) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url, requestOptions)
    .then(response => response.text())
    .then((result) => {
      if (result.length > 0) {
        preencheModalSource(result);
      } else {

      }
    })
}

function preencheModalSource(result) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(result, "text/html");

  var div = doc.querySelector("body > table");

  modalPopup(div, "tabela");

}

function preencherCampos(htmlFull) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(htmlFull, "text/html");
  var trs = doc.querySelectorAll("#tableMenu > tbody > tr");

  let pagina = document.querySelector("#tableMenu > tbody")

  trs.forEach(tr => {
      let tds = tr.querySelectorAll('td');
      let trNova = document.createElement("tr");
      tds.forEach(td => {
          let tdNova = document.createElement("td");
          tdNova.innerHTML = td.innerHTML;
          trNova.appendChild(tdNova);
      });
      pagina.appendChild(trNova);
  });

  document.getElementById("loadingTr").style.visibility = "hidden";
  return doc.getElementsByName("pro2");
}

async function novatabelaNoModalQuerySiglas(url, query) {
  try {
    const myHeaders = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    if (result.length > 0) {
      return await resultQuerySiglas(result, query);
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

function resultQuerySiglas(result, query) {
  return new Promise((resolve, reject) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, "text/html");
    const div = doc.querySelector("#pagincode > div > table");
    if (div === null) {
      const p = doc.createElement("p");
      const div = doc.createElement("div");
      p.classList.add("h3", "text-center", "destaque-texto");
      p.innerText = "Nenhum resultado encontrado";
      div.appendChild(p);
      modalPopup(div, "ok");
      resolve(false);
    } else {
      const divResponsive1 = doc.createElement("div");
      const divResponsive2 = doc.createElement("div");
      divResponsive1.classList.add("container-fluid");
      divResponsive1.style.maxHeight = "80vh";
      divResponsive1.style.whiteSpace = "nowrap";
      divResponsive2.classList.add("table-responsive");
      divResponsive1.appendChild(divResponsive2);

      const tr = doc.querySelector("#pagincode > div > table > tbody > tr:nth-child(1)");
      const tds = tr.querySelectorAll("td");
      const trNova = doc.createElement("tr");
      tr.remove();
      tds.forEach(td => {
        const tdNova = doc.createElement("td");
        tdNova.innerText = td.innerText.trim();
        td.innerHTML = '';
        trNova.appendChild(tdNova);
      });

      const fontsReplace = doc.querySelectorAll("#pagincode > div > table > tbody > tr > td > font");
      const tdsReplace = doc.querySelectorAll("#pagincode > div > table > tbody > tr > td");

      fontsReplace.forEach(font => {
        font.removeAttribute("face");
        font.removeAttribute("size");
      });

      tdsReplace.forEach(font => {
        font.removeAttribute("width");
        font.classList.add("text-start");
      });

      const theadNova = doc.createElement("thead");
      theadNova.appendChild(trNova);

      const captionNova = doc.createElement("caption");
      captionNova.classList.add("text-break");
      captionNova.innerHTML = query;

      div.appendChild(captionNova);
      div.appendChild(theadNova);
      div.classList.add("table");
      divResponsive2.appendChild(div);

      resolve(modalPopupQuerySiglas(divResponsive1));
    }
  });
}

function modalPopupQuerySiglas(parm) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      width: 'auto',
      html: parm,
      showCloseButton: false,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true); // Retorna true quando o botão "Salvar" é confirmado
      } else {
        resolve(false); // Retorna false quando o botão "Cancelar" é clicado
      }
    });
  });
}