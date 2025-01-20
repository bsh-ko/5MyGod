export function useNotificationContent() {
    const contentByType = (type, userName) => {
        const contentMap = {
            apply: `${userName}님이 지원했습니다.`,
            comment: `${userName}님이 댓글을 작성했습니다.`,
            expire: "게시 한 심부름의 기한이 만료됐습니다.",
            complete: "심부름을 완료했습니다.",
            accept: `${userName}님이 심부름 지원을 수락했습니다.`,
        };
        return contentMap[type] || "";
    };

    return { contentByType };
}