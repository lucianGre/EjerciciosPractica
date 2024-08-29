let api_key = "c2863719ee62df9b3701ba120789be96";
let gradosKelvin = 273.15;
let urlBase = "https://api.openweathermap.org/data/2.5/weather";

//let ciudad = "Londres"

document.getElementById("botonBusqueda").addEventListener("click", () => {
  const ciudad = document.getElementById("ciudadEntrada").value;
  if (ciudad) {
    fetchDatosClima(ciudad);
  }
});

function fetchDatosClima(ciudad) {
  fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then((data) => data.json())
    //.then((data) => console.log(data))   //Borrar cuando se ha terminado de utilizar //En este caso lo voy a dejar comentado, para por si acaso en un futuro quiero volver a repasar como está echo
    .then((data) => mostrarDatosClima(data));
}

function mostrarDatosClima(data) {
  console.log(data);
  const divDatosClima = document.getElementById("datosClima");
  divDatosClima.innerHTML = "";

  const ciudadNombre = data.name;
  const paisNombre = data.sys.country;
  const temperatura = data.main.temp - gradosKelvin;
  const temperaturaAmbiente = data.main.feels_like - gradosKelvin;
  const temperaturaMinima = data.main.temp_min - gradosKelvin;
  const temperaturaMaxima = data.main.temp_max - gradosKelvin;
  const humedad = data.main.humidity;
  const descripcionClima = data.weather[0].main;
  const iconoClima = data.weather[0].icon;

  const albaTimeStamp = data.sys.sunrise;
  const albaDate = new Date(albaTimeStamp * 1000); // convert to milliseconds
  const hAlba = albaDate.getHours();
  const minAlba = albaDate.getMinutes();
  const albaHoraFormateada = `${hAlba.toString().padStart(2, "0")}:${minAlba
    .toString()
    .padStart(2, "0")}`;

  const ocasoTimeStamp = data.sys.sunset;
  const ocasoDate = new Date(ocasoTimeStamp * 1000); // convert to milliseconds
  const hOcaso = ocasoDate.getHours();
  const minOcaso = ocasoDate.getMinutes();
  const ocasoHoraFormateada = `${hOcaso.toString().padStart(2, "0")}:${minOcaso
    .toString()
    .padStart(2, "0")}`;

  const ciudadTitulo = document.createElement("h2");
  ciudadTitulo.textContent = `${ciudadNombre} . ${paisNombre}`;
  divDatosClima.appendChild(ciudadTitulo);
  
  const temperaturaInfo = document.createElement("p");
  temperaturaInfo.textContent = `${Math.floor(temperatura)}°C`;
  divDatosClima.appendChild(temperaturaInfo)
  
  const tempAmbInfo = document.createElement("p");
  tempAmbInfo.textContent = `Temperatura ambiente: ${Math.floor(temperaturaAmbiente)}°C`;
  divDatosClima.appendChild(tempAmbInfo)
  
  const tempMinInfo = document.createElement("p");
  tempMinInfo.textContent = `Temperatura mínima: ${Math.floor(temperaturaMinima)}°C`;
  divDatosClima.appendChild(tempMinInfo)

  const tempMaxInfo = document.createElement("p");
  tempMaxInfo.textContent = `Temperatura máxima: ${Math.floor(temperaturaMaxima)}°C`;
  divDatosClima.appendChild(tempMaxInfo)

  const humedadInfo = document.createElement("p");
  humedadInfo.textContent = `Humedad: ${humedad}%`;
  divDatosClima.appendChild(humedadInfo)
  
  const climaInfor = document.createElement("p");
  climaInfor.textContent = descripcionClima;
  divDatosClima.appendChild(climaInfor)

  const iconoInfo = document.createElement("img");
  iconoInfo.src = `https://openweathermap.org/img/wn/${iconoClima}@2x.png`;
  divDatosClima.appendChild(iconoInfo)
  
  const albaInfo = document.createElement("p");
  albaInfo.textContent = `🌄Alba: ${albaHoraFormateada} --- 🌆Ocaso: ${ocasoHoraFormateada}`;
  divDatosClima.appendChild(albaInfo)
  
  const ocasoInfo = document.createElement("p");
  ocasoInfo.textContent = `Horas de sol😎: ${hOcaso-hAlba}:${minOcaso-minAlba}`;
  divDatosClima.appendChild(ocasoInfo)
}
