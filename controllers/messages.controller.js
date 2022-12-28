const MessageModel = require("../models/messages.model");
const { checkFields } = require("../helpers/validation.helpers");

class MessageController{
    createMessage = async(req, res) => {
        let response_data = { status: false, result: {}, error: null };
        
        try{
            let check_fields_result = await checkFields(["message"], req.body);
            
            if(check_fields_result.status){
                response_data = await MessageModel.createMessage({message: check_fields_result.result.message, user_id: req.session.user_data.id });
            }
            else{
                response_data.message = check_fields_result.result;
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    }

    deleteMessage = async(req, res) => {
        let response_data = { status: false, result: {}, error: null };
        
        try{
            let check_fields_result = await checkFields(["message_id"], req.body);
            
            if(check_fields_result.status){
                response_data = await MessageModel.deleteMessage({message_id: check_fields_result.result.message_id, user_id: req.session.user_data.id });
            }
            else{
                response_data.message = check_fields_result.result;
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    }
}

module.exports = (function Message(){
    return new MessageController();
})();