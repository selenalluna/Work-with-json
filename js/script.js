// "use strict";
// import IMask from 'imask';

document.querySelector("button").addEventListener("click", function() {
  let file = document.getElementById("file").files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    // console.log(reader.result);
    let obj = JSON.parse(reader.result);
    // console.log(obj);
    let reset = document.querySelector(".reset");
    reset.classList.remove("hidden");
    let form = document.querySelector(".buildFile");       
    let output = document.createElement("form");
    output.className = obj.name;
    form.append(output);
    
    function required(what) {
      if (what) return "required"
        else return ""
    }
    function placeholder(what) {
      if (what) return (" placeholder='" + what + "'")
        else return ""
    }
    function checked(what) {
      if (what) return ("checked")
      else return ""
    }
    function colored(what) {
      if (what) return (" value='" + obj.fields[0].input.colors[j] + "'")
      else return ""
    }
    function multiple(what) {
      if (what) return (" multiple='" + obj.fields[0].input.multiple + "'")
      else return ""
    }
    function options(what) {
      let sum = "";
      for (j=0; j<what.length; j++)
        sum = sum + "<option>" + what[j] + "</option>";
      return (sum);
    }
    function accept(what) {
      if (what) {
      let sum = " accept='";
      for (j=0; j<what.length-1; j++)
        sum = sum + 'image/' + what[j] + ',';
      sum = sum + 'image/' + what[what.length-1];
      return (sum);
      }
      else return ""
    }
    function mask(id, mask) {
      let selector = document.getElementById(id);
      let im = new Inputmask(mask);
      im.mask(selector);
    }

    if (obj.fields) {
    for (i=0; i<Object.keys(obj.fields).length; i++) {
      let putId = "";
      if (obj.fields[i].label) {
        output.insertAdjacentHTML("beforeend", "<label  for='" + obj.fields[i].label + "'>" + obj.fields[i].label + "</label>");
        putId = " id='" + obj.fields[i].label + "'";
      };

      if (obj.fields[i].input.colors) {
        let colorsDiv = document.createElement("div");
        colorsDiv.className = "colors";
        output.append(colorsDiv);

        for (j=0; j<Object.keys(obj.fields[i].input.colors).length; j++) {
          colorsDiv.insertAdjacentHTML("beforeend", "<input" + putId + " type='" + obj.fields[i].input.type + "'" + required(obj.fields[i].input.required) + placeholder(obj.fields[i].input.placeholder) + colored(obj.fields[0].input.colors[j]) + "></input>"); 
        }
      }
      else if (obj.fields[i].input.type == "textarea") output.insertAdjacentHTML("beforeend", "<textarea" + putId + " type='" + obj.fields[i].input.type + "'" + required(obj.fields[i].input.required) + placeholder(obj.fields[i].input.placeholder) + "></textarea>");
      else {if (obj.fields[i].input.type == "technology") output.insertAdjacentHTML("beforeend", "<select " + putId + multiple(obj.fields[i].input.multiple) + required(obj.fields[i].input.required) +  ">" + options(obj.fields[i].input.technologies) + "</select>");
        else {if (obj.fields[i].input.mask) {
          obj.fields[i].input.type = "text";
          output.insertAdjacentHTML("beforeend", "<input" + putId + " type='" + obj.fields[i].input.type + "'" + accept(obj.fields[i].input.filetype) + multiple(obj.fields[i].input.multiple) + required(obj.fields[i].input.required) + placeholder(obj.fields[i].input.placeholder) + placeholder(obj.fields[i].input.mask) +"></input>");
          mask(obj.fields[i].label, obj.fields[i].input.mask);
        }
        else output.insertAdjacentHTML("beforeend", "<input" + putId + " type='" + obj.fields[i].input.type + "'" + accept(obj.fields[i].input.filetype) + multiple(obj.fields[i].input.multiple) + required(obj.fields[i].input.required) + placeholder(obj.fields[i].input.placeholder) + placeholder(obj.fields[i].input.mask) +"></input>");
      }}
    }
    }

    if (obj.references) {
      let refDiv = document.createElement("div");
      refDiv.className = "references";
      output.append(refDiv);

      for (i=0; i<Object.keys(obj.references).length; i++) {
        if (obj.references[i].input)
          refDiv.insertAdjacentHTML("beforeend", "<input type='" + obj.references[i].input.type + "'" + required(obj.references[i].input.required) + checked(obj.references[i].input.checked) +"></input>");
        if (obj.references[i]["text without ref"]) 
          refDiv.insertAdjacentHTML("beforeend", "<p>" + obj.references[i]["text without ref"] + "</p>");
        if (obj.references[i]["ref"])
          refDiv.insertAdjacentHTML("beforeend", "<a href='" +  obj.references[i]["ref"] + "'>" + obj.references[i]["text"] + "</a>");
      }
  }

    if (obj.buttons) 
      for (i=0; i<Object.keys(obj.buttons).length; i++)
      output.insertAdjacentHTML("beforeend", "<input type='submit' value='" + obj.buttons[i].text + "'>");     
  }
     
  reader.onerror = function () {
    console.log(reader.error);
  }
})

document.querySelector(".reset").addEventListener("click", function () {
  let reset = document.querySelector(".reset");
  reset.classList.add("hidden");
  let output = document.querySelectorAll(".buildFile > form");
  for (i=0; i<output.length; i++) output[i].remove();
})