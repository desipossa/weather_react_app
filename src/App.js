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
            hour: today.getHours() + 1
        }

        const base = `${ymd.yyyy}${ymd.mm < 10 ? '0' + ymd.mm : ymd.mm}${ymd.dd}`;
        const base_time = `${ymd.hour < 10 ? '0' : ''}${ymd.hour}`;

        //현재 날씨.
        //const r = await axios.get(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${key}&pageNo=1&numOfRows=1000&dataType=json&base_date=${base}&base_time=${base_time}00&nx=${nx}&ny=${ny}`);

        //단기예보
        const r = await axios.get(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${key}&pageNo=1&numOfRows=1000&dataType=json&base_date=${base}&base_time=${base_time}00&nx=${nx}&ny=${ny}`);
        //const r = await axios.get(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=nmPIjJ%2Bj0FufPiP6k4BLPlq3n%2B46QZN%2B6hgSINrrxqk3nNwnoHX2ynqX6Dlgr3xFeivGPus2vgmh6Ifx1vdu1g%3D%3D&pageNo=1&numOfRows=1000&dataType=XML&base_date=20230915&base_time=0500&nx=55&ny=127`);
        const d = await r.data.response.body.items.item;
        console.log(r);

        setData(d);


        //한시간씩 주는 온도 데이터를 뽑아서 배열로 만듬.

        const DD = d.map(it => it.category == 'TMP');

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
                data[4]?.fcstValue
            }
            기온:
            {
                data[3]?.fcstValue
            }
            습도:
            {
                data[1]?.fcstValue
            }

        </div>
    )
}

export default App