const Mysql = require("mysql");
const databaseConnection = require("../configs/database");

class MessagesModel{

    fetchMessages = async() => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let fetch_messages_query = Mysql.format(`
                SELECT 
                    messages.*,
                    CONCAT(users.first_name, " ", users.last_name) AS full_name,
                    DATE_FORMAT(messages.created_at, "%M %D %Y") AS created_at,
                    (
                        SELECT 
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    "comment_id", comments.id,
                                    "comment", comments.comment,
                                    "full_name", CONCAT(comment_users.first_name, " ", comment_users.last_name),
                                    "created_at", DATE_FORMAT(comments.created_at, "%M %D %Y")
                                )
                            )
                        FROM comments
                        INNER JOIN users AS comment_users ON comment_users.id = comments.user_id
                        WHERE comments.message_id = messages.id
                    ) AS comments
                FROM the_wall.messages
                INNER JOIN users ON users.id = messages.user_id
                ORDER BY id DESC;
            `);
            let fetch_messages_result = await databaseConnection.executeQuery(fetch_messages_query);

            response_data.status = true;
            response_data.result = fetch_messages_result;
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    createMessage = async(params) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let create_message_query = Mysql.format(`INSERT INTO messages SET ?, created_at = NOW()`, [params]);
            let create_message_result = await databaseConnection.executeQuery(create_message_query);

            if(create_message_result.insertId){
                response_data.status = true;
            }
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    deleteMessage = async(params) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let delete_message_query = Mysql.format(`DELETE FROM messages WHERE id = ? AND user_id = ?`, [params.message_id, params.user_id]);
            let delete_message_result = await databaseConnection.executeQuery(delete_message_query);

            if(delete_message_result.affectedRows){
                let delete_message_comments_query = Mysql.format(`DELETE FROM comments WHERE message_id = ?`, [params.message_id]);
                await databaseConnection.executeQuery(delete_message_comments_query);

                response_data.status = true;
            }
            else{
                response_data.message = "You cant delete this message";
            }
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}

module.exports = (function Message(){
    return new MessagesModel();
})();