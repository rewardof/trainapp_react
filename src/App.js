import React, {useState, useEffect} from "react";

import "./App.css";
import "antd/dist/antd.css";
import Colculate from "./components/calculate";
import Result from "./components/result";
import axios from "axios";

function App() {
    const [list, setList] = useState([]);
    const [locomotivs, setLocomotivs] = useState([]);
    const [relSwitch, setRelSwitch] = useState([]);
    const [relChar, setRelChar] = useState([]);
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [visible, setVisible] = useState(false);
    const [distance, setDistance] = useState(0);
    const getResult = () => {
        axios("https://trainresapp.herokuapp.com/number/")
            .then((res) => {
                console.log(res.data)
                setList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getLocomotive = () => {
        axios("https://trainresapp.herokuapp.com/locomotivs/")
            .then((res) => {
                setLocomotivs(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getRelSwitch = () => {
        axios("https://trainresapp.herokuapp.com/switch-list/")
            .then((res) => {
                setRelSwitch(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getRelChar = () => {
        axios("https://trainresapp.herokuapp.com/railway-charachteristics-list/")
            .then((res) => {
                setRelChar(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getData = (values) => {
        axios({
            url: `https://trainresapp.herokuapp.com/result/`,
            method: "POST",
            data: values
        }).then((res) => {
            setData(res.data.result);
            setVisible(false)
            setDistance(res.data.braking_distance)
        })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        getResult();
        getLocomotive();
        getRelSwitch();
        getRelChar();
    }, []);
    const togglePage = (open) => {
        setToggle(open);
    };
    return (
        <div className={toggle ? "app" : "app active"}>
            <div className={toggle ? "calculate-box active" : "calculate-box "}>
                <Colculate getResult={getResult} list={list} togglePage={togglePage}/>
            </div>
            <div className={toggle ? "result-box active" : "result-box"}>
                <Result
                    togglePage={togglePage}
                    locomotivs={locomotivs}
                    getData={getData}
                    data={data}
                    relSwitch={relSwitch}
                    relChar={relChar}
                    visible={visible}
                    setVisible={setVisible}
                    distance={distance}
                />
            </div>
        </div>
    );
}

export default App;
