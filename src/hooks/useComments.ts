import { initializeApp } from 'firebase/app';
import { getDatabase, Database, ref, set } from "firebase/database";
import { useEffect, useState } from 'react';
import { useCommentSend } from './useCommentSend';

export type Comment = {
    content: string;
    position: {
        latitude: number;
        longitude: number;
    };
    visible: boolean;
    id: string;
    created_at: string;
}

/*
    コメントの取得機能を提供します.
*/
export const useComments = () => {
    const [db, setDB] = useState<Database | null>(null);
    const getComments = () => {

    } 

    const comments = getComments();
    const { send } = useCommentSend();
    return {
        getComments,
        comments,
        addComment: send
    }
}