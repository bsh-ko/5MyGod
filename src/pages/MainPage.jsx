export default function MainPage() {
  return (
    <div className="l_container max-w-[393px] h-screen mx-auto flex flex-col">
      <main className="bg-background-color flex-grow p-[16px] flex flex-col gap-[16px] overflow-scroll">
        <div className="list_info font-laundry text-[14px] text-gray-700 flex justify-between items-center px-2">
          <p>
            심부름 <span className="text-red-500">6건</span>이 있어요
          </p>

          <div className="flex gap-4">
            <img src="/assets/filter.svg" />
            <img src="/assets/search.svg" />
          </div>
        </div>

        <ul className="list flex flex-col items-center gap-[24px]">
          <li className="list_item w-full h-[116px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[18px] flex gap-[24px] items-center">
            <img
              src="/assets/bike.svg"
              alt="게시글 대표이미지"
              className="flex-shrink-0 w-[40px] h-[40px]"
            />

            <div className="li_contents max-w-full min-w-0 flex flex-col flex-grow gap-[4px]">
              <h2 className="li_title font-laundry text-card-title truncate overflow-hidden text-ellipsis">
                죽과 상비약 부탁
              </h2>

              <ul className="li_tags flex gap-[8px] min-w-0 w-full overflow-scroll">
                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-[#FCFFD8] font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/watch.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  시간이 생명
                </li>

                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-[#FFD8E0] font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/siren.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  <p className="tag_text font-pretendard text-[16px] max-w-full">
                    도와주세요
                  </p>
                </li>
              </ul>
              <div className="li_info flex flex-grow justify-between">
                <div className="font-pretendard text-card-timelimit">
                  1시간 남음
                </div>
                <div className="font-pretendard text-card-price">15,000원</div>
              </div>
            </div>
          </li>

          <li className="list_item w-full h-[116px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[18px] flex gap-[24px] items-center">
            <img
              src="/assets/thumb.svg"
              alt="게시글 대표이미지"
              className="flex-shrink-0 w-[40px] h-[40px]"
            />

            <div className="li_contents max-w-full min-w-0 flex flex-col flex-grow gap-[4px]">
              <h2 className="li_title font-laundry text-card-title truncate overflow-hidden text-ellipsis">
                문서 작성해주세요
              </h2>
              <ul className="li_tags flex gap-[8px] min-w-0 w-full overflow-scroll">
                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-orange-100 font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/calendar.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  일정 조정 가능
                </li>

                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-primary-50 font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/money.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  금액 협의 가능
                </li>
              </ul>
              <div className="li_info flex flex-grow justify-between">
                <div className="font-pretendard text-card-timelimit">
                  3일 남음
                </div>
                <div className="font-pretendard text-card-price">30,000원</div>
              </div>
            </div>
          </li>

          <li className="list_item w-full h-[116px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[18px] flex gap-[24px] items-center">
            <img
              src="/assets/star.svg"
              alt="게시글 대표이미지"
              className="flex-shrink-0 w-[40px] h-[40px]"
            />

            <div className="li_contents max-w-full min-w-0 flex flex-col flex-grow gap-[4px]">
              <h2 className="li_title font-laundry text-card-title truncate overflow-hidden text-ellipsis">
                SNS 프로필 사진 찍어주세요
              </h2>
              <ul className="li_tags flex gap-[8px] min-w-0 w-full overflow-scroll">
                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-orange-100 font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/calendar.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  일정 조정 가능
                </li>
              </ul>
              <div className="li_info flex flex-grow justify-between">
                <div className="font-pretendard text-card-timelimit">
                  7일 남음
                </div>
                <div className="font-pretendard text-card-price">20,000원</div>
              </div>
            </div>
          </li>

          <li className="list_item w-full h-[116px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[18px] flex gap-[24px] items-center">
            <img
              src="/assets/genie.svg"
              alt="게시글 대표이미지"
              className="flex-shrink-0 w-[40px] h-[40px]"
            />

            <div className="li_contents max-w-full min-w-0 flex flex-col flex-grow gap-[4px]">
              <h2 className="li_title font-laundry text-card-title truncate overflow-hidden text-ellipsis">
                티켓팅 대신 해주세요
              </h2>
              <ul className="li_tags flex gap-[8px] min-w-0 w-full overflow-scroll">
                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-primary-50 font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/money.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  금액 협의 가능
                </li>
                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-[#FFD8E0] font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/siren.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  <p className="tag_text font-pretendard text-[16px] max-w-full">
                    도와주세요
                  </p>
                </li>
              </ul>
              <div className="li_info flex flex-grow justify-between">
                <div className="font-pretendard text-card-timelimit">
                  곧 마감
                </div>
                <div className="font-pretendard text-card-price">30,000원</div>
              </div>
            </div>
          </li>

          <li className="list_item w-full h-[116px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[18px] flex gap-[24px] items-center">
            <img
              src="/assets/twohearts.svg"
              alt="게시글 대표이미지"
              className="flex-shrink-0 w-[40px] h-[40px]"
            />

            <div className="li_contents max-w-full min-w-0 flex flex-col flex-grow gap-[4px]">
              <h2 className="li_title font-laundry text-card-title truncate overflow-hidden text-ellipsis">
                아이 돌봄 해주세요
              </h2>
              <ul className="li_tags flex gap-[8px] min-w-0 w-full overflow-scroll">
                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-neutral-100 font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/female.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  여자만
                </li>

                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-neutral-100 font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/adult.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  <p className="tag_text font-pretendard text-[16px] max-w-full">
                    어른만
                  </p>
                </li>
              </ul>
              <div className="li_info flex flex-grow justify-between">
                <div className="font-pretendard text-card-timelimit">
                  1일 남음
                </div>
                <div className="font-pretendard text-card-price">50,000원</div>
              </div>
            </div>
          </li>

          <li className="list_item w-full h-[116px] rounded-[10px] bg-[#fff] shadow-card-shadow px-[22px] py-[18px] flex gap-[24px] items-center">
            <img
              src="/assets/twohearts.svg"
              alt="게시글 대표이미지"
              className="flex-shrink-0 w-[40px] h-[40px]"
            />

            <div className="li_contents max-w-full min-w-0 flex flex-col flex-grow gap-[4px]">
              <h2 className="li_title font-laundry text-card-title truncate overflow-hidden text-ellipsis">
                강아지 돌봄 해주세요
              </h2>
              <ul className="li_tags flex gap-[8px] min-w-0 w-full overflow-scroll">
                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-neutral-100 font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/male.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  남자만
                </li>

                <li className="tag flex items-center gap-[4px] px-[6px] rounded bg-neutral-100 font-pretendard text-[16px] max-w-full truncate text-ellipsis min-w-0 flex-shrink-0">
                  <img
                    src="/assets/adult.svg"
                    alt="태그 이미지"
                    className="tag_image w-[18px] h-[18px]"
                  />
                  <p className="tag_text font-pretendard text-[16px] max-w-full">
                    어른만
                  </p>
                </li>
              </ul>
              <div className="li_info flex flex-grow justify-between">
                <div className="font-pretendard text-card-timelimit">
                  7일 남음
                </div>
                <div className="font-pretendard text-card-price">50,000원</div>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
}
