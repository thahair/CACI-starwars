import React from "react";
import "./Card.scss"

const Card = (props) => {

    const {ind, name, model, films, highestFilms} = props;
    return(
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100">
                <img src={require(`./assets/${name}.png`)} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title d-flex align-items-center justify-content-between">
                        {name}
                        {highestFilms&&
                        <img src={require("./assets/trophy.png")} alt="" className="trophy"/>
                        }
                        
                    </h5> 
                    <ul className="list-group d-flex flex-row border-0">
                        <li className="list-group-item d-flex flex-column align-items-start justify-content-center border-0 rounded-0 ps-0 py-0 mt-2">
                            <span className="fw-500">Model</span>
                            <span className="badge bg-primary rounded-pill fw-500">{model}</span>
                        </li>
                        <li className="list-group-item d-flex flex-column align-items-end justify-content-center border-0 py-0 mt-2 w-100">
                            <span className="fw-500">Films</span>
                            <span className="badge bg-primary rounded-pill">{films}</span>
                        </li>
                        </ul>
                </div>
            </div>
        </div>
    )
}

export default Card;
