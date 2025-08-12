import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../config/firbaseConfig';

export const getUserDailyRecord = async (userUid) => {
    // 로그인한 계정에 모든 공부기록 가져오기
    try {
        // 직접 경로로 접근
        const userRef = ref(db, `users/${userUid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        return userData.dailyRecord;
    } catch (error) {
        console.error('Error fetching user daily record:', error);
        throw error;
    }
}