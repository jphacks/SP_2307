import { Comment } from "./useComments";
import { useGeopoint } from "./useGeopoint";

export const useCommentSend = () => {
    const { getLocation } = useGeopoint();
    const internal = async (partialComment: Pick<Comment, "content" | "position">) => {
        const url = "https://jphacks2023-ea7a8-default-rtdb.firebaseio.com/data.json";;
        const comment: Comment = {
            ...partialComment,
            created_at: new Date().toISOString(),
            visible: true,
            id: crypto.randomUUID()
        };
        console.log(comment, JSON.stringify(comment));
        const res = await fetch(url, {
            method: "post",
            body:JSON.stringify(comment)     
        });
        await res.json();
    }

    const send = (content: string) => {
        getLocation()
        .then(position => {
            console.log(position.coords);
            const { latitude, longitude } = position.coords;
            internal({ content, position: { latitude, longitude } });
        }).catch(e => console.error(e));
    }

    return {
        send
    }
}