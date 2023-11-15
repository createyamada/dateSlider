const getPeriodDate = () => {
    // 現在年月日と、1カ月前の年月日を取得
    const now = new Date();
    const pre = new Date();
    pre.setMonth(pre.getMonth() + 1);
    
    let result = new Array;
    for(let i = now; i <= pre; i.setDate(i.getDate() + 1)) {
        let date = i.getFullYear() + '年'
        + (i.getMonth() + 1).toString().padStart(2,"0") + '月'
        + i.getDate().toString().padStart(2,"0") + '日';
        result.push(date);
    }
    console.log(result);
    return result;
};

export {
    getPeriodDate
}
