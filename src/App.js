import axios from 'axios';
import React, { useEffect, useState } from 'react'

const App = () => {

    const [data, setData] = useState([]);


    // https://velog.io/@byeongju/%EA%B3%B5%EA%B3%B5-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%8F%AC%ED%84%B8-%EB%8B%A8%EA%B8%B0%EC%98%88%EB%B3%B4-api-%EC%97%90%EB%9F%AC-%EC%B2%98%EB%A6%AC



    const getDate = async () => {
        let today = new Date();
        const key = 'nmPIjJ%2Bj0FufPiP6k4BLPlq3n%2B46QZN%2B6hgSINrrxqk3nNwnoHX2ynqX6Dlgr3xFeivGPus2vgmh6Ifx1vdu1g%3D%3D';
        const nx = 98;
        const ny = 75;


        const ymd = {
            yyyy: today.getFullYear(),
            mm: today.getMonth() + 1,
            dd: today.getDate(),
            hour: 10
        }

        const base = `${ymd.yyyy}${ymd.mm > 9 ? ymd.mm : '0' + ymd.mm}${ymd.dd}`;
        const base_time = `${ymd.hour < 10 ? '0' : ''}${ymd.hour}`;

        const r = await axios.get(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${key}&pageNo=1&numOfRows=1000&dataType=json&base_date=${base}&base_time=${base_time}00&nx=${nx}&ny=${ny}`);
        const d = await r.data.response.body.items.item;
        //console.log(r, d);

        setData(d);

    }

    useEffect(() => {
        getDate()
    }, [])


    return (
        <div>
            <h1>부산 서면 현재 날씨</h1>
            {
                console.log(data)
            }
            강수형태 :
            {
                data[0]?.obsrValue
            }
            기온:
            {
                data[3]?.obsrValue
            }
            습도:
            {
                data[1]?.obsrValue
            }

        </div>
    )
}

export default App