function countDown(that, timeArr, type, cb) {
    let wxTimer = [];
    if (Array.isArray(timeArr)) {
        wxTimer = timeArr.filter(item => item.state == 1).reduce((a, b) => a.concat({ id: b.id, countDownNum: b.countDownNum }), []);
        // console.log("wxTimer", wxTimer);
        wxTimer.forEach((ele, index) => {
            let timer = setInterval(() => {
                let countDownNum = ele.countDownNum;
                if (countDownNum > 0) {
                    countDownNum--;
                    wxTimer[index].countDownNum = countDownNum;
                    wxTimer[index].countDown = transfor(countDownNum);
                    this.wxTimer = wxTimer;
                } else {
                    wxTimer[index].countDown = '';
                    clearInterval(timer);
                    cb(index);
                }
            }, 1000)
        })
    } else {
        wxTimer.push({ id: timeArr.id, countDownNum: timeArr.countDownNum });
        let timer = setInterval(() => {
            let countDownNum = wxTimer[0].countDownNum;
            if (countDownNum > 0) {
                countDownNum--;
                wxTimer[0].countDownNum = countDownNum;
                wxTimer[0].countDown = transfor(countDownNum);
                this.wxTimer = wxTimer;
            } else {
                wxTimer[0].countDown = '';
                clearInterval(timer);
                cb();
            }
        }, 1000)
    }
}

function transfor(timestamp, type = 1) {
    if (typeof timestamp !== 'number' || timestamp <= 0) {
        return timestamp;
    }
    // 秒数
    const seconds = Math.floor(timestamp);
    // 天位
    const day = Math.floor(seconds / (24 * 60 * 60));
    const hour = Math.floor((seconds - day * 24 * 60 * 60) / 3600);
    // 分钟位
    const min = Math.floor(((seconds - day * 24 * 60 * 60 - hour * 60 * 60) / 60));
    // 秒位 equal to => var sec = second % 60;
    const sec = (seconds - day * 24 * 60 * 60 - hour * 3600 - min * 60);
    // 毫秒位，保留2位
    const micro_sec = Math.floor((timestamp % 1000) / 10);
    const time = [day, hour, min, sec, micro_sec].map(function(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    })
    let result;
    switch (type) {
        case 1:
            result = (Number(time[0]) > 0 ? time[0] + "天" : '') + time[1] + "时" + time[2] + "分" + (Number(time[0]) <= 0 ? time[3] + "秒" : '');
            break;
        case 2:
            result = (Number(time[1]) > 0 ? time[1] + "时" : '') + time[2] + "分" + time[3] + "秒";
            break;
        case 3:
            result = time[1] + "时" + time[2] + "分";
            break;
        case 4:
            result = time[2] + "分" + time[3] + "秒";
            break;
        default:
            result = (Number(time[0]) > 0 ? time[0] + "天" : '') + time[1] + "时" + time[2] + "分" + (Number(time[0]) <= 0 ? time[3] + "秒" : '');
            break;
    }
    return result;
}

export default function(that, timeArr, type, callback) {
    return countDown(that, timeArr, type, callback);
}