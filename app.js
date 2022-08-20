// DECLARING, ASSIGNING & INITIALISING

import { stringToDate } from "./date.js";

const timingtable = document.getElementById("timingtable")
const todayDate = new Date()
const url = `https://api.aladhan.com/v1/calendar?latitude=10.641710&longitude=76.691730&method=2&month=${todayDate.getMonth() + 1}&year=${todayDate.getFullYear()}`
let x, y, z, obj
let nestedTimeArray = []

// FETCHING DATA FROM API

fetch(url)           //api for the get request
    .then(response => response.json())
    .then(data => extractData(data));

// THE FUNCTIONLAND

function extractData(data) {

    var unix_timeStamp_value = data.data[3].date.timestamp
    var date = new Date(unix_timeStamp_value * 1000);
    // console.log(date);
    // console.log(data);

    data.data.forEach(element => {

        obj = element.timings
        var allPrayerTiming = Object.keys(obj).map((key) => [key, obj[key]]);
        var filteredPrayerTimings = allPrayerTiming.filter(prayerFilter);


        for (let i = 0; i < filteredPrayerTimings.length; i++) {
            filteredPrayerTimings[i].splice(1, 0, element.date.readable)
            filteredPrayerTimings[i].splice(3, 0, stringToDate(`${filteredPrayerTimings[i][1]} ${filteredPrayerTimings[i][2]}`))
            // console.log(filteredPrayerTimings);
        }
        nestedTimeArray.push(filteredPrayerTimings)

            // console.log(filteredPrayerTimings);
            // console.log(`${key}: ${element.timings[key]}`)
            // <tr>
            // <th colspan="2">${element.date.readable}</th>
            // </tr>

                // <tr>
                //     <td>${filteredPrayerTimings[0][0]}</td>
                //     <td>${filteredPrayerTimings[0][1]}</td>
                //     <td>${filteredPrayerTimings[0][2]}</td>
                //     <td>${filteredPrayerTimings[0][3].toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                // </tr>
                // <tr>
                //     <td>${filteredPrayerTimings[1][0]}</td>
                //     <td>${filteredPrayerTimings[1][1]}</td>
                //     <td>${filteredPrayerTimings[1][2]}</td>
                //     <td>${filteredPrayerTimings[1][3].toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>

                // </tr>

        // for (const key in element.timings) {
        //     timingtable.innerHTML += `<tr>
        //             <td>${key}</td>
        //             <td>${element.timings[key]}</td>
        //         </tr>`;
        //     // z = element.date.readable + " " + element.timings[key]
        //     // console.log(z);
        // }

    });
    var fullTimingArray = nestedTimeArray.flat()
    var upcomingPrayers = fullTimingArray.filter(upcomingPrayersFilter)
    
    // console.log(upcomingPrayers);
    // console.log(fullTimingArray);
    // console.log(nestedTimeArray);

    populateTable(upcomingPrayers)


}

function populateTable(dataArray) {
    var interfaceTimingArray = [];
    for(var dataIndex = 0; dataIndex < 7; dataIndex++){
        interfaceTimingArray.push(dataArray[dataIndex])
        // var dataIndex in dataArray
        // console.log(dataArray[arr][0]);
        timingtable.innerHTML += `
                <tr>
                    <td>${dataArray[dataIndex][0]}</td>
                    <td>${dataArray[dataIndex][1]}</td>
                    <td>${dataArray[dataIndex][3].toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                </tr`
    }
    console.log(interfaceTimingArray);
}

function prayerFilter(obj) {
    return obj[0] === "Fajr" || obj[0] === "Sunrise" || obj[0] === "Dhuhr" || obj[0] === "Asr" || obj[0] === "Maghrib" || obj[0] == "Isha"
}

function upcomingPrayersFilter(timings) {
    return timings[3] > todayDate
}

