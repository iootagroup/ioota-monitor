class Query {
    constructor(obj) {
        this.Config = obj
        this.Sensor = obj.sensor
        this.Start = obj.tsStart
        this.End = obj.tsEnd
        this.Limit = obj.limit
        this.From = obj.from
    }
    returnPath() {
        return `/api/sensordata?type=${this.Sensor}`
        + `&start=${this.Start}&end=${this.End}`
        + `&limit=${this.Limit}&from=${this.From}`
    }
}

module.exports = {
    Query
}