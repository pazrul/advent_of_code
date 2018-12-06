function test() {
    const assert = require('assert');
    const input = ['[1518-11-01 00:00] Guard #10 begins shift', '[1518-11-01 00:05] falls asleep', '[1518-11-01 00:25] wakes up', '[1518-11-01 00:30] falls asleep', '[1518-11-01 00:55] wakes up', '[1518-11-01 23:58] Guard #99 begins shift', '[1518-11-02 00:40] falls asleep', '[1518-11-02 00:50] wakes up', '[1518-11-03 00:05] Guard #10 begins shift', '[1518-11-03 00:24] falls asleep', '[1518-11-03 00:29] wakes up', '[1518-11-04 00:02] Guard #99 begins shift', '[1518-11-04 00:36] falls asleep', '[1518-11-04 00:46] wakes up', '[1518-11-05 00:03] Guard #99 begins shift', '[1518-11-05 00:45] falls asleep', '[1518-11-05 00:55] wakes up'];
    const sortedInput = sortLineTime(input);
    const guardKeyObj = sortByGuard(sortedInput);
    const timeCountedGuardObj = buildTimeCount(guardKeyObj);
    const mostSleepyGuard = findMostSleepy(timeCountedGuardObj);
    const mostSleepyMinute = findMostInstances(mostSleepyGuard.minutesAsleep).whichMinute;
    const minuteTimesId = parseInt(mostSleepyGuard.id, 10) * parseInt(mostSleepyMinute, 10);

    assert.strictEqual(mostSleepyGuard.id, '10');
    assert.strictEqual(mostSleepyMinute, '24');
    assert.strictEqual(minuteTimesId, 240);
}

function run(inputRaw) {
    const input = cleanInput(inputRaw);

    const sortedInput = sortLineTime(input);
    const guardKeyObj = sortByGuard(sortedInput);
    const timeCountedGuardObj = buildTimeCount(guardKeyObj);

    let mostInstance = 0;
    let whichMinute;
    let guardId;
    Object.keys(timeCountedGuardObj).forEach((key) => {
        const guardInstance = findMostInstances(timeCountedGuardObj[key].minutesAsleep);
        if (guardInstance.count > mostInstance) {
            whichMinute = guardInstance.whichMinute;
            mostInstance = guardInstance.count
            guardId = key;
        }
    });
    console.log(`minute: ${whichMinute}, id: ${guardId}`);
    // minute: 32, id: 2393
    console.log(whichMinute * guardId);
    // 76576
}

function sortLineTime(timeEntries) {
    const tester = new RegExp(/\[(?<time>.+)\](?<other>.+)/);
    return timeEntries.map((entry) => {
        let matches = tester.exec(entry);
        return {
            time: new Date(matches.groups.time),
            other: matches.groups.other
        }
    }).sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
    });
}

function sortByGuard(timeEntries) {
    let currentGuard = '';
    let guardSchedules = {};
    timeEntries.forEach((line) => {
        const match = new RegExp(/(?<guard>Guard) #(?<id>\d+)/).exec(line.other);
        if (match && match.groups && match.groups.guard) {
            currentGuard = match.groups.id;
        } else {
            guardSchedules[currentGuard] = guardSchedules[currentGuard] || { id: currentGuard, minutes: null, timeList: [], minutesAsleep: [] };
            guardSchedules[currentGuard].timeList.push({
                time: line.time,
                asleep: line.other.includes('falls asleep')
            });
        }
    });

    return guardSchedules;
}

function buildTimeCount(guardObj) {
    Object.keys(guardObj).forEach((id) => {
        let totalSleepMinutes = 0;
        const guardArr = guardObj[id].timeList;
        for (let i = 0; i < guardArr.length; i++) {
            if (guardArr[i + 1] && guardArr[i].asleep) {
                const minutesAsleep = convertMSToMin(guardArr[i + 1].time - guardArr[i].time);
                const startingMinute = guardArr[i].time.getMinutes();
                totalSleepMinutes += minutesAsleep;
                for (let j = 0; j < minutesAsleep; j++) {
                    guardObj[id].minutesAsleep.push((startingMinute + j) % 60);
                }

            }
        }
        guardObj[id].minutes = totalSleepMinutes;
        guardObj[id].minutesAsleep.sort();
    });

    return guardObj;
}

function findMostSleepy(guardObj) {
    let mostSleepyId;
    let maxSleep = 0;
    Object.keys(guardObj).forEach((guard) => {
        if (guardObj[guard].minutes > maxSleep) {
            mostSleepyId = guard;
            maxSleep = guardObj[guard].minutes;
        }
    });
    return guardObj[mostSleepyId];
}

function findMostInstances(sleepingMinutesArray) {
    let count = 0;
    let mostMinuteVal;
    let instanceMap = {};
    sleepingMinutesArray.forEach((val) => {
        instanceMap[val] = instanceMap[val] ? instanceMap[val] + 1 : 1;
    });
    Object.keys(instanceMap).forEach(key => {
        if (instanceMap[key] > count) {
            count = instanceMap[key];
            mostMinuteVal = key;
        }
    });
    return { whichMinute: mostMinuteVal, count: count };
}

function convertMSToMin(ms) {
    return ms / 60000;
}

function cleanInput(text) {
    return text.split('\n').filter(i => i !== '');
}

module.exports = {
    run,
    test
};
