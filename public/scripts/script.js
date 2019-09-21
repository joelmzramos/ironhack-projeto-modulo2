const serviceProvider = document.getElementById('inlineRadio1');
const customer = document.getElementById('inlineRadio2');

serviceProvider.onchange = async (event) => {
  const divServiceProvider = document.getElementById("data-sp");
  divServiceProvider.classList.remove("display-none");
};
customer.onchange = async (event) => {
  const divServiceProvider = document.getElementById("data-sp");
  divServiceProvider.classList.add("display-none");
};