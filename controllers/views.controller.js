

class ViewController{
    #req;
    #res;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    loginRegister = async () => {
        if(!this.#req.session?.user_data){
            this.#res.render("login_register.ejs");
        }
        else{
            this.#res.redirect("/dashboard");
        }
    }

    dashboard = async () => {
        if(this.#req.session?.user_data){
            let fetch_messages = [];

            this.#res.render("dashboard.ejs", { user_data: this.#req.session.user_data, messages: fetch_messages.result });
        }
        else{
            this.#res.redirect("/");
        }
    }
}

module.exports = ViewController;