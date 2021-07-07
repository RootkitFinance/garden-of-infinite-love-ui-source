import { IconType } from "../Icon/IconType"

export class ToastInfo {
    public id: string
    public icon: IconType
    public message: string
    public hash?: string
    public displayDurationMs: number

    public constructor(id: string, icon: IconType, message: string, displayDurationMs: number, hash?: string) {
        this.id = id
        this.icon = icon
        this.message = message        
        this.displayDurationMs = displayDurationMs
        this.hash = hash
    }
}