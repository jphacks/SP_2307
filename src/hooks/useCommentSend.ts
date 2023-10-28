import { Comment } from "./useComments";
import { useGeopoint } from "./useGeopoint";

export const useCommentSend = () => {
    const { getLocation } = useGeopoint();
    const internal = async (partialComment: Pick<Comment, "content" | "position">) => {
        const url = "";
        
        const res = await fetch(url, {
            method: "post",
        });
        await res.json();
    }
    const send = (content: string) => {
        getLocation()
        .then(position => {
            
            internal({ content, position: position.coords });
        }).catch(e => console.error(e));
    }

    return {
        send
    }
}