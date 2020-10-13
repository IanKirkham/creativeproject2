document.getElementById("searchSubmit").addEventListener("click", function(event) {

  event.preventDefault();
  const accesstoken = "3455912481122806";

  let value = document.getElementById("searchInput").value;
  let s = document.getElementById("selector");
  let option = s.options[s.selectedIndex].value;
  if (value === "")
    return;

  var url = "https://cors-anywhere.herokuapp.com";
  if (option == "name") {
    url += "/superheroapi.com/api/" + accesstoken + "/search/" + value;
  }
  else {
    url += "/superheroapi.com/api/" + accesstoken + "/" + value;
  }

  fetch(url, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      if (json.response == "error") {
        document.getElementById("error").textContent = "Error: " + json.error;
      }
      else {
        document.getElementById("error").textContent = "";
      }

      console.log(json);

      let output = "";
      if (json.results != undefined) {
        for (let i = 0; i < json.results.length; i++) {
          output += addObjectToOutput(json.results[i]);
        }
      } else {
        output += addObjectToOutput(json);
      }

      document.getElementById("heroData").innerHTML = output;
      window.location="#heroData";
    });
});

function addObjectToOutput(currObj) {
  let output = "";
  output += '<div class="object-container">';
    output += '<img src="' + currObj.image.url + '">';
    output += '<div class="main-content">';
      output += '<h1>' + currObj.name + ' (ID: ' + currObj.id + ')</h1>';
      output += '<div class="sub-content">';
        output += '<h5>Biography</h5>';
        output += '<p>Full Name: ' + currObj.biography["full-name"] + '</p>';
        output += '<p>Place of Birth: ' + currObj.biography["place-of-birth"] + '</p>';
        output += '<p>Publisher: ' + currObj.biography["publisher"] + '</p>';
        output += '<h5>Appearance</h5>';
        output += '<p>Gender: ' + currObj.appearance["gender"] + '</p>';
        output += '<p>Eye Color: ' + currObj.appearance["eye-color"] + '</p>';
        output += '<p>Hair Color: ' + currObj.appearance["hair-color"] + '</p>';
        output += '<p>Height: ' + currObj.appearance.height[0] + '</p>';
        output += '<p>Weight: ' + currObj.appearance.weight[0] + '</p>';
        output += '<p>Race: ' + currObj.appearance["race"] + '</p>';
        output += '<h5>Work</h5>';
        output += '<p>Base: ' + currObj.work["base"] + '</p>';
        output += '<p>Occupation: ' + currObj.work["occupation"] + '</p>';
      output += '</div>';
    output += '</div>';
  output += '</div>';
  return output;
}

function toggleTable() {
  var myTable = document.getElementById("idTable");
  myTable.style.display = (myTable.style.display == "flex") ? "none" : "flex";

  var myText = document.getElementById("showIdsLink");
  myText.textContent = (myText.textContent == " Click here!") ? " Hide Table" : " Click here!";
}
