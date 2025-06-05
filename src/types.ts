
export type Unit = {
    id: string
    pods: Pod[]
    readings: Reading[]
    validation?:{ status: string; classification: string }
}

export type Pod = {
    id: string
    age : number
}

export type Reading = {
    id: string
    pH: number
    temp: number
    ec: number
    timestamp: string
}

