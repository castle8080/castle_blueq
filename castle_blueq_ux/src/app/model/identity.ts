export class Identity {
    constructor(
        public name: string,
        public username: string,
        public token: string,
        public expires: Date|null
    ) {}
}