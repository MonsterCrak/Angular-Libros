export class JwtDto {
    constructor(
        public token: string,
        public bearer: string,
        public email: string,
        public idUsuario: number,
        public authorities: string[],
        public enlaces: string[]
      ) {}

}
