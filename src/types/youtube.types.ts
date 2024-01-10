export type Thumbnail = {
    url: string
    width: number
    height: number
}

export type Video = {
    id: string
    snippet: {
        title: string
        publishedAt: string
        thumbnails: {
            default: Thumbnail
        }
        categoryId: string
    }
    statistics: {
        viewCount: string
    }
}

export type YTResponse<T> = {
    items: T
}
