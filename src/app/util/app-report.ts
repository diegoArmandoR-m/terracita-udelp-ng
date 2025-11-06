import { Router } from "@angular/router";

export class AppReport {
    showModalMessage = false;
    modalTitleMessage="";
    messageBody ="";

    constructor(private router: Router){}
    closeMessageModal(url: string){
        this.showModalMessage=false;
        this.modalTitleMessage ="";
        this.messageBody ="";

        this.redirectTo(url);

    }

    redirectTo(url: string){
        this.router.navigateByUrl('/',{ skipLocationChange: true}).then(() =>{
        this.router.navigate([url])}
    );
    }
}
