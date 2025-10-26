import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
const moment = require('moment');
export const globalFN = {
    now: (format) => {//'YYYY-MM-DD HH:mm:ss'
        return now(format)
    },
    sendRegister: (registor, getUserData, now, refMap) => {
        console.log({ registor })
        saveSendLog(registor, now)        
        Object.keys(registor).forEach(key => {
            if (refMap[key]) {
                registor[key] = refMap[key].current.value
            }
        })
        // console.log({ after: registor })

        // return axios.post('http://127.0.0.1:4001/sheet/rows', [{ ...registor, Q99: moment().format('YYYY-MM-DD HH:mm:ss') }], { headers: { UserToken: getUserData() } })
        return axios.post('/api/sheet/rows', [{ ...registor, Q99: now, Q102: getUserData("create-time"), Q103: getUserData("firstPathName"), Q104: refMap["Q1"].current.value }], { headers: { UserToken: getUserData() } })
    },
    checkRequired: (globalData, globalDataDispatch, registor) => {
        let result = true
        let firstFailKey;
        globalData.form.filter(formItem => {
            return formItem.required
        }).forEach(formItem => {
            if (registor[formItem.key] == null) {
                if (!firstFailKey) {
                    firstFailKey = formItem.key;
                }
                formItem.isTip = true
                result = false
            }
            else {
                delete formItem.isTip
            }
        })
        globalDataDispatch(JSON.parse(JSON.stringify(globalData)))
        // return result
        // console.log({firstFailKey})
        return firstFailKey
    },
    getUserData: (inputKey) => {
        let key = "user"
        if (inputKey) {
            key = inputKey
        }
        if (!localStorage.getItem('user')) {
            localStorage.setItem('user', uuidv4())
            localStorage.setItem('create-time', now('YYYY-MM-DD HH:mm:ss'))
            localStorage.setItem('firstPathName', window.location.pathname)
            window.location.reload();
        }

        return localStorage.getItem(key)
    },
    getIsSuccess: () => {
        return (localStorage.getItem("isSuccess") == null) ? false : JSON.parse(localStorage.getItem("isSuccess"))
    },
    setIsSuccess: (result) => {
        localStorage.setItem('isSuccess', result)
    }, caculateCountDown: (start, end, mode) => {
        const diff = moment.duration(end.diff(start));
        if (diff.asDays() > 0) {
            if (mode == "all") {
                return `${Math.floor(diff.asDays())} Days ${padStart2WithZero(diff.hours())}:${padStart2WithZero(diff.minutes())}:${padStart2WithZero(diff.seconds())}`;
            }
            else if (mode == "day") {
                return `${Math.floor(diff.asDays())}`
            }
            else {
                return `${padStart2WithZero(diff.hours())}:${padStart2WithZero(diff.minutes())}:${padStart2WithZero(diff.seconds())}`
            }
        }

        if (mode == "all") {
            return `${diff.hours()}:${diff.minutes()}:${diff.seconds()}`;
        }
        else if (mode == "day") {
            return 0;
        }
        else {
            return `${diff.hours()}:${diff.minutes()}:${diff.seconds()}`;
        }

    }, initRegistor: () => {
        let registor = {}
        getForm().forEach(item => {
            if (item.default != null) {
                registor[item.key] = item.default
            }
        })
        return registor
    }, getForm: () => {
        return getForm()
    }, getInfo: (mode) => {
        return getInfo(mode)
    }, updateForm: function (globalData, globalDataDispatch, registor) {
        let globalDataInstance = JSON.parse(JSON.stringify(globalData))
        let formInstance = globalDataInstance.form
        console.log("updateForm")
        let item9 = getFormItem(formInstance, "Q9")
        let item10 = getFormItem(formInstance, "Q10")
        Object.keys(registor).forEach(key => {

            if (key === "Q8" & registor[key] === "電子喜帖") {
                item9.required = false;
                item10.required = true;
            }

            if (key === "Q8" & registor[key] === "紙本喜帖") {
                item9.required = true;
                item10.required = false;
            }

            if (key === "Q8" & registor[key] === "電子+紙本喜帖") {
                item9.required = true;
                item10.required = true;
            }
        })

        globalDataDispatch(globalDataInstance)
    }, handleRWD: (rwd, rwdDispatch) => {
        let rwdMode = "mobile"
        if ((window.innerHeight / window.innerWidth) < (12 / 9) && window.innerWidth > 450) {
            rwdMode = "web"
        }
        // console.log({ instanceRwd: rwd })
        if (rwdMode != rwd.rwdMode) {
            let instanceRwd = JSON.parse(JSON.stringify(rwd))
            instanceRwd.rwdMode = rwdMode
            rwdDispatch(instanceRwd)
        }
        let htmlElement = document.querySelector('html');
        let mainElement = document.querySelector('.main');
        document.documentElement.style.setProperty('--main-width', `${(mainElement.offsetWidth < htmlElement.offsetWidth) ? mainElement.offsetWidth : htmlElement.offsetWidth}px`);
        // console.log({ htmlElement: htmlElement.offsetWidth })
        // console.log({ mainElement: mainElement.offsetWidth })
    }, gen20230916: () => {
        return gen20230916()
    }, gen20231028: () => {
        return gen20231028()
    }
}

const now = (format) => {
    return moment().format(format)
}

const saveSendLog = (registor, now) => {
    let log = localStorage.getItem('sendLog')
    if (!log) {
        log = {}
    }
    else {
        log = JSON.parse(log)
    }

    log[now] = registor
    return localStorage.setItem('sendLog', JSON.stringify(log))
}

const updateSecond = (fn) => {
    fn()
    setTimeout(() => {
        updateSecond(fn)
    }, 1000)
}

const padStart2WithZero = (value) => {
    return value.toString().padStart(2, "0")
}

const getForm = () => {
    let formSetting = require(`../assets/setting/form.json`);
    // console.log({ formSetting })
    return formSetting
}

const getInfo = function (mode) {
    let r = require.context('../assets', true, /\.(png|jpe?g|svg)$/i)
    let keys = r.keys()
    let paths = r.keys().map(r)
    let photoInfos = keys.map((key, i) => {
        return {
            key: key,
            path: paths[i]
        }
    })
    let info = { info: { bio: "" }, albums: [] }
    info = require(`../assets/setting/ig.json`);

    info.albums = getAlbums(info.albums, photoInfos)
    info.albumFrames = getAlbumFrames(info.albums)
    // info.albums.map(album => {
    //   const regex = new RegExp(`album/${album.folderName}`);
    //   let folderPhotos = photoInfos.filter(photoInfo => {
    //     return regex.test(photoInfo.key)
    //   })

    //   const coverRegex = new RegExp(`album/${album.folderName}/cover`);
    //   let coverPhoto = photoInfos.filter(photoInfo => {
    //     return coverRegex.test(photoInfo.key)
    //   })
    //   return {
    //     ...album,
    //     url: coverPhoto.length > 0 ? coverPhoto[0].path : folderPhotos[0].path,
    //     photos: folderPhotos,
    //     rows: album.rows || 1,
    //     columns: album.columns || 1,
    //     clearFix: false
    //   }
    // })
    const avatarRegex = new RegExp(`avatar`);
    let avatars = photoInfos.filter(photoInfo => {
        return avatarRegex.test(photoInfo.key)
    })
    console.log({ avatars })
    info.avatars = avatars;
    return info;
}

const getAlbums = function (albums, photoInfos) {
    return albums.map(album => {
        const regex = new RegExp(`album/${album.folderName}/(?!text/)`, "i");
        let folderPhotos = photoInfos.filter(photoInfo => {
            return regex.test(photoInfo.key)
        })
        // console.log({ folderPhotos })

        const coverRegex = new RegExp(`album/${album.folderName}/cover`, "gi");
        let coverPhoto = photoInfos.filter(photoInfo => {
            return coverRegex.test(photoInfo.key)
        })
        const textRegex = new RegExp(`album/${album.folderName}/text`, "gi");
        let textPhoto = photoInfos.filter(photoInfo => {
            return textRegex.test(photoInfo.key)
        })
        return {
            ...album,
            url: coverPhoto.length > 0 ? coverPhoto[0].path : folderPhotos[0].path,
            textUrl: textPhoto.length > 0 ? textPhoto[0].path : null,
            photos: folderPhotos,
            rows: album.rows || 1,
            columns: album.columns || 1,
            sort: album.sort || 100,
            clearFix: false
        }
    }).sort((a, b) => a.sort - b.sort)
}

const convertAlbumFrames = function (albumFrames, albums) {
    let caculateTempData = []
    let maxRows = 0
    for (var i in albumFrames) {
        if (albumFrames[i].length > maxRows) {
            maxRows = albumFrames[i].length;
        }
    }

    for (var i = 0; i < maxRows; i++) {

    }
}

const getAlbumFrames = function (albums) {
    let caculateTempData = [[], [], []]
    let albumFrames = []
    let tmpAlbums = []
    let albumFrame;
    for (var i = 0; i < albums.length; i++) {
        let minIndex = getMinPosition(caculateTempData)
        if (albums[i].columns === 1 && albums[i].rows === 1) {
            let existsFrame = albumFrames.find((albumFrame) => {
                return albumFrame.status != "done" && albumFrame.indexes.indexOf(minIndex) > -1
            })
            if (existsFrame) {
                if (Math.abs(Math.max(existsFrame.saveIndexes) - minIndex) == 2) {
                    albumFrame = {
                        status: "inprogress",
                        indexes: [0, 1, 2],
                        saveIndexes: [minIndex],
                        albums: [i],
                        albumCount: 1,
                        rows: 1,
                        columns: 1
                    }
                    albumFrame.indexes = albumFrame.indexes.filter(index => { return index >= minIndex })
                    albumFrames = [...albumFrames, albumFrame]
                }
                else {
                    existsFrame.albums.push(i)
                    existsFrame.albumCount++;
                    let matchIndex = existsFrame.saveIndexes.indexOf(minIndex)
                    if (matchIndex > -1 && matchIndex == 0) {
                        existsFrame.rows++
                    }
                    else {
                        existsFrame.saveIndexes.push(minIndex)
                        existsFrame.columns++
                    }
                }
            }
            else {
                albumFrame = {
                    status: "inprogress",
                    indexes: [0, 1, 2].filter(index => { return index >= minIndex }),
                    saveIndexes: [minIndex],
                    albums: [i],
                    albumCount: 1,
                    rows: 1,
                    columns: 1
                }
                albumFrames = [...albumFrames, albumFrame]
            }

            placeAlbum(albums[i], i, caculateTempData, minIndex)
            minIndex = getMinPosition(caculateTempData)
            if (tmpAlbums.length > 0 && checkAlbumAvailable(tmpAlbums[0], caculateTempData, minIndex)) {
                albumFrames = [...albumFrames, {
                    status: "done",
                    albums: [tmpAlbums[0].albumIndex],
                    albumCount: albums[tmpAlbums[0].albumIndex].rows * albums[tmpAlbums[0].albumIndex].columns,
                    rows: albums[tmpAlbums[0].albumIndex].rows,
                    columns: albums[tmpAlbums[0].albumIndex].columns
                }]
                placeAlbum(tmpAlbums[0], "N", caculateTempData, minIndex)
                tmpAlbums.shift()
            }
        }
        else {
            if (!checkAlbumAvailable(albums[i], caculateTempData, minIndex)) {
                albums[i].albumIndex = i
                tmpAlbums.push(albums[i])
            }
            else {
                albumFrames = [...albumFrames, {
                    status: "done",
                    albums: [i],
                    albumCount: albums[i].rows * albums[i].columns,
                    rows: albums[i].rows,
                    columns: albums[i].columns
                }]
                placeAlbum(albums[i], i, caculateTempData, minIndex)
                albumFrames.filter((albumFrame) => {
                    return albumFrame.status != "done"
                }).forEach((albumFrame) => {
                    albumFrame.indexes = getAvailableIndexs(caculateTempData, Math.min.apply(Math, albumFrame.saveIndexes))
                })
            }
        }

        if (getAlbumTotalCount(albumFrames) % 3 == 0 &&
            (caculateTempData[0].length === caculateTempData[1].length &&
                caculateTempData[1].length === caculateTempData[2].length)) {
            albumFrames.filter(albumFrame => {
                return albumFrame.status === "inprogress"
            }).forEach(albumFrame => {
                albumFrame.status = "done"
            })
        }

    }

    while (tmpAlbums.length > 0) {
        albumFrames = [...albumFrames, {
            status: "done",
            albums: [tmpAlbums[0].albumIndex],
            albumCount: albums[tmpAlbums[0].albumIndex].rows * albums[tmpAlbums[0].albumIndex].columns,
            rows: albums[tmpAlbums[0].albumIndex].rows,
            columns: albums[tmpAlbums[0].albumIndex].columns
        }]
        placeAlbum(tmpAlbums[0], "N", caculateTempData, 0)
        tmpAlbums.shift()
    }

    console.log({ albumFrames })
    // return caculateTempData;
    return albumFrames;
}

const getAlbumTotalCount = function (albumFrames) {
    let sum = 0
    albumFrames.forEach(albumFrame => {
        sum += albumFrame.albumCount
    })
    return sum
}

const checkAlbumAvailable = function (album, caculateTempData, minIndex) {
    // if (album.columns + minIndex > 3) {
    //     return false
    // }

    // let count;
    // for (var i = minIndex; i < minIndex[album.columns]; i++) {
    //     if (count) {
    //         if (count != caculateTempData[i].length) {
    //             return false
    //         }
    //     }
    //     else {
    //         count = caculateTempData[i].length
    //     }
    // }
    // return true
    for (var c = 0; c < album.columns; c++) {
        if (minIndex + c >= caculateTempData.length) {
            return false
        }

        let currentDepth = caculateTempData[minIndex].length
        if (caculateTempData[minIndex + c][currentDepth]) {
            return false
        }
    }
    return true
}

const getAvailableIndexs = function (caculateTempData, minIndex) {
    let indexs = []
    let currentDepth = caculateTempData[minIndex].length
    for (var i = minIndex; i < 3; i++) {
        if (!caculateTempData[i][currentDepth]) {
            indexs.push(i)
        }
        else {
            break;
        }
    }
    return indexs
}

const placeAlbum = function (album, index, caculateTempData, minIndex) {
    for (var r = 0; r < album.rows; r++) {
        for (var c = 0; c < album.columns; c++) {
            caculateTempData[minIndex + c].push(index)
        }
    }
}

const getMinPosition = function (caculateTempData) {
    let min = 0;
    let minIndex = 0;
    for (var i = 0; i < caculateTempData.length; i++) {
        if (i === 0) {
            min = caculateTempData[i].length
        }
        else {
            if (caculateTempData[i].length < min) {
                min = caculateTempData[i].length
                minIndex = i
            }
        }
    }
    return minIndex
}

const getFormItem = function (formInstance, key) {
    return formInstance.find(item => {
        return item.key === key
    })
}

const gen20230916 = () => {
    return <div className='wedding-info'>
        <div>♥️日期: 2023/09/16 (六)</div>
        <div>♥️時間: 入席:12:00  開席:12:30</div>
        <div>♥️席設: 88樂章婚宴會館(天空之城廳)</div>
        <div>♥️地址: 114台北市內湖區民善街88號5樓 <a href="https://goo.gl/maps/Ky82gDHxYus5rHTK9" target="_blank"><FontAwesomeIcon icon={faMap} /></a></div>
    </div>
}


const gen20231028 = () => {
    return <div className='wedding-info'>
        <div>♥️日期: 2023/10/28 (六)</div>
        <div>♥️時間: 入席:12:00  開席:12:30</div>
        <div>♥️席設: 臻愛花園飯店-台中高鐵 (佛羅倫斯廳)</div>
        <div>♥️地址: 414台中市烏日區高鐵路三段168號 <a href="https://goo.gl/maps/TztcBQ9wgkGvjpe3A" target="_blank"><FontAwesomeIcon icon={faMap} /></a></div>
    </div>
}