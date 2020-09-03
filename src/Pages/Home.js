import React from 'react';
import { useRecoilValue } from 'recoil';
import {account as accountAtom} from '../atom';





export default function Home() {
    const account = useRecoilValue(accountAtom)


    return (
        <div>

            
        </div>
    );
}
