class TagsGenerator {
    constructor(tagsList, {
        containerW = 1024, containerH = 768, gap = 16, shrink = false, limit = 0
    } = {}) {
        this.limit = limit
        this.originTagList = tagsList
        this.containerW = containerW
        this.containerH = containerH
        this.gap = gap
        this.finalBlockList = []
        this.centerPos = {
            x: this.containerW / 2,
            y: this.containerH / 2
        }
        this.eachStep = 8
        this._initSize(shrink)
        this._initList()
        this.start()
    }

    _initSize(shrink) {
        if (shrink) {
            this.widthArr = [48, 56, 64, 72, 88]
            this.heightArr = [18, 20, 24, 24, 28]
            this.fontSize = [12, 14, 16, 18, 22]
        } else {
            this.widthArr = [64, 72, 88, 96, 128]
            this.heightArr = [28, 30, 32, 36, 48]
            this.fontSize = [14, 16, 18, 22, 28]
        }
    }

    _initList() {
        this.blockList = JSON.parse(JSON.stringify(this.originTagList))
        this.blockList = this.blockList.filter((obj) => obj.count > this.limit)
        this.blockList = this.blockList.sort((a, b) => a.count - b.count).map((obj, idx) => {
            obj.orderIdx = idx
            return obj
        })
        this.maxCount = this.blockList[this.blockList.length - 1].count
        this.allLen = this.blockList.length
    }

    update({
        containerW = 1024, containerH = 768, gap = 16, shrink = false, limit = 0
    }) {
        this.limit = limit
        this.containerW = containerW
        this.containerH = containerH
        this.gap = gap
        this.finalBlockList = []
        this.centerPos = {
            x: this.containerW / 2,
            y: this.containerH / 2
        }
        this.finalBlockList = []
        this._initSize(shrink)
        this._initList()
        this.start()
    }

    output() {
        return this.finalBlockList
    }

    start() {
        // 创建最大的
        const biggestBlock = this.__createBiggestBlock(this.blockList.pop())
        this.finalBlockList.push(biggestBlock)
        // 之后打乱顺序，随机创建
        this.blockList.sort(() => Math.random() < 0.5 ? 1 : -1)
        for (let i = 0; i < this.blockList.length; i++) {
            const randomBlock = this.__createRandomBlock(this.blockList[i], {}, 0)
            this.finalBlockList.push(randomBlock)
        }
    }

    __createBiggestBlock(block) {
        // 最多的取正中间
        let w = this.widthArr[this.widthArr.length - 1]
        const h = this.heightArr[this.heightArr.length - 1]
        const fontSize = this.fontSize[this.fontSize.length - 1]

        const len = bytesCount(block.label)
        w = Math.max(len * 13 * fontSize / this.fontSize[0], w)
        return {
            w: w + 2 * this.gap,
            h: h + 2 * this.gap,
            x: this.centerPos.x - w / 2 - this.gap,
            y: this.centerPos.y - h / 2 - this.gap,
            fontSize,
            ...block
        }
    }

    __getValidDegData(block, radDeg) {
        let w, h, fontSize
        // orderIdx 越小，大小应该越小
        // 分隔按照 length 的 40% 65% 85% 99.999%
        if (block.orderIdx < this.allLen * 0.4) {
            w = this.widthArr[0]
            h = this.heightArr[0]
            fontSize = this.fontSize[0]
        } else if (block.orderIdx < this.allLen * 0.65) {
            w = this.widthArr[1]
            h = this.heightArr[1]
            fontSize = this.fontSize[1]
        } else if (block.orderIdx < this.allLen * 0.85) {
            w = this.widthArr[2]
            h = this.heightArr[2]
            fontSize = this.fontSize[2]
        } else {
            w = this.widthArr[3]
            h = this.heightArr[3]
            fontSize = this.fontSize[3]
        }

        const len = bytesCount(block.label)
        w = Math.max(len * 13 * fontSize / this.fontSize[0], w)
        w = w + 2 * this.gap
        h = h + 2 * this.gap
        let radian = 0
        let XRatio = 1; let YRatio = 1
        switch (true) {
            case radDeg >= 0 && radDeg < 90:
                XRatio = 1
                YRatio = -1
                radian = this.__getRadian(radDeg)
                break
            case radDeg >= 90 && radDeg < 180:
                XRatio = -1
                YRatio = -1
                radian = this.__getRadian(180 - radDeg)
                break
            case radDeg >= 180 && radDeg < 270:
                XRatio = -1
                YRatio = 1
                radian = this.__getRadian(radDeg - 180)
                break
            case radDeg >= 270 && radDeg < 360:
                XRatio = 1
                YRatio = 1
                radian = this.__getRadian(360 - radDeg)
                break
            default:
                break
        }
        const eachX = Math.cos(radian) * this.eachStep * XRatio
        const eachY = Math.sin(radian) * this.eachStep * YRatio
        let isOverLap = true
        const pos = {
            x: this.centerPos.x,
            y: this.centerPos.y
        }
        let isValid = true
        while (isOverLap) {
            pos.x += eachX
            pos.y += eachY
            if ((pos.x > this.containerW - w || pos.x - w / 2 - this.gap < 0) || (pos.y > this.containerH - h || pos.y - h / 2 - this.gap < 0)) {
                isValid = false
            }
            isOverLap = this.detectIsOverlap({
                x: pos.x - w / 2 - this.gap,
                y: pos.y - h / 2 - this.gap,
                w,
                h
            })
        }
        return {
            valid: isValid,
            data: {
                x: pos.x - w / 2 - this.gap,
                y: pos.y - h / 2 - this.gap,
                w,
                h,
                fontSize
            }
        }
    }

    __getTheMinRadian(block) {
        let finalData = { w: 0, h: 0, x: 0, y: 0 }
        let minDis = Infinity
        let noValidMinDis = Infinity
        let noValidData = { w: 0, h: 0, x: 0, y: 0 }
        for (let i = 0; i < 360; i += 10) {
            const { valid, data } = this.__getValidDegData(block, i)
            const distance = Math.sqrt(Math.pow(data.x - this.centerPos.x, 2) + Math.pow(data.y - this.centerPos.y, 2))
            if (!valid) {
                if ((data.x <= this.containerW - data.w && data.x >= 0) && data.y > 0) {
                    if (distance < noValidMinDis) {
                        noValidMinDis = distance
                        noValidData = data
                    }
                }
                continue
            }
            if (distance < minDis) {
                minDis = distance
                finalData = data
            }
        }
        if (minDis === Infinity || finalData.x === 0 || finalData.y === 0) {

            return noValidData
        }
        return finalData
    }

    __createRandomBlock(block, cache, retry) {
        // 随机选择一个角度，延长到第一个可用的位置
        const data = this.__getTheMinRadian(block)
        return {
            ...data,
            ...block
        }
    }

    __getRadian(deg) {
        return deg * 2 * Math.PI / 360
    }

    /**
     *
     * @param block {Object} {x,y,w,h}
     * @returns {boolean}
     */
    detectIsOverlap(block) {
        for (let i = 0; i < this.finalBlockList.length; i++) {
            const exist = this.finalBlockList[i]
            if (block.x + block.w > exist.x &&
                exist.x + exist.w > block.x &&
                block.y + block.h > exist.y &&
                exist.y + exist.h > block.y) {
                return true
            }

        }
        return false
    }
}





function bytesCount(str) {
    let cnt = 0;
    for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        if (/^[\u0000-\u00FF]$/.test(c)) {
            cnt++
        } else {
            cnt += 1.5
        }
    }
    return cnt;
}






export default TagsGenerator
