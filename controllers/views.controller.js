
class ViewController{
    #req;
    #res;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    loginRegister = async () => {
        this.#res.render("login_register.ejs");
    }
    
    logout  = async(req, res) => {
        this.#req.session.destroy();
        this.#res.redirect("/");
    }
}

module.exports = ViewController;