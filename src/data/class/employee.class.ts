export class EmployeeClass { 
    public id: number;
    public identificationCard: string;
    public firstName: string; 
    public lastName: string;
    public otherName: string;
    public email: string;
    public dominio: string;

    constructor(id: number, identificationCard: string, firstName: string, lastName: string, otherName: string, email: string, dominio: string) {
        this.id = id;
        this.identificationCard = identificationCard;
        this.firstName = firstName;
        this.lastName = this.getLastName();
        this.otherName = otherName;
        this.email = this.getEmail();
        this.dominio = dominio;
      }
    
      getLastName(): string {
        return (this.lastName.replace(" ", ""));
      }
    
      getEmail(): string {
        if (this.id) {
            return `${this.firstName}.${this.lastName}.${this.id}@${this.dominio}`
        }
        else {
            return `${this.firstName}.${this.lastName}@${this.dominio}`
        }
      }
} 