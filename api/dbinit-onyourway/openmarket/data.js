import dayjs from "dayjs";

function getTime(day = 0, second = 0) {
  return dayjs()
    .add(day, "day")
    .add(second, "second")
    .format("YYYY.MM.DD HH:mm:ss");
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      // 1번 회원 (소정님)
      {
        _id: await nextSeq("user"),
        email: "u1@errand.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "심부름꾼",
        phone: "01011112222",
        address: "서울시 강남구 역삼동 123",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/guy.webp`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          gender: "female",
          likes: 120,
          introduction: "",
          errands: ["편의점 배달"],
          transportation: ["도보", "자전거"],
          details: ["발이 빠릅니다 "],
          experience: ["배달", "배달의 민족", "5개월"],
          certificates: ["오토바이 자격증"],
          business: ["무지 사업자"],
          earnings: 20000,
        },
      },
      // 2번 회원 (승아님)
      {
        _id: await nextSeq("user"),
        email: "u2@errand.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "태초마을밀렵꾼지우",
        phone: "01022223333",
        address: "서울시 강남구 삼성동 456",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/jiwoo.webp`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          gender: "male",
          likes: 540,
          introduction: "",
          errands: ["편의점 배달", "음식 배달", "사진 촬영"],
          transportation: ["도보", "대중교통"],
          details: ["저 사진 잘 찍어요 "],
          experience: ["사진관 알바", "우리동네 사진관", "8개월"],
          certificates: ["네오 자격증"],
          business: ["네오 사업자"],
          earnings: 500000,
        },
      },
      // 3번 회원 (수현님)
      {
        _id: await nextSeq("user"),
        email: "u3@errand.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "불꽃공주샐러리쿵야",
        phone: "01033334444",
        address: "서울시 강남구 도곡동 789",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/kungya.webp`,
        createdAt: getTime(-40, -60 * 30),
        updatedAt: getTime(-30, -60 * 20),
        extra: {
          gender: "female",
          likes: 400,
          introduction: "",
          errands: ["빨래", "음식 배달", "사진 촬영"],
          transportation: ["자차", "대중교통"],
          details: [],
          experience: [],
          certificates: [],
          business: [],
          earnings: 10000,
        },
      },
      // 4번 회원 (주석)
      {
        _id: await nextSeq("user"),
        email: "u4@errand.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "세상에서가장강한동물은참새",
        phone: "01044445555",
        address: "서울시 강남구 논현동 222",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/sparrow.webp`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          gender: "male",
          likes: 999,
          introduction: "나는 참 새다",
          errands: ["배달"],
          transportation: ["오토바이"],
          details: ["경력이 없지만 열정은 많습니다. "],
          experience: [],
          certificates: [""],
          business: [],
          earnings: 100000,
        },
      },
      // 5번 회원
      // {
      //   _id: await nextSeq("user"),
      //   email: "n1@market.com",
      //   password:
      //     "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
      //   name: "아무것도없음",
      //   phone: "01044447555",
      //   address: "서울시 강남구 논현동 222",
      //   type: "seller",
      //   loginType: "email",
      //   image: ``,
      //   createdAt: getTime(-20, -60 * 30),
      //   updatedAt: getTime(-10, -60 * 60 * 12),
      //   extra: {
      //     gender: "female",
      //     likes: 9,
      //     introduction: "",
      //     errands: [],
      //     transportation: [],
      //     details: [],
      //     experience: [],
      //     certificates: [],
      //     business: [],
      //     earnings: 500000,
      //   },
      // },
    ],

    // 상품 (심부름 요청 글)
    product: [
      // 1번 유저가 올린 심부름 - 2번 유저가 지원
      // P1: 구인 중 (PS010)
      {
        _id: await nextSeq("product"),
        seller_id: 1,
        price: 10000,

        show: true,
        active: true,
        name: "신라면 블랙 사다 주세요",
        quantity: 999,
        buyQuantity: 0,

        content: `너무 배가 고픈데 나가기가 귀찮아요
        오는 길에 신라면 블랙 5개짜리 한 묶음만 사다 주세요`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC01"],
          tags: ["TA01", "TA02"],
          productState: ["PS010"], // 구인 중
          due: "2025.01.31 18:00:00",
          matchedOrderId: null, // 매칭된 주문(지원)의 _id
          matchedUserId: null, // 매칭된 유저(지원자)의 _id (아직 매칭 안됨)
          pickupLocation: {
            address: "서울 중구 남대문로5길 9",
            detailAddress: "이마트24 한국은행점",
            coordinates: {
              latitude: 37.5617442432919, // 위도
              longitude: 126.978862530774, // 경도
            },
          },
          arrivalLocation: {
            address: "서울특별시 중구 퇴계로 72",
            detailAddress: "SK리더스뷰 남산아파트 101동 101호",
            coordinates: {
              latitude: 37.55915255583279, // 위도
              longitude: 126.9806124437641, // 경도
            },
          },
        },
      },
      // P2: 매칭 완료, 진행 중 (PS020)
      {
        _id: await nextSeq("product"),
        seller_id: 1,
        price: 30000,

        show: true,
        active: true,
        name: "영상 편집 도와주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "앱 시연 영상을 만들어야 하는데 제발 좀 도와주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC03"],
          tags: ["TA03"],
          productState: ["PS020"], // 진행 중
          due: "2025.01.31 18:00:00",
          matchedOrderId: 2, // 매칭된 주문(지원)의 _id (2번 주문과 매칭됨)
          matchedUserId: 2, // 매칭된 유저(지원자)의 _id (2번 유저와 매칭됨)
        },
      },
      // P3: 완료 (PS030)
      {
        _id: await nextSeq("product"),
        seller_id: 1,
        price: 30000,

        show: true,
        active: true,
        name: "창문 샤시 수리해주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "베란다 창문 샤시가 떨어졌어요. 깔끔하게 수리해주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC02"],
          tags: ["TA03", "TA04"],
          productState: ["PS030"], // 완료
          due: "2025.01.31 18:00:00",
          matchedOrderId: 3, // 매칭된 주문(지원)의 _id (3번 주문과 매칭됨)
          matchedUserId: 2, // 매칭된 유저(지원자)의 _id (2번 유저와 매칭됨)
          pickupLocation: {},
          arrivalLocation: {
            address: "서울특별시 마포구 마포대로 195",
            detailAddress: "마포래미안 1동 1호",
            coordinates: {
              latitude: 37.553491092579186, // 위도
              longitude: 126.95314745548572, // 경도
            },
          },
        },
      },
      // P4: 기간 만료 (PS010 && due 지남)
      {
        _id: await nextSeq("product"),
        seller_id: 1,
        price: 40000,

        show: true,
        active: true,
        name: "강아지 돌봄 해주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "저희 집 멍멍이 두 시간만 봐주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC05"],
          tags: ["TA05", "TA07"],
          productState: ["PS010"],
          due: "2025.01.05 18:00:00",
          matchedOrderId: null, // 매칭된 주문(지원)의 _id
          matchedUserId: null, // 매칭된 유저(지원자)의 _id
        },
      },

      // 2번 유저가 올린 심부름 - 1번 유저가 지원
      // P5: 구인 중 (PS010)
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 50000,

        show: true,
        active: true,
        name: "티켓팅 대신 해주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "오굿굿 콘서트 꼭 가고 싶은데 티켓팅 대신 해주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC04"],
          tags: ["TA02", "TA04"],
          productState: ["PS010"], // 구인 중
          due: "2025.12.31 20:00:00",
          matchedOrderId: null, // 매칭된 주문(지원)의 _id
          matchedUserId: null, // 매칭된 유저(지원자)의 _id
        },
      },
      // P6: 매칭 완료, 진행 중 (PS020)
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 40000,

        show: true,
        active: true,
        name: "아이 돌봄 해주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "저희 집 꼬맹이 두 시간만 봐주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC05"],
          tags: ["TA06", "TA07"],
          productState: ["PS020"], // 진행 중
          due: "2025.01.31 18:00:00",
          matchedOrderId: 6, // 매칭된 주문(지원)의 _id
          matchedUserId: 1, // 매칭된 유저(지원자)의 _id (1번 유저와 매칭됨)
          pickupLocation: {},
          arrivalLocation: {
            address: "서울특별시 마포구 마포대로 195",
            detailAddress: "마포래미안 1동 1호",
            coordinates: {
              latitude: 37.553491092579186, // 위도
              longitude: 126.95314745548572, // 경도
            },
          },
        },
      },
      // P7: 완료 (PS030)
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 40000,

        show: true,
        active: true,
        name: "코딩 도와주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "코딩할게 너무 많아요 좀 도와주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC03"],
          tags: ["TA01", "TA02"],
          productState: ["PS030"], // 완료
          due: "2025.01.31 18:00:00",
          matchedOrderId: 7, // 매칭된 주문(지원)의 _id
          matchedUserId: 1, // 매칭된 유저(지원자)의 _id (1번 유저와 매칭됨)
        },
      },
      // P8: 기간 만료 (PS010 && due 지남)
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 50000,

        show: true,
        active: true,
        name: "강원도 여행 가이드 해주실 분",
        quantity: 999,
        buyQuantity: 0,

        content:
          "이번에 강원도 여행을 가는데요, 가이드해 주실 분을 모십니다. 전문 가이드보다는 현지 주민이시면 좋겠어요.",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC03"],
          tags: ["TA04", "TA07"],
          productState: ["PS010"],
          due: "2025.01.04 18:00:00",
          matchedOrderId: null, // 매칭된 주문(지원)의 _id
          matchedUserId: null, // 매칭된 유저(지원자)의 _id
          pickupLocation: {},
          arrivalLocation: {
            address: "강원 속초시 동해대로 3988",
            detailAddress: "속초역",
            coordinates: {
              latitude: 38.1905186369686, // 위도
              longitude: 128.598886861064, // 경도
            },
          },
        },
      },

      // 3번 유저가 올린 심부름 - 4번 유저가 지원
      // P9: 구인 중 (PS010)
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 10000,

        show: true,
        active: true,
        name: "죽과 상비약 부탁",
        quantity: 999,
        buyQuantity: 0,

        content: `죽과 상비약 사다 주세요
        제발요`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC01"],
          tags: ["TA01", "TA02"],
          productState: ["PS010"], // 구인 중
          due: "2025.01.31 18:00:00",
          matchedOrderId: null, // 매칭된 주문(지원)의 _id
          matchedUserId: null, // 매칭된 유저(지원자)의 _id
          pickupLocation: {
            address: "서울 중구 통일로 10 (연세대학교세브란스빌딩) 지하 1층",
            detailAddress: "본죽 연세세브란스빌딩점",
            coordinates: {
              latitude: 37.5570966597, // 위도
              longitude: 126.973633761228, // 경도
            },
          },
          arrivalLocation: {
            address: "서울특별시 중구 만리재로 175",
            detailAddress: "서울역센트럴 자이아파트 102동 102호",
            coordinates: {
              latitude: 37.55470201062915, // 위도
              longitude: 126.96326429421285, // 경도
            },
          },
        },
      },
      // P10: 매칭 완료, 진행 중 (PS020)
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 30000,

        show: true,
        active: true,
        name: "SNS 프로필 사진 찍어주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "프로필 사진 바꾸고 싶은데 가볍게 찍어주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC03"],
          tags: ["TA03"],
          productState: ["PS020"], // 진행 중
          due: "2025.01.31 18:00:00",
          matchedOrderId: 10, // 매칭된 주문(지원)의 _id
          matchedUserId: 4, // 매칭된 유저(지원자)의 _id (4번 유저와 매칭됨)
        },
      },
      // P11: 완료 (PS030)
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 30000,

        show: true,
        active: true,
        name: "문서 작성해주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "전문 문서 작성 도와주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC02"],
          tags: ["TA03", "TA04"],
          productState: ["PS030"], // 완료
          due: "2025.01.31 18:00:00",
          matchedOrderId: 11, // 매칭된 주문(지원)의 _id
          matchedUserId: 4, // 매칭된 유저(지원자)의 _id (4번 유저와 매칭됨)
          pickupLocation: {},
          arrivalLocation: {
            address: "서울특별시 마포구 마포대로 195",
            detailAddress: "마포래미안 2동 2호",
            coordinates: {
              latitude: 37.553491092579186, // 위도
              longitude: 126.95314745548572, // 경도
            },
          },
        },
      },
      // P12: 기간 만료 (PS010 && due 지남)
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 20000,

        show: true,
        active: true,
        name: "고양이 돌봄 해주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "저희 집 야옹이 밥이랑 물 좀 챙겨주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC05"],
          tags: ["TA05", "TA07"],
          productState: ["PS010"],
          due: "2025.01.05 18:00:00",
          matchedOrderId: null, // 매칭된 주문(지원)의 _id
          matchedUserId: null, // 매칭된 유저(지원자)의 _id (아직 매칭 안됨)
          pickupLocation: {},
          arrivalLocation: {
            address: "서울 마포구 공덕동 12-116195",
            detailAddress: "공덕헤리지움아파트 3동 3호",
            coordinates: {
              latitude: 37.54891650614539, // 위도
              longitude: 126.95989486212639, // 경도
            },
          },
        },
      },

      // 4번 유저가 올린 심부름 - 3번 유저가 지원
      // P13: 구인 중 (PS010)
      {
        _id: await nextSeq("product"),
        seller_id: 4,
        price: 10000,

        show: true,
        active: true,
        name: "오는 길에 커피 좀 사다 주세요",
        quantity: 999,
        buyQuantity: 0,

        content: `커피를 안마셨더니 나갈 힘이 없어요. 오시는 길에 카페라떼 아이스 큰걸로 하나 사다 주세요`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC01"],
          tags: ["TA01", "TA02"],
          productState: ["PS010"], // 구인 중
          due: "2025.01.31 18:00:00",
          matchedOrderId: null, // 매칭된 주문(지원)의 _id
          matchedUserId: null, // 매칭된 유저(지원자)의 _id (아직 매칭 안됨)
          pickupLocation: {
            address: "서울특별시 성북구 고려대로 102-2",
            detailAddress: "스타벅스",
            coordinates: {
              latitude: 37.586112415089616, // 위도
              longitude: 127.03076181081309, // 경도
            },
          },
          arrivalLocation: {
            address: "서울특별시 성북구 안암로 145",
            detailAddress: "학생회관 401호",
            coordinates: {
              latitude: 37.58695879642238, // 위도
              longitude: 127.03281146005767, // 경도
            },
          },
        },
      },
      // P14: 매칭 완료, 진행 중 (PS020)
      {
        _id: await nextSeq("product"),
        seller_id: 4,
        price: 50000,

        show: true,
        active: true,
        name: "졸업 스냅사진 찍어주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "졸업 스냅사진 예쁘게 찍어주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC03"],
          tags: ["TA03"],
          productState: ["PS020"], // 진행 중
          due: "2025.01.31 18:00:00",
          matchedOrderId: 14, // 매칭된 주문(지원)의 _id
          matchedUserId: 3, // 매칭된 유저(지원자)의 _id (3번 유저와 매칭됨)
        },
      },
      // P15: 완료 (PS030)
      {
        _id: await nextSeq("product"),
        seller_id: 4,
        price: 50000,

        show: true,
        active: true,
        name: "계약서 검토해주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "중요한 계약을 위한 계약서 같이 검토해주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC02"],
          tags: ["TA03", "TA04"],
          productState: ["PS030"], // 완료
          due: "2025.01.31 18:00:00",
          matchedOrderId: 15, // 매칭된 주문(지원)의 _id
          matchedUserId: 3, // 매칭된 유저(지원자)의 _id (3번 유저와 매칭됨)
          pickupLocation: {},
          arrivalLocation: {
            address: "서울특별시 성북구 고려대로 102-2",
            detailAddress: "스타벅스",
            coordinates: {
              latitude: 37.586112415089616, // 위도
              longitude: 127.03076181081309, // 경도
            },
          },
        },
      },
      // P16: 기간 만료 (PS010 && due 지남)
      {
        _id: await nextSeq("product"),
        seller_id: 4,
        price: 30000,

        show: true,
        active: true,
        name: "거북이 돌봄 해주세요",
        quantity: 999,
        buyQuantity: 0,

        content: "저희 집 거북이 기어 가는 것 좀 봐주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC05"],
          tags: ["TA05", "TA07"],
          productState: ["PS010"],
          due: "2025.01.05 18:00:00",
          matchedOrderId: null, // 매칭된 주문(지원)의 _id
          matchedUserId: null, // 매칭된 유저(지원자)의 _id (아직 매칭 안됨)
          pickupLocation: {},
          arrivalLocation: {
            address: "서울특별시 동대문구 왕산로19가길 34",
            detailAddress: "해오름아파트 101동 101호",
            coordinates: {
              latitude: 37.5798006657316, // 위도
              longitude: 127.03185735283465, // 경도
            },
          },
        },
      },
    ],

    // 주문 (심부름 지원)
    order: [
      // 2번 유저의 지원 (1번 유저의 심부름에 대해)

      // O1: 지원 완료, 매칭 대기 중 (OS010)
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS010", // 지원 완료, 매칭 대기 중
        products: [
          {
            _id: 1,
            seller_id: 1,
            price: 10000,

            show: true,
            active: true,
            name: "신라면 블랙 사다 주세요",
            quantity: 999,
            buyQuantity: 0,

            content: `너무 배가 고픈데 나가기가 귀찮아요
            오는 길에 신라면 블랙 5개짜리 한 묶음만 사다 주세요`,
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC01"],
              tags: ["TA01", "TA02"],
              productState: ["PS010"], // 구인 중
              due: "2025.01.31 18:00:00",
              matchedOrderId: null, // 매칭된 주문(지원)의 _id
              matchedUserId: null, // 매칭된 유저(지원자)의 _id (아직 매칭 안됨)
              pickupLocation: {
                address: "서울 중구 남대문로5길 9",
                detailAddress: "이마트24 한국은행점",
                coordinates: {
                  latitude: 37.5617442432919, // 위도
                  longitude: 126.978862530774, // 경도
                },
              },
              arrivalLocation: {
                address: "서울특별시 중구 퇴계로 72",
                detailAddress: "SK리더스뷰 남산아파트 101동 101호",
                coordinates: {
                  latitude: 37.55915255583279, // 위도
                  longitude: 126.9806124437641, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      // O2: 매칭 완료, 진행 중 (OS020)
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS020", // 매칭 완료, 심부름 진행 중
        products: [
          {
            _id: 2,
            seller_id: 1,
            price: 30000,

            show: true,
            active: true,
            name: "영상 편집 도와주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "앱 시연 영상을 만들어야 하는데 제발 좀 도와주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC03"],
              tags: ["TA03"],
              productState: ["PS020"], // 진행 중
              due: "2025.01.31 18:00:00",
              matchedOrderId: 2, // 매칭된 주문(지원)의 _id (2번 주문과 매칭됨)
              matchedUserId: 2, // 매칭된 유저(지원자)의 _id (2번 유저와 매칭됨)
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      // O3: 완료 (OS030)
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS030", // 심부름 완료
        products: [
          {
            _id: 3,
            seller_id: 1,
            price: 30000,

            show: true,
            active: true,
            name: "창문 샤시 수리해주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "베란다 창문 샤시가 떨어졌어요. 깔끔하게 수리해주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC02"],
              tags: ["TA03", "TA04"],
              productState: ["PS030"], // 완료
              due: "2025.01.31 18:00:00",
              matchedOrderId: 3, // 매칭된 주문(지원)의 _id (3번 주문과 매칭됨)
              matchedUserId: 2, // 매칭된 유저(지원자)의 _id (2번 유저와 매칭됨)
              pickupLocation: {},
              arrivalLocation: {
                address: "서울특별시 마포구 마포대로 195",
                detailAddress: "마포래미안 1동 1호",
                coordinates: {
                  latitude: 37.553491092579186, // 위도
                  longitude: 126.95314745548572, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      // O4: 지원했으나 매칭 안되고 기한 만료 (OS010)
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS010", // 지원 완료, 매칭 대기 중
        products: [
          {
            _id: 4,
            seller_id: 1,
            price: 40000,

            show: true,
            active: true,
            name: "강아지 돌봄 해주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "저희 집 멍멍이 두 시간만 봐주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC05"],
              tags: ["TA05", "TA07"],
              productState: ["PS010"],
              due: "2025.01.05 18:00:00",
              matchedOrderId: null, // 매칭된 주문(지원)의 _id
              matchedUserId: null, // 매칭된 유저(지원자)의 _id
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 1번 유저의 지원 (2번 유저의 심부름에 대해)

      // O5: 지원 완료, 매칭 대기중 (OS010)
      {
        _id: await nextSeq("order"),
        user_id: 1,
        state: "OS010", // 지원 완료, 매칭 대기중
        products: [
          {
            _id: 5,
            seller_id: 2,
            price: 50000,

            show: true,
            active: true,
            name: "티켓팅 대신 해주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "오굿굿 콘서트 꼭 가고 싶은데 티켓팅 대신 해주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC04"],
              tags: ["TA02", "TA04"],
              productState: ["PS010"], // 구인 중
              due: "2025.12.31 20:00:00",
              matchedOrderId: null, // 매칭된 주문(지원)의 _id
              matchedUserId: null, // 매칭된 유저(지원자)의 _id
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // O6: 매칭 완료, 진행 중 (OS020)
      {
        _id: await nextSeq("order"),
        user_id: 1,
        state: "OS020", // 매칭 완료, 진행 중
        products: [
          {
            _id: 6,
            seller_id: 2,
            price: 40000,

            show: true,
            active: true,
            name: "아이 돌봄 해주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "저희 집 꼬맹이 두 시간만 봐주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC05"],
              tags: ["TA06", "TA07"],
              productState: ["PS020"], // 진행 중
              due: "2025.01.31 18:00:00",
              matchedOrderId: 6, // 매칭된 주문(지원)의 _id
              matchedUserId: 1, // 매칭된 유저(지원자)의 _id (1번 유저와 매칭됨)
              pickupLocation: {},
              arrivalLocation: {
                address: "서울특별시 마포구 마포대로 195",
                detailAddress: "마포래미안 1동 1호",
                coordinates: {
                  latitude: 37.553491092579186, // 위도
                  longitude: 126.95314745548572, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 07: 완료 (OS030)
      {
        _id: await nextSeq("order"),
        user_id: 1,
        state: "OS030", // 심부름 완료
        products: [
          {
            _id: 7,
            seller_id: 2,
            price: 40000,

            show: true,
            active: true,
            name: "코딩 도와주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "코딩할게 너무 많아요 좀 도와주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC03"],
              tags: ["TA01", "TA02"],
              productState: ["PS030"], // 완료
              due: "2025.01.31 18:00:00",
              matchedOrderId: 7, // 매칭된 주문(지원)의 _id
              matchedUserId: 1, // 매칭된 유저(지원자)의 _id (1번 유저와 매칭됨)
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 08: 지원했으나 매칭 안되고 기한 만료 (OS010)
      {
        _id: await nextSeq("order"),
        user_id: 1,
        state: "OS010", // 지원 완료, 매칭 대기중
        products: [
          {
            _id: 8,
            seller_id: 2,
            price: 50000,

            show: true,
            active: true,
            name: "강원도 여행 가이드 해주실 분",
            quantity: 999,
            buyQuantity: 0,

            content:
              "이번에 강원도 여행을 가는데요, 가이드해 주실 분을 모십니다. 전문 가이드보다는 현지 주민이시면 좋겠어요.",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC03"],
              tags: ["TA04", "TA07"],
              productState: ["PS010"],
              due: "2025.01.04 18:00:00",
              matchedOrderId: null, // 매칭된 주문(지원)의 _id
              matchedUserId: null, // 매칭된 유저(지원자)의 _id
              pickupLocation: {},
              arrivalLocation: {
                address: "강원 속초시 동해대로 3988",
                detailAddress: "속초역",
                coordinates: {
                  latitude: 38.1905186369686, // 위도
                  longitude: 128.598886861064, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 4번 유저의 지원 (3번 유저의 심부름에 대해)

      // O9: 지원 완료, 매칭 대기중 (OS010)
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS010", // 지원 완료, 매칭 대기중
        products: [
          {
            _id: 9,
            seller_id: 3,
            price: 10000,

            show: true,
            active: true,
            name: "죽과 상비약 부탁",
            quantity: 999,
            buyQuantity: 0,

            content: `죽과 상비약 사다 주세요
            제발요`,
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC01"],
              tags: ["TA01", "TA02"],
              productState: ["PS010"], // 구인 중
              due: "2025.01.31 18:00:00",
              matchedOrderId: null, // 매칭된 주문(지원)의 _id
              matchedUserId: null, // 매칭된 유저(지원자)의 _id
              pickupLocation: {
                address:
                  "서울 중구 통일로 10 (연세대학교세브란스빌딩) 지하 1층",
                detailAddress: "본죽 연세세브란스빌딩점",
                coordinates: {
                  latitude: 37.5570966597, // 위도
                  longitude: 126.973633761228, // 경도
                },
              },
              arrivalLocation: {
                address: "서울특별시 중구 만리재로 175",
                detailAddress: "서울역센트럴 자이아파트 102동 102호",
                coordinates: {
                  latitude: 37.55470201062915, // 위도
                  longitude: 126.96326429421285, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // O10: 매칭 완료, 진행 중 (OS020)
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS020", // 매칭 완료, 진행 중
        products: [
          {
            _id: 10,
            seller_id: 3,
            price: 30000,

            show: true,
            active: true,
            name: "SNS 프로필 사진 찍어주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "프로필 사진 바꾸고 싶은데 가볍게 찍어주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC03"],
              tags: ["TA03"],
              productState: ["PS020"], // 진행 중
              due: "2025.01.31 18:00:00",
              matchedOrderId: 10, // 매칭된 주문(지원)의 _id
              matchedUserId: 4, // 매칭된 유저(지원자)의 _id (4번 유저와 매칭됨)
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 011: 완료 (OS030)
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS030", // 완료
        products: [
          {
            _id: 11,
            seller_id: 3,
            price: 30000,

            show: true,
            active: true,
            name: "문서 작성해주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "전문 문서 작성 도와주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC02"],
              tags: ["TA03", "TA04"],
              productState: ["PS030"], // 완료
              due: "2025.01.31 18:00:00",
              matchedOrderId: 11, // 매칭된 주문(지원)의 _id
              matchedUserId: 4, // 매칭된 유저(지원자)의 _id (4번 유저와 매칭됨)
              pickupLocation: {},
              arrivalLocation: {
                address: "서울특별시 마포구 마포대로 195",
                detailAddress: "마포래미안 2동 2호",
                coordinates: {
                  latitude: 37.553491092579186, // 위도
                  longitude: 126.95314745548572, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 012: 지원했으나 매칭 안되고 기한 만료 (OS010)
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS010", // 지원 완료, 매칭 대기중
        products: [
          {
            _id: 12,
            seller_id: 3,
            price: 20000,

            show: true,
            active: true,
            name: "고양이 돌봄 해주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "저희 집 야옹이 밥이랑 물 좀 챙겨주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC05"],
              tags: ["TA05", "TA07"],
              productState: ["PS010"],
              due: "2025.01.05 18:00:00",
              matchedOrderId: null, // 매칭된 주문(지원)의 _id
              matchedUserId: null, // 매칭된 유저(지원자)의 _id (아직 매칭 안됨)
              pickupLocation: {},
              arrivalLocation: {
                address: "서울 마포구 공덕동 12-116195",
                detailAddress: "공덕헤리지움아파트 3동 3호",
                coordinates: {
                  latitude: 37.54891650614539, // 위도
                  longitude: 126.95989486212639, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 3번 유저의 지원 (4번 유저의 심부름에 대해)

      // O13: 지원 완료, 매칭 대기중 (OS010)
      {
        _id: await nextSeq("order"),
        user_id: 3,
        state: "OS010", // 지원 완료, 매칭 대기중
        products: [
          {
            _id: 13,
            seller_id: 4,
            price: 10000,

            show: true,
            active: true,
            name: "오는 길에 커피 좀 사다 주세요",
            quantity: 999,
            buyQuantity: 0,

            content: `커피를 안마셨더니 나갈 힘이 없어요. 오시는 길에 카페라떼 아이스 큰걸로 하나 사다 주세요`,
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC01"],
              tags: ["TA01", "TA02"],
              productState: ["PS010"], // 구인 중
              due: "2025.01.31 18:00:00",
              matchedOrderId: null, // 매칭된 주문(지원)의 _id
              matchedUserId: null, // 매칭된 유저(지원자)의 _id (아직 매칭 안됨)
              pickupLocation: {
                address: "서울특별시 성북구 고려대로 102-2",
                detailAddress: "스타벅스",
                coordinates: {
                  latitude: 37.586112415089616, // 위도
                  longitude: 127.03076181081309, // 경도
                },
              },
              arrivalLocation: {
                address: "서울특별시 성북구 안암로 145",
                detailAddress: "학생회관 401호",
                coordinates: {
                  latitude: 37.58695879642238, // 위도
                  longitude: 127.03281146005767, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      // O14: 매칭 완료, 진행 중 (OS020)
      {
        _id: await nextSeq("order"),
        user_id: 3,
        state: "OS020", // 매칭 완료, 진행 중
        products: [
          {
            _id: 14,
            seller_id: 4,
            price: 50000,

            show: true,
            active: true,
            name: "졸업 스냅사진 찍어주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "졸업 스냅사진 예쁘게 찍어주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC03"],
              tags: ["TA03"],
              productState: ["PS020"], // 진행 중
              due: "2025.01.31 18:00:00",
              matchedOrderId: 14, // 매칭된 주문(지원)의 _id
              matchedUserId: 3, // 매칭된 유저(지원자)의 _id (3번 유저와 매칭됨)
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 015: 완료 (OS030)
      {
        _id: await nextSeq("order"),
        user_id: 3,
        state: "OS030", // 완료
        products: [
          {
            _id: 15,
            seller_id: 4,
            price: 50000,

            show: true,
            active: true,
            name: "계약서 검토해주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "중요한 계약을 위한 계약서 같이 검토해주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC02"],
              tags: ["TA03", "TA04"],
              productState: ["PS030"], // 완료
              due: "2025.01.31 18:00:00",
              matchedOrderId: 15, // 매칭된 주문(지원)의 _id
              matchedUserId: 3, // 매칭된 유저(지원자)의 _id (3번 유저와 매칭됨)
              pickupLocation: {},
              arrivalLocation: {
                address: "서울특별시 성북구 고려대로 102-2",
                detailAddress: "스타벅스",
                coordinates: {
                  latitude: 37.586112415089616, // 위도
                  longitude: 127.03076181081309, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 016: 지원했으나 매칭 안되고 기한 만료 (OS040)
      {
        _id: await nextSeq("order"),
        user_id: 3,
        state: "OS010", // 지원 완료, 매칭 대기중
        products: [
          {
            _id: 16,
            seller_id: 4,
            price: 30000,

            show: true,
            active: true,
            name: "거북이 돌봄 해주세요",
            quantity: 999,
            buyQuantity: 0,

            content: "저희 집 거북이 기어 가는 것 좀 봐주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC05"],
              tags: ["TA05", "TA07"],
              productState: ["PS010"],
              due: "2025.01.05 18:00:00",
              matchedOrderId: null, // 매칭된 주문(지원)의 _id
              matchedUserId: null, // 매칭된 유저(지원자)의 _id (아직 매칭 안됨)
              pickupLocation: {},
              arrivalLocation: {
                address: "서울특별시 동대문구 왕산로19가길 34",
                detailAddress: "해오름아파트 101동 101호",
                coordinates: {
                  latitude: 37.5798006657316, // 위도
                  longitude: 127.03185735283465, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
    ],

    // 후기
    review: [
      // {
      //   _id: await nextSeq("review"),
      //   user_id: 4,
      //   user: {
      //     _id: 4,
      //     name: "제이지",
      //     image: "user-jayg.webp",
      //   },
      //   order_id: 1,
      //   product_id: 2,
      //   rating: 5,
      //   content: "아이가 좋아해요.",
      //   createdAt: getTime(-4, -60 * 60 * 12),
      // },
      // {
      //   _id: await nextSeq("review"),
      //   user_id: 2,
      //   user: {
      //     _id: 2,
      //     name: "네오",
      //     image: "user-neo.webp",
      //   },
      //   order_id: 4,
      //   product_id: 2,
      //   rating: 4,
      //   content: "배송이 좀 느려요.",
      //   createdAt: getTime(-3, -60 * 60 * 1),
      // },
      // {
      //   _id: await nextSeq("review"),
      //   user_id: 4,
      //   user: {
      //     _id: 4,
      //     name: "제이지",
      //     image: "user-jayg.webp",
      //   },
      //   order_id: 2,
      //   product_id: 3,
      //   rating: 1,
      //   content: "하루만에 고장났어요.",
      //   extra: {
      //     title: "추천하지 않습니다.",
      //   },
      //   createdAt: getTime(-2, -60 * 60 * 10),
      // },
    ],

    // QnA, 공지사항 등의 게시판
    post: [
      {
        _id: await nextSeq("post"),
        type: "qna",
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        title: "크기가 얼만만한가요?",
        content: "아이가 6살인데 가지고 놀기 적당한 크기인가요?",
        replies: [
          {
            _id: 1,
            user_id: 2,
            user: {
              _id: 2,
              name: "네오",
              image: "user-neo.webp",
            },
            content: "크기는 상품 상세정보에 나와 있습니다.",
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: 2,
            user_id: 4,
            user: {
              _id: 4,
              name: "제이지",
              image: "user-jayg.webp",
            },
            content: "어디있나 모르겠어요.",
            like: 7,
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: 3,
            user_id: 2,
            user: {
              _id: 2,
              name: "네오",
              image: "user-neo.webp",
            },
            content: "높이 60cm 입니다.",
            like: 3,
            createdAt: getTime(-2, -60 * 60 * 9),
            updatedAt: getTime(-1, -60 * 60 * 20),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("post"),
        type: "qna",
        product_id: 1,
        seller_id: 2,
        views: 50,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        title: "이번주 토요일까지 받아볼 수 있을까요?",
        content: "토요일 생일 선물로 준비중인데 그때까지 배송 가능할까요?",
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq("post"),
        type: "qna",
        product_id: 4,
        seller_id: 3,
        views: 0,
        user: {
          _id: 2,
          name: "네오",
          image: "user-neo.webp",
        },
        title: "배송 빨리 보내주세요.",
        content: "양품으로 보내주세요.",
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        views: 10,
        user: {
          _id: 1,
          name: "무지",
          image: "user-muzi.webp",
        },
        title: "배송지연 안내",
        content:
          "크리스마스 물류 증가로 인해 평소보다 2~3일 지연될 예정입니다.",
        createdAt: getTime(-4, -60 * 60 * 2),
        updatedAt: getTime(-2, -60 * 60 * 13),
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        views: 15,
        user: {
          _id: 1,
          name: "무지",
          image: "user-muzi.webp",
        },
        title: "배송비 인상 안내",
        content:
          "택배사 배송비 인상으로 인해 기존 3,000원에서 3,500원으로 인상됩니다.",
        createdAt: getTime(-6, -60 * 60 * 20),
        updatedAt: getTime(-4, -60 * 60 * 13),
      },
    ],

    // 코드
    code: [
      // 심부름 카테고리
      {
        _id: "Category",
        title: "심부름 카테고리",
        codes: [
          {
            code: "PC01", // 1번 대분류
            value: "배달",
            depth: 1, // 대메뉴
          },
          {
            code: "PC02", // 2번 대분류
            value: "전문가",
            depth: 1,
          },
          {
            code: "PC03", // 3번 대분류
            value: "재능판매",
            depth: 1,
          },
          {
            code: "PC04", // 4번 대분류
            value: "대행",
            depth: 1,
          },
          {
            code: "PC05", // 5번 대분류
            value: "돌봄",
            depth: 1,
          },
        ],
      },

      // 심부름 태그
      {
        _id: "Tag",
        title: "심부름 태그",
        codes: [
          {
            code: "TA01", // 1번 대분류
            value: "시간이 생명",
            depth: 1, // 대메뉴
          },
          {
            code: "TA02", // 2번 대분류
            value: "도와주세요",
            depth: 1,
          },
          {
            code: "TA03", // 3번 대분류
            value: "일정 조정 가능",
            depth: 1,
          },
          {
            code: "TA04", // 4번 대분류
            value: "금액 협의 가능",
            depth: 1,
          },
          {
            code: "TA05", // 5번 대분류
            value: "남자만",
            depth: 1,
          },
          {
            code: "TA06", // 6번 대분류
            value: "여자만",
            depth: 1,
          },
          {
            code: "TA07", // 7번 대분류
            value: "어른만",
            depth: 1,
          },
        ],
      },

      // 심부름 상태
      {
        _id: "productState",
        title: "심부름 상태",
        codes: [
          {
            sort: 1,
            code: "PS010",
            value: "구인 중",
          },
          {
            sort: 2,
            code: "PS020",
            value: "매칭 완료, 심부름 진행 중",
          },
          {
            sort: 3,
            code: "PS030",
            value: "심부름 완료",
          },
        ],
      },

      // 지원 상태
      {
        _id: "orderState",
        title: "지원 상태",
        codes: [
          {
            sort: 1,
            code: "OS010",
            value: "지원 완료, 매칭 대기 중",
          },
          {
            sort: 2,
            code: "OS020",
            value: "매칭 완료, 심부름 진행 중",
          },
          {
            sort: 3,
            code: "OS030",
            value: "심부름 완료",
          },
          // {
          //   sort: 4,
          //   code: "OS040",
          //   value: "심부름 기간 만료",
          // },
        ],
      },
    ],
    // 설정
    config: [
      {
        _id: "shippingFees",
        title: "배송비",
        value: 3500,
      },
      {
        _id: "freeShippingFees",
        title: "배송비 무료 금액",
        value: 50000,
      },
    ],
  };
};
