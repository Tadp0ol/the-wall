const CommentModel = require("../models/comments.model");
const { checkFields } = require("../helpers/validation.helpers");

class CommentController{
    createComment = async(req, res) => {
        let response_data = { status: false, result: {}, error: null };
        
        try{
            let check_fields_result = await checkFields(["comment", "message_id"], req.body);
            
            if(check_fields_result.status){
                response_data = await CommentModel.createComment({
                    comment: check_fields_result.result.comment, 
                    message_id: check_fields_result.result.message_id, 
                    user_id: req.session.user_data.id 
                });
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

    deleteComment = async(req, res) => {
        let response_data = { status: false, result: {}, error: null };
        
        try{
            let check_fields_result = await checkFields(["comment_id"], req.body);
            
            if(check_fields_result.status){
                response_data = await CommentModel.deleteComment({comment_id: check_fields_result.result.comment_id, user_id: req.session.user_data.id });
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

module.exports = (function Comment(){
    return new CommentController();
})();