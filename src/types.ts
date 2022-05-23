
export type Item = {
    userId: number,
    id: number,
    title: string,
    body: string
}

export enum Status {
    Loading = 'loading',
    Success = 'success',
    Failed = 'failed'
}
