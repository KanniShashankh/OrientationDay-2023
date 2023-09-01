import { getDocs, collection } from "firebase/firestore"; 
import { getDb } from "../config"

const collection_name = "cse"

export const findAll = async () => {
    const doc_refs = await getDocs(collection(getDb(), collection_name))

    const res = []

    doc_refs.forEach(sname => {
        res.push({
            s_name: sname.name, 
            ...sname.data()
        })
    })

    return res
}