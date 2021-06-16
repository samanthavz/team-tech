// search bar
// code snippet from: https://www.w3schools.com/howto/howto_js_filter_lists.asp

const input = document.getElementById("inputField");
input.addEventListener("keyup", filter);

function filter() {
  let filter = input.value.toUpperCase();
  let ul = document.getElementById("list");
  let li = ul.getElementsByTagName("li");

  // Filter de items die wel en niet matchen met de input
  for (let item = 0; item < li.length; item++) {
    let h2 = li[item].getElementsByTagName("h2")[0];
    let txtValue = h2.textContent || h2.innerText;
    //als er niks in de input staat, laat de display dan op default
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[item].style.display = "";
    } else {
      li[item].style.display = "none";
    }
  }
}
