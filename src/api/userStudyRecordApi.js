import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../config/firbaseConfig';

export const getUserDailyRecord = async (userUid) => {
    // 로그인한 계정에 모든 공부기록 가져오기
    console.log(userUid);
    try {
        const userRef = ref(db, 'users');
        const userQuery = query(userRef, orderByChild('userUid'), equalTo(userUid));
        const result = await get(userQuery);
        console.log(result);
        if(result.exists()) {
            const userData = result.val();
            return userData;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user daily record:', error);
        throw error;
    }
}