import { atom } from "recoil";

export const account = atom({
    key: "account",
    default:{},
    persistence_UNSTABLE: {
        type: 'account'
    }
})