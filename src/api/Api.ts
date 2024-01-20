export default async function callingAPI(city : string, API : string)/* Ini namanya parameter. String karena cuma butuh tipe data string city dan API */ : Promise<WeatherProps> /* Return typenya Promise karena functionnya Async */{
    //Function ini harus Async karena API lebih bagus async daripada synchronous (bakal banyak API bisa dipanggil bebarengan)
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        return data as Promise<WeatherProps> // <- Ini namanya casting
    }
    catch(error){
        throw error;
    }
};

export interface WeatherProps {
    coord:      Coord;
    weather:    WeatherElement[];
    base:       string;
    main:       Main;
    visibility: number;
    wind:       Wind;
    clouds:     Clouds;
    dt:         number;
    sys:        Sys;
    timezone:   number;
    id:         number;
    name:       string;
    cod:        number;
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Main {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    humidity:   number;
}

export interface Sys {
    type:    number;
    id:      number;
    country: string;
    sunrise: number;
    sunset:  number;
}

export interface WeatherElement {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Wind {
    speed: number;
    deg:   number;
}
