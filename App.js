
import { useState, useEffect } from 'react';
import "./App.css"





export default function Data() {
    const [obj, setRetrieve] = useState();
    const [userInput, setUserInput] = useState();
    const [location, setLocation] = useState("London");

    async function get() {
        let get = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=e58c939fc2b9215fd87ecfb59ab88eb4
        `);
        let result = await get.json();
        console.log(result);
        return result;
    }

    useEffect(() => {
        get().then((final) =>  {
            setRetrieve(final);
        });
    
    }, [location]);

  


    function onSubmit(e) {
        e.preventDefault();
        setLocation(userInput);

    }

    function onChange(e) {
        setUserInput(e.target.value)


    }

    let Temps = 
    {   main: obj && Math.round(((obj.list[0].main.temp - 273.15)*1.8)+32),
       max: obj && Math.round(((obj.list[0].main.temp_max - 273.15)*1.8)+32),
       min: obj && Math.round(((obj.list[0].main.temp_min - 273.15)*1.8)+32),
       
    }

    
    


    return (
        <>
        
        <div className="wrap">
        <form onSubmit={onSubmit} className="search">
           <input onChange={onChange}type="text" className="searchTerm" placeholder="What are you looking for?" />
                  <input type="submit" />
         </form>
     </div>
     
     <City obj={obj}/>    
     
      <div className="logo">
        Forecast
        {obj && obj.list.map((final, i) => {
            if (i < 5) {
                return <span className='child1'>{new Date(final.dt_txt).toDateString()}<br/>{Math.round(((final.main.temp - 273.15)*1.8)+32)} ℉</span>
            }
        })}
        
    

        <CurrentTemp obj={obj} Temps={Temps}/>

        <Metrics obj={obj} Temps={Temps}/>

        
    


     </div>

     
     </>
                   


        
        
    )
}

function Metrics({obj, Temps}) {

    return (
        <div className="metrics">
            <div>high {obj && Temps.max} ℉</div>
            <div>low {obj && Temps.min} ℉</div>
            <div>{obj && obj.list[0].wind.speed} mph</div>
            <div>{obj && obj.list[0].main.humidity} humidity</div>

        </div>

    )
}

function CurrentTemp({obj, Temps}) {
    return (
        <div className="currentTemp">
           <p> {obj && Temps.main + " " + obj.list[0].weather[0].description}</p>

        </div>

    )
}


let now = {
    time: new Date().getHours() + ":" + new Date().getMinutes(),
    }

    function convertMili(militaryTime) {
        let hours = parseInt(militaryTime.substr(0, 2));
        let minutes = militaryTime.substr(2);
      
        let ampm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12;
        hours = hours ? hours : 12;
      
        let standardTime = hours + minutes + ' ' + ampm;
      
        return standardTime;
      }


function City({obj}) {

    return (
        <div className="city">
        <p>{obj && obj.city.name +", " +  obj.city.country}</p>
       <p> {new Date().toDateString() + " " + convertMili(now.time)}</p>
        


     </div>

    )
}