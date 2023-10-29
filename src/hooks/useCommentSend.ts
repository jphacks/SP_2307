import { Comment } from "./useComments";
import { useGeopoint } from "./useGeopoint";

export const useCommentSend = () => {
    const { getLocation } = useGeopoint();
    const internal = (partialComment: Pick<Comment, "content" | "position">) => {
        const url = "https://jphacks2023-ea7a8-default-rtdb.firebaseio.com/data.json";;
        const comment: Comment = {
            ...partialComment,
            created_at: new Date().getTime(),
            visible: true,
            id: crypto.randomUUID()
        };
        console.log(comment, JSON.stringify(comment));
        fetch(url, {
            method: "post",
            body:JSON.stringify(comment)     
        });
        return comment;
    }

    const send = (content: string, onSend?: (comment: Comment) => void) => {
        getLocation()
        .then(position => {
            console.log(position.coords);
            const { latitude, longitude } = position.coords;
            const comment = internal({ content, position: { latitude, longitude } })
            if (onSend) onSend(comment);
        }).catch(e => console.error(e));
    }

    return {
        send
    }
}