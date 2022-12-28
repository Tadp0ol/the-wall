const Mysql = require("mysql");
const databaseConnection = require("../configs/database");

class CommentsModel{

    createComment = async(params) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let create_comment_query = Mysql.format(`INSERT INTO comments SET ?, created_at = NOW()`, [params]);
            let create_comment_result = await databaseConnection.executeQuery(create_comment_query);

            if(create_comment_result.insertId){
                response_data.status = true;
            }
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    deleteComment = async(params) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let delete_comment_query = Mysql.format(`DELETE FROM comments WHERE id = ? AND user_id = ?`, [params.comment_id, params.user_id]);
            let delete_comment_result = await databaseConnection.executeQuery(delete_comment_query);

            if(delete_comment_result.affectedRows){
                response_data.status = true;
            }
            else{
                response_data.comment = "You cant delete this comment";
            }
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}

module.exports = (function Comment(){
    return new CommentsModel();
})();