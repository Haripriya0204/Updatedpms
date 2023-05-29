import React, { useState } from "react";
import './Search.css';
import { Link } from "react-router-dom";

import HeaderService from "../../services/HeaderService";

const Sector = () => {

    const [sector, setSector] = useState('');
    const [securityMaster, setSecurityMaster] = useState({
        data: [],
        loading: true
    });



    const searchBySector = (e) => {
        e.preventDefault();
        HeaderService.getBySector(sector).then((Response) => {
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
            <div class="container">
                <div class="row height d-flex justify-content-center align-items-center">
                    <div class="col-md-8">
                        <div class="search">
                            <br/>
                            <input type="text" class="form-control "
                                placeholder="&#128270; Search by Sector"
                                onChange={(e) => { setSector(e.target.value) }} />
                            <button class="btn btn-primary searchbutton" onClick={searchBySector}>Search</button>
                        </div>

                    </div>

                </div>
            </div>
            <div>
                <div className="container"style={{marginRight:'9%',marginTop:'-8%'}}>
                    <br></br>
                    <br></br>
                    <table className="table table-bordered" style={{right:'20%'}}>
                        <thead>
                            <tr style={{ backgroundColor: "black", color: "white" }}>
                                <th>Exchange</th>
                                <th>Country</th>
                                <th>Currency</th>
                                <th>ISIN Number</th>
                                <th>Symbol</th>
                                <th>CompanyName</th>
                                <th>Series</th>
                                <th>Sector</th>
                                <th>Industry</th>
                                <th>GICS</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                securityMaster.loading ? '' :
                                    securityMaster.data.map(item =>
                                    (<tr key={item.isinNumber}>
                                        <td>{item.exchange}</td>
                                        <td>{item.country}</td>
                                        <td>{item.currency}</td>
                                        <td>{item.isinNumber}</td>
                                        <td>{item.symbol}</td>
                                        <td>{item.nameOfCompany}</td>
                                        <td>{item.series}</td>
                                        <td>{item.sector}</td>
                                        <td>{item.industry}</td>
                                        <td>{item.gics}</td>
                                    </tr>)

                                    )


                            }
                        </tbody>

                    </table>
                </div>

            </div>
        </>
    )
}
export default Sector;