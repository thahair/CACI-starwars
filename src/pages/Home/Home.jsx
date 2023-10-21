import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./Home.scss"

const Home = ()=>{

    const [shipsData, setShipsData] = useState([]);
    const [sortedShipsData, setSortedShipsData] = useState([]);
    const [highestFilmsCount, setHighestFilmsCount] = useState(0);
    const [filterByMinCrew, setFilterByMinCrew] = useState(true);

     useEffect(()=>{
        fetch("https://swapi.dev/api/starships/?format=json")
        .then(res => res.json())
        .then(data => setShipsData(data.results))
     },[])

    useEffect(()=>{
        let newShipsData = [];
        let highestFilmsAppeared = 0;

        // for sorting 
        let crewArr = []
        shipsData.map(obj=>{
            const crew = obj.crew;
            let count = 0;
            if(crew.includes("-")){
                crewArr.push(parseInt(crew.split("-")[0]));
                count = parseInt(crew.split("-")[0]);
            }
            else if(crew.includes(",")){
                crewArr.push(parseInt(crew.split(",").join("")));
                count = parseInt(crew.split(",").join(""));
            }
            else{
                crewArr.push(parseInt(crew));
                count = parseInt(crew);
            }
            newShipsData.push({...obj, minCrew: count})
        });
        const sortedCrewArr = crewArr.sort(function(a, b){return a-b});
        let sortedData = [];
        sortedCrewArr.map(ele=>{
            newShipsData.map((obj, index)=>{
                if(filterByMinCrew){
                    if(obj.minCrew === ele && ele <= 10){ 
                        sortedData.push(obj);
                        newShipsData.splice(index, 1);
                    }
                    if(obj.films.length > highestFilmsAppeared){
                        highestFilmsAppeared = obj.films.length;
                    }
                }
                else{
                    sortedData.push(obj);
                    newShipsData.splice(index, 1);
                    if(obj.films.length > highestFilmsAppeared){
                        highestFilmsAppeared = obj.films.length;
                    }
                }
                
            });
        });
        setSortedShipsData(sortedData);
        setHighestFilmsCount(highestFilmsAppeared);
    },[shipsData, filterByMinCrew])

    return (
        <div className="container-fluid ships-container">
            {
                sortedShipsData.length>0?
                (
                    <>
                    <div className="form-check form-switch d-flex justify-content-end">
                        <div>
                            <input 
                                className="form-check-input cursor-pointer" 
                                type="checkbox" role="switch" id="showAllShips" 
                                onClick={()=>setFilterByMinCrew(!filterByMinCrew)}
                                title="Show All Ships"
                            />
                            <label htmlFor="showAllShips" className="cursor-pointer fw-500 text-white">Show All</label>
                        </div>
                    </div>
                    <div className="row g-3">
                    {
                        sortedShipsData&&
                        sortedShipsData.map((obj, ind)=>{
                            const {name, model, films} = obj;
                            return(
                                <Card 
                                    key={`ship-${ind}`}
                                    ind={ind} 
                                    name={name}
                                    model={model}
                                    films={films.length}
                                    highestFilms={highestFilmsCount===films.length?true:false}
                                />
                            )
                        })
                    }
                    </div>
                    </>
                ):
                (<h1 className="loader-hdr"><img src={require("./assets/Rocket.gif")} alt="" />Loading...</h1>)
            }
            
        </div>
    )
}

export default Home;
