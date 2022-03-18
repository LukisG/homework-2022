import React, { useEffect, useState, useRef } from "react";
import './auto.css'
import { FaCity, FaPlane, FaCar, FaSearch } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

// sorry about quality of code... trying to improve as much as posible...

const Auto = () => {
    const [display, setDisplay] = useState(false);
    const [display2, setDisplay2] = useState(false);
    const [dataset, setDataset] = useState([]);
    const [search, setSearch] = useState("");
    const [search1, setSearch1] = useState("");
    const [search2, setSearch2] = useState("");
    const [dropoffselect, setDropoffselect] = useState(0);
    const wrapperRef = useRef(null);
    //style changers
    const [stylename, setStylename] = useState('input1')
    const [stylename1, setStylename1] = useState('input-icons1')
    //getting data from backend
    useEffect(() => {
        const fetchdata = async () => {
            // console.log(search)
            const response = await fetch(`http://127.0.0.1:3001/autocomplete?input=${search.toLowerCase()}`);
            const items = await response.json()
            setDataset(items)
        };
        if (search) fetchdata();
    }, [search])

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
            setDisplay2(false);
            setStylename1("input-icons1")
            setStylename("input1");
        }
    };

    const updateinputvalue = changedinput => {
        setStylename1("input-icons1")
        setStylename("input1")
        setSearch1(changedinput);
        setDisplay(false);

    };
    const updateinputvalue2 = changedinput => {
        setStylename1("input-icons1")
        setStylename("input1")
        setSearch2(changedinput);
        setDisplay2(false);
    }
    // notifications
    const notify = () => {
        if (search1 && search2 && dropoffselect !== 0 && dataset[0] || search1 && dataset[0]) {
            toast.success(<div>All data set congrats!</div>)
        } else if (!dataset[0]) {
            toast.error(<div>{
                !dataset[0] ? <div>Error, this city does not exist or it might be a server error</div> : <></>

            }</div>, {
                duration: 3000,
                position: 'top-center',
            })
        } else {
            toast.error(<div>{

                !search1 ? "Please pick a pick-up location." : <></> || !search2 && search1 && dropoffselect != 0 ? <div>Please select dropoff location!</div> : <></> || !search1 && !search2 ? <div>Please Select pickup and dropoff location!</div> : <></>

            }</div>, {
                duration: 2000,
                position: 'top-center',
            })
        }
    };

    return (
        <div>

            <div ref={wrapperRef} className="flex-container flex-column pos-rel">
                {/* select div */}
                <div>
                    <select name="select" className="selectbox" onChange={e => setDropoffselect(e.target.value)}>
                        <option value={0}>Same drop-off</option>
                        <option value={1}>Different drop-off</option>
                    </select>
                </div>
                {/* input 1 */}
                <div className={stylename1}>
                    <i className="icon"><FaCar /></i>
                    <input
                        id="auto"
                        className={stylename}
                        onClick={() => setDisplay(!display) + setStylename("input2") + setStylename1("input-icons2")}
                        placeholder="From?"
                        value={search1}
                        onChange={event => setSearch1(event.target.value) + setSearch(event.target.value)}
                        autoComplete="off"
                    />

                </div>
                {/* input 2 with select checking */}
                {dropoffselect == 1 ? <div className={stylename1}>
                    <i className="icon"><FaCar /></i>
                    <input
                        id="auto"
                        className={stylename}
                        onClick={() => setDisplay2(!display) + setStylename("input2") + setStylename1("input-icons2")}
                        placeholder="To?"
                        value={search2}
                        onChange={event => setSearch2(event.target.value) + setSearch(event.target.value)}
                        autoComplete="off"
                    /></div> : <></>
                }
                {/* autocompleate action */}
                {display && (
                    search && dataset["0"] ?
                        <div className="autoContainer">
                            <div className="headers"><h4>Cities (including airaports)</h4></div>
                            {/* rendering cities with airaports */}
                            {dataset.map((value, i) =>
                            (

                                <div
                                    onClick={() => updateinputvalue(value.cityonly)}
                                    className="option"
                                    key={i}
                                    tabIndex="0"
                                >

                                    <div className="icondiv">
                                        <FaCity />
                                        <span> {value.cityname}</span>
                                        <div className="bottomtext">{value.country}</div>
                                    </div>
                                </div>

                            ))}
                            {dataset ? <div className="headers"><h4> Airports </h4></div> : <></>}
                            {/* rendering airaports */}
                            {dataset.filter(item => item.airportname).map((value, i) =>
                            (
                                <div
                                    onClick={() => updateinputvalue(value.cityonly)}
                                    className="option"
                                    key={i}
                                    tabIndex="0"
                                >
                                    <div className="icondiv">
                                        <FaPlane />
                                        <span> {value.cityname}</span>
                                        <span className="endtext"> {value.apicode}</span>
                                        <div className="bottomtext">{value.cityname}</div>
                                    </div>
                                </div>
                            ))}
                        </div> : <p>Start Typing</p>
                )}

                {/* second searchbar dropdown */}
                {display2 && (
                    search2 && dataset["0"] ?
                        <div className="autoContainer2">

                            <div className="headers"><h4>Cities (including airaports)</h4></div>
                            {/* rendering cities with airaports */}
                            {dataset.map((value, i) =>
                            (

                                <div
                                    onClick={() => updateinputvalue2(value.cityonly)}
                                    className="option"
                                    key={i}
                                    tabIndex="0"
                                >

                                    <div className="icondiv">
                                        <FaCity />
                                        <span> {value.cityname}</span>
                                        <div className="bottomtext">{value.country}</div>
                                    </div>
                                </div>

                            ))}
                            {dataset ? <div className="headers"><h4> Airports </h4></div> : <></>}
                            {/* rendering airaports */}
                            {dataset.filter(item => item.airportname).map((value, i) =>
                            (
                                <div
                                    onClick={() => updateinputvalue2(value.cityonly)}
                                    className="option"
                                    key={i}
                                    tabIndex="0"
                                >
                                    <div className="icondiv">
                                        <FaPlane />
                                        <span> {value.cityname}</span>
                                        <span className="endtext"> {value.apicode}</span>
                                        <div className="bottomtext">{value.cityname}</div>
                                    </div>

                                </div>
                            ))}
                        </div> : <></>
                )}

            </div>
            <button className="buttonstyle" onClick={() => { if (!search1 || !search2 && search1 && dropoffselect != 0 || !search1 && !search2 || search1 && search2 && dropoffselect != 0 || search1 && search2 && dataset[0] || search1 || !dataset[0]) notify() }}><FaSearch /></button>
            <Toaster />
        </div>
    );
};
export default Auto;