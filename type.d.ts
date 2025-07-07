import { Condition } from "mongoose";

declare global {
    var mongoose : {
        conn: Condition<Document> | null;
        promise: Promise<Condition<Document>> | null;
    }
}


export {}