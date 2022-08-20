function stringToDate(x) {

    // from this {06 Aug 2022 12:29 (IST)}      
    // to this   {Aug 06 2022 12:29 GMT+0530}

    x = x.replace("(IST)", "GMT+0530")
    const splits = x.split(" ")

    let tmp = splits[0]
    splits[0] = splits[1]
    splits[1] = tmp

    let y = splits.join(" ")
    let z = Date.parse(y)
    let date = new Date(z)
    
    return date
}
export{stringToDate}

// dateInMS = stringToDate("30 Aug 2022 18:34 (IST)")
// console.log(dateInMS);

// To turn single digit hours to double digits

// var date = new Date();
// currentHours = date.getHours();
// currentHours = ("0" + currentHours).slice(-2);