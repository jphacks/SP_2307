import { initializeApp } from 'firebase/app';
import { getDatabase, Database, ref, set } from "firebase/database";
import { useEffect, useState } from 'react';
import { useCommentSend } from './useCommentSend';
import useSWR from "swr";
import { fetcher } from '../utils/swr';

export type Comment = {
    content: string;
    position: {
        latitude: number;
        longitude: number;
    };
    visible: boolean;
    id: string;
    created_at: number;
}

/*
    コメントの取得機能を提供します.
*/
export const useComments = () => {
    const url = "https://jphacks2023-ea7a8-default-rtdb.firebaseio.com/data.json";
    const { data, error, isLoading, mutate } = useSWR<{ [key in string]: Comment}>(url, fetcher);
    let comments: Comment[] = []
    
    if (data) {
        /*
            SWRからデータを受信した際に、comments配列を構成する
        */
        const tmp = [];
        for (const key in data) {
            tmp.push(data[key]); 
        }
        comments = tmp;
        console.log(comments); 
    }

    if (error) {
        /*
            通信エラーの発生時
        */
        console.error(error);
    }

    const { send } = useCommentSend();
    
    return {
        comments,
        error,
        isLoading,
        mutate,
        addComment: send
    }
}