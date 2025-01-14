import dayjs from "dayjs";

function getTime(day = 0, second = 0) {
  return dayjs().add(day, "day").add(second, "second").format("YYYY.MM.DD HH:mm:ss");
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      // 1번 회원
      {
        _id: await nextSeq("user"),
        email: "admin@market.com",
        password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "무지",
        phone: "01011112222",
        address: "서울시 강남구 역삼동 123",
        type: "admin",
        loginType: "email",
        image: `/files/${clientId}/user-muzi.webp`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          gender: "male",
          likes: 120,
          introduction: "무지입니당",
          errands: ["편의점 배달"],
          transportation: ["도보", "자전거"],
          details: ["발이 빠릅니다 "],
          experience: ["배달", "배달의 민족", "5개월"],
          certificates: ["오토바이 자격증"],
          business: ["무지 사업자"],
          earnings: 20000,
        },
      },
      // 2번 회원
      {
        _id: await nextSeq("user"),
        email: "s1@market.com",
        password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "네오",
        phone: "01022223333",
        address: "서울시 강남구 삼성동 456",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/user-neo.webp`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          gender: "male",
          likes: 54,
          introduction: "네오입니당",
          errands: ["편의점 배달", "음식 배달", "사진 촬영"],
          transportation: ["도보", "대중교통"],
          details: ["저 사진 잘 찍어요 "],
          experience: ["사진관 알바", "우리동네 사진관", "8개월"],
          certificates: ["네오 자격증"],
          business: ["네오 사업자"],
          earnings: 500000,
        },
      },
      // 3번 회원
      {
        _id: await nextSeq("user"),
        email: "s2@market.com",
        password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "어피치",
        phone: "01033334444",
        address: "서울시 강남구 도곡동 789",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/user-apeach.webp`,
        createdAt: getTime(-40, -60 * 30),
        updatedAt: getTime(-30, -60 * 20),
        extra: {
          gender: "female",
          likes: 200,
          introduction: "어피치입니당",
          errands: ["빨래", "음식 배달", "사진 촬영"],
          transportation: ["자차", "대중교통"],
          details: [],
          experience: [],
          certificates: [],
          business: [],
          earnings: 10000,
        },
      },
      // 4번 회원
      {
        _id: await nextSeq("user"),
        email: "u1@market.com",
        password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "제이지",
        phone: "01044445555",
        address: "서울시 강남구 논현동 222",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/user-jayg.webp`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          gender: "female",
          likes: 9,
          introduction: "제이지입니당",
          errands: ["배달"],
          transportation: ["오토바이"],
          details: ["경력이 없지만 열정은 많습니다. "],
          experience: [],
          certificates: ["제이지 자격증"],
          business: [],
          earnings: 100000,
        },
      },
      // 5번 회원
      {
        _id: await nextSeq("user"),
        email: "n1@market.com",
        password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "아무것도없음",
        phone: "01044447555",
        address: "서울시 강남구 논현동 222",
        type: "seller",
        loginType: "email",
        image: ``,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          gender: "female",
          likes: 9,
          introduction: "ㄴㄴㄴ입니당",
          errands: [],
          transportation: [],
          details: [],
          experience: [],
          certificates: [],
          business: [],
          earnings: 500000,
        },
      },
    ],

    // 상품 (심부름 요청 글)
    product: [
      // 4번 유저가 올린 심부름
      // 4-1: 구인 중 (PS010)
      {
        _id: await nextSeq("product"),
        seller_id: 4,
        price: 15000,

        show: true,
        active: true,
        name: "죽과 상비약 부탁",
        quantity: 1,
        buyQuantity: 0,

        content: `죽과 상비약 사다 주세요
        제발요`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC01"],
          tags: ["TA01", "TA02"],
          productState: ["PS010"], // 구인 중
          due: "2025.01.03 18:00:00",
          pickupLocation: {
            address: "서울 종로구 세종로 186",
            detailAddress: "광화문역",
            coordinates: {
              latitude: 37.57166213080161, // 위도
              longitude: 126.97645483898171, // 경도
            },
          },
          arrivalLocation: {
            address: "서울특별시 중구 한강대로 405",
            detailAddress: "서울역 2층 대합실",
            coordinates: {
              latitude: 37.554613947854044, // 위도
              longitude: 126.97052998585586, // 경도
            },
          },
        },
      },
      // 4-2: 매칭 완료, 진행 중 (PS020)
      {
        _id: await nextSeq("product"),
        seller_id: 4,
        price: 20000,

        show: true,
        active: true,
        name: "SNS 프로필 사진 찍어주세요",
        quantity: 1,
        buyQuantity: 0,

        content: "프로필 사진 바꾸고 싶은데 가볍게 찍어주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC03"],
          tags: ["TA03"],
          productState: ["PS020"], // 진행 중
          due: "2025.01.02 18:00:00",
        },
      },
      // 4-3: 완료 (PS030)
      {
        _id: await nextSeq("product"),
        seller_id: 4,
        price: 30000,

        show: true,
        active: true,
        name: "문서 작성해주세요",
        quantity: 1,
        buyQuantity: 0,

        content: "전문 문서 작성 도와주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC02"],
          tags: ["TA03", "TA04"],
          productState: ["PS030"], // 완료
          due: "2025.01.02 18:00:00",
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
      // 4-4: 기간 만료 (PS040)
      {
        _id: await nextSeq("product"),
        seller_id: 4,
        price: 20000,

        show: true,
        active: true,
        name: "강아지 돌봄 해주세요",
        quantity: 1,
        buyQuantity: 0,

        content: "저희 집 멍멍이 두 시간만 봐주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC05"],
          tags: ["TA05", "TA07"],
          productState: ["PS040"], // 기간 만료
          due: "2025.01.05 18:00:00",
        },
      },

      // 2번 유저가 올린 심부름
      // 2-1: 구인 중 (PS010)
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 20000,

        show: true,
        active: true,
        name: "티켓팅 대신 해주세요",
        quantity: 1,
        buyQuantity: 0,

        content: "오굿굿 콘서트 꼭 가고 싶은데 티켓팅 대신 해주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC04"],
          tags: ["TA02", "TA04"],
          productState: ["PS010"], // 구인 중
          due: "2025.12.31 20:00:00",
        },
      },
      // 2-2: 매칭 완료, 진행 중 (PS020)
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 20000,

        show: true,
        active: true,
        name: "아이 돌봄 해주세요",
        quantity: 1,
        buyQuantity: 0,

        content: "저희 집 꼬맹이 두 시간만 봐주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC05"],
          tags: ["TA06", "TA07"],
          productState: ["PS020"], // 진행 중
          due: "2025.01.25 18:00:00",
        },
      },
      // 2-3: 완료 (PS030)
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 40000,

        show: true,
        active: true,
        name: "강아지 돌봄 해주세요",
        quantity: 1,
        buyQuantity: 0,

        content: "저희 집 멍멍이 두 시간만 봐주세요",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC05"],
          tags: ["TA06", "TA07"],
          productState: ["PS030"], // 완료
          due: "2025.01.04 18:00:00",
        },
      },
      // 2-4: 기간 만료 (PS040)
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 50000,

        show: true,
        active: true,
        name: "강원도 여행 가이드 해주실 분",
        quantity: 1,
        buyQuantity: 0,

        content:
          "이번에 강원도 여행을 가는데요, 가이드해 주실 분을 모십니다. 전문 가이드보다는 현지 주민이시면 좋겠어요.",
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          category: ["PC03"],
          tags: ["TA04", "TA07"],
          productState: ["PS040"], // 기간 만료
          due: "2025.01.04 18:00:00",
        },
      },
    ],

    // 주문 (심부름 지원)
    order: [
      // 2번 유저의 지원 (4번 유저의 심부름에 대해)
      // 2-1: 지원 완료, 매칭 대기 중 (OS010)
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS010", // 지원 완료, 매칭 대기 중
        products: [
          {
            _id: await nextSeq("product"),
            seller_id: 4,
            price: 15000,

            show: true,
            active: true,
            name: "죽과 상비약 부탁",
            quantity: 1,
            buyQuantity: 0,

            content: `죽과 상비약 사다 주세요
            제발요`,
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC01"],
              tags: ["TA01", "TA02"],
              productState: ["PS010"], // 구인 중
              due: "2025.01.03 18:00:00",
              pickupLocation: {
                address: "서울 종로구 세종로 186",
                detailAddress: "광화문역",
                coordinates: {
                  latitude: 37.57166213080161, // 위도
                  longitude: 126.97645483898171, // 경도
                },
              },
              arrivalLocation: {
                address: "서울특별시 중구 한강대로 405",
                detailAddress: "서울역 2층 대합실",
                coordinates: {
                  latitude: 37.554613947854044, // 위도
                  longitude: 126.97052998585586, // 경도
                },
              },
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      // 2-2: 매칭 완료, 진행 중 (OS020)
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS020", // 매칭 완료, 심부름 진행 중
        products: [
          {
            _id: await nextSeq("product"),
            seller_id: 4,
            price: 20000,

            show: true,
            active: true,
            name: "SNS 프로필 사진 찍어주세요",
            quantity: 1,
            buyQuantity: 0,

            content: "프로필 사진 바꾸고 싶은데 가볍게 찍어주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC03"],
              tags: ["TA03"],
              productState: ["PS020"], // 진행 중
              due: "2025.01.02 18:00:00",
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      // 2-3: 완료 (OS030)
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS030", // 심부름 완료
        products: [
          {
            _id: await nextSeq("product"),
            seller_id: 4,
            price: 30000,

            show: true,
            active: true,
            name: "문서 작성해주세요",
            quantity: 1,
            buyQuantity: 0,

            content: "전문 문서 작성 도와주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC02"],
              tags: ["TA03", "TA04"],
              productState: ["PS030"], // 심부름 완료
              due: "2025.01.02 18:00:00",
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
      // 2-4: 기간 만료 (OS040)
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS040", // 기간 만료
        products: [
          {
            _id: await nextSeq("product"),
            seller_id: 4,
            price: 20000,

            show: true,
            active: true,
            name: "강아지 돌봄 해주세요",
            quantity: 1,
            buyQuantity: 0,

            content: "저희 집 멍멍이 두 시간만 봐주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC05"],
              tags: ["TA05", "TA07"],
              productState: ["PS040"], // 기간 만료
              due: "2025.01.05 18:00:00",
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },

      // 4번 유저의 지원 (2번 유저의 심부름에 대해)
      // 4-1: 지원 안료, 매칭 대기 중 (OS010)
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS010", // 지원 완료, 매칭 대기 중
        products: [
          {
            _id: await nextSeq("product"),
            seller_id: 2,
            price: 20000,

            show: true,
            active: true,
            name: "티켓팅 대신 해주세요",
            quantity: 1,
            buyQuantity: 0,

            content: "오굿굿 콘서트 꼭 가고 싶은데 티켓팅 대신 해주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC04"],
              tags: ["TA02", "TA04"],
              productState: ["PS010"], // 구인 중
              due: "2025.12.31 20:00:00",
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      // 4-2: 매칭 완료, 심부름 진행 중 (OS020)
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS020", // 매칭 완료, 심부름 진행 중
        products: [
          {
            _id: await nextSeq("product"),
            seller_id: 2,
            price: 20000,

            show: true,
            active: true,
            name: "아이 돌봄 해주세요",
            quantity: 1,
            buyQuantity: 0,

            content: "저희 집 꼬맹이 두 시간만 봐주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC05"],
              tags: ["TA06", "TA07"],
              productState: ["PS020"], // 진행 중
              due: "2025.01.25 18:00:00",
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      // 4-3: 완료 (OS030)
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS030", // 심부름 완료
        products: [
          {
            _id: await nextSeq("product"),
            seller_id: 2,
            price: 40000,

            show: true,
            active: true,
            name: "강아지 돌봄 해주세요",
            quantity: 1,
            buyQuantity: 0,

            content: "저희 집 멍멍이 두 시간만 봐주세요",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC05"],
              tags: ["TA06", "TA07"],
              productState: ["PS030"], // 완료
              due: "2025.01.04 18:00:00",
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      // 4-4: 기간 만료 (OS040)
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS040", // 기간 만료
        products: [
          {
            _id: await nextSeq("product"),
            seller_id: 2,
            price: 50000,

            show: true,
            active: true,
            name: "강원도 여행 가이드 해주실 분",
            quantity: 1,
            buyQuantity: 0,

            content:
              "이번에 강원도 여행을 가는데요, 가이드해 주실 분을 모십니다. 전문 가이드보다는 현지 주민이시면 좋겠어요.",
            createdAt: getTime(-41, -60 * 60 * 2),
            updatedAt: getTime(-40, -60 * 15),
            extra: {
              category: ["PC03"],
              tags: ["TA04", "TA07"],
              productState: ["PS040"], // 기간 만료
              due: "2025.01.04 18:00:00",
            },
          },
        ],
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
    ],

    // 후기
    review: [
      {
        _id: await nextSeq("review"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        order_id: 1,
        product_id: 2,
        rating: 5,
        content: "아이가 좋아해요.",
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("review"),
        user_id: 2,
        user: {
          _id: 2,
          name: "네오",
          image: "user-neo.webp",
        },
        order_id: 4,
        product_id: 2,
        rating: 4,
        content: "배송이 좀 느려요.",
        createdAt: getTime(-3, -60 * 60 * 1),
      },
      {
        _id: await nextSeq("review"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        order_id: 2,
        product_id: 3,
        rating: 1,
        content: "하루만에 고장났어요.",
        extra: {
          title: "추천하지 않습니다.",
        },
        createdAt: getTime(-2, -60 * 60 * 10),
      },
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
        content: "크리스마스 물류 증가로 인해 평소보다 2~3일 지연될 예정입니다.",
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
        content: "택배사 배송비 인상으로 인해 기존 3,000원에서 3,500원으로 인상됩니다.",
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

      //심부름 태그
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

      // 상품(심부름) 상태
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
          {
            sort: 4,
            code: "PS040",
            value: "심부름 기간 만료",
          },
        ],
      },

      // 주문(지원) 상태
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
          {
            sort: 4,
            code: "OS040",
            value: "심부름 기간 만료",
          },
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
