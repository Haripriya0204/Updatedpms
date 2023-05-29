import React, { useEffect, useState, useRef } from "react";
import './Search.css';
import HeaderService from "../../services/HeaderService";
import IsinTable from "./IsinTable";
import Sector from "./Sector";
const Symbol = () => {
    let symbolInput = useRef();
    const [symbol, setSymbol] = useState('');
    const [masterData, setMasterData] = useState([]);
    const [securityMaster, setSecurityMaster] = useState({
        data: '',
        loading: true
    })

    useEffect(() => {
        HeaderService.fetchData()
            .then((response) => {
                setMasterData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const searchBySymbol = (e) => {
        console.log(symbolInput.current.value);
        setSymbol(e.target.value);

        e.preventDefault();
        HeaderService.getBySymbol(symbolInput.current.value).then((Response) => {
            setSecurityMaster({
                data: Response.data,
                loading: false
            }

            )
            console.log(securityMaster.data)
        }

        )
    }
    return (
        <>

            {/* <div className="background"> */}
            <div class="container">

                <div class="row height d-flex justify-content-center align-items-center">

                    <div class="col-md-8">

                        <div class="search" align="center" style={{marginTop:'-1%'}}>
                            <br></br>
                            {/* <div className="drop">
                                <select
                                    value={symbol}
                                    placeholder="search by Symbol"
                                    ref={symbolInput}
                                    onChange={(e) => { setSymbol(e.target.value) }}
                                    required>
                                    <option value="">Select a Symbol</option>
                                    
                                    {masterData.map((item) => {
                                        return (
                                            <option value={item.symbol}>
                                                {item.symbol}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div> */}
                            {/* <input
                                value={symbol}
                                list="stocks"
                                placeholder="search by Symbol"
                                ref={symbolInput}
                                onChange={searchBySymbol}

                            ></input> */}
                            <div class="search">
                            <br/>
                            <input type="text" class="form-control "
                                placeholder="&#128270; Search by Symbol"
                                list="stocks"
                                value={symbol}
                                ref={symbolInput}
                                onChange={searchBySymbol} />
                            {/* <button class="btn btn-primary searchbutton" onClick={searchBySector}>Search</button> */}
                            <datalist id="stocks" >
                                <option value="">Select the Symbol</option>
                                {masterData.map((item) => {
                                    return (
                                        <option value={item.symbol}>
                                            {item.symbol}
                                        </option>
                                    );
                                })}
                            </datalist>
                        </div>
                            {/* <input type="text" class="form-control " 
                            placeholder="&#128270; Search by Symbol" 
                            onChange={(e) => { setSymbol(e.target.value) }} /> */}
                            {/* <button class="btn btn-primary" onClick={searchBySymbol}>Search</button> */}
                        </div>

                    </div>

                </div>
            </div>
            <IsinTable securityMaster={securityMaster}></IsinTable>

        </>
    )
}
export default Symbol;