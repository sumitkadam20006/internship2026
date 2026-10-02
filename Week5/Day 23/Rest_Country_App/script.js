const API_KEY = "rc_live_9203097eb553458db9060b6643fea98d";

async function searchCountry() {

    const country = document.getElementById("countryInput").value;

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const card = document.getElementById("countryCard");

    loading.innerHTML = "Loading...";
    error.innerHTML = "";
    card.style.display = "none";

    try {

        const response = await fetch(
            "https://api.restcountries.com/countries/v5/names.common/" +
            country +
            "?api-key=" +
            API_KEY
        );

        const result = await response.json();

        console.log(result);

        if (!response.ok) {
            console.log(result.errors);
            throw new Error("Request Failed");
        }

        const data = result.data.objects[0];

        document.getElementById("countryName").innerHTML =
            data.names.common;

        document.getElementById("capital").innerHTML =
            data.capitals[0].name;

        document.getElementById("region").innerHTML =
            data.region;

        card.style.display = "block";

    }

    catch {

        error.innerHTML = "Country Not Found";

    }

    finally {

        loading.innerHTML = "";

    }

}