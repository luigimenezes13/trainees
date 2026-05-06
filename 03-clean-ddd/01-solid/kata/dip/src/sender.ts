import Email from "./email"
import Employee from "./employee"

export interface Sender{
    send(employee: Employee): void
}