import React from "react";
import HeaderService from "../../services/HeaderService";
import './Search.css';
import { useState, useEffect, useRef } from "react";
import IsinTable from "./IsinTable";

const Isin = () => {
    let isinInput = useRef();

    const [isinNumber, setIsinNumber] = useState("");
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

    const searchByIsin = (e) => {
        console.log(isinInput.current.value);
        setIsinNumber(e.target.value);
        e.preventDefault();
        HeaderService.getByIsin(isinInput.current.value).then((Response) => {
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

                        <div class="search" align="center">
                            <br></br>
                            {/* <input
                                value={isinNumber}
                                list="stocks"
                                placeholder="search by Isin"
                                ref={isinInput}
                                onChange={searchByIsin}

                            ></input> */}
                            <div class="search">
                            {/* <br/> */}
                            <input type="text" class="form-control "
                                placeholder="&#128270; Search by Isin"
                                value={isinNumber}
                                list="stocks"
                                ref={isinInput}
                                onChange={searchByIsin} />
                            {/* <button class="btn btn-primary searchbutton" onClick={searchBySector}>Search</button> */}
                            <datalist id="stocks" >
                                <option value="">Select the Symbol</option>
                                {masterData.map((item) => {
                                    return (
                                        <option value={item.isinNumber}>
                                            {item.isinNumber}
                                        </option>
                                    );
                                })}
                            </datalist>
                        </div>
                            {/* <input type="text" 
                            class="form-control " 
                            placeholder="&#128270; Search by ISIN" 
                            onChange={(e)=>setIsinNumber(e.target.value)} />
                            <button class="btn btn-primary" onClick={searchByIsin}>Search</button> */}
                        </div>

                    </div>

                </div>
            </div>
            <IsinTable securityMaster={securityMaster}></IsinTable>

            {/* </div> */}

        </>
    )
}
export default Isin;