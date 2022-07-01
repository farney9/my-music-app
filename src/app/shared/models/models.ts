export interface AuthToken {
    access_token: string
    expires_in: number
    refresh_token: string
    token_type: string
}

export interface TrackData{
    id: string,
    nameTrack: string,
    duration: number,
    url: string,
    img: string,
    release_date: string,
    artist: string,
    album: string,
    favorite: boolean
}

export interface userData{
    name: string,
    img: string
}