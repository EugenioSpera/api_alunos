document.querySelector('.busca').addEventListener('submit', async (event) => {

    event.preventDefault();
    /* Capturando o value do input e atribuindo a variável */
    let input = document.querySelector('#searchInput').value;

    if (input !== '') {

        claearInfo();
        /* == > Verifica a tipagem */
        showWarning('');
        document.querySelector('.loader').style.display = 'block';

        /* fetch - Ira ler algo */
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&lang=pt_br&units=metric&appid=a77c9d4e81b530d84340ff0acf8cf252`);

        let json = await results.json();

        if (json.cod === 200) {
            showInfo({

                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

        } else {
            claearInfo()
            showWarning('Cidade não encontrada')
            document.querySelector('.loader').style.display = 'none';
        }
    } else {
        claearInfo;
    }

    console.log(results)



    console.log(input)

})

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.loader').style.display = 'none';
}


function showWarning(msg) {

    document.querySelector('.aviso').innerHTML = msg;
    document.querySelector('.loader').innerHTML = msg;
}

function claearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}

