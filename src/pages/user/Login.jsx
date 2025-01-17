import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setUser = useUserStore((store) => store.setUser);

  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const axios = useAxiosInstance();
  const login = useMutation({
    mutationFn: (formData) => axios.post(`/users/login`, formData),
    onMutate: () => setLoading(true),
    onSuccess: (res) => {
      const user = res.data.item;
      setUser({
        _id: user._id,
        name: user.name,
        profile: user.image?.path,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
      });
      // 로그인 성공 시 토큰 콘솔 로그 추가
      console.log("Access Token:", user.token.accessToken);
      console.log("Refresh Token:", user.token.refreshToken);

      alert(`${user.name}님, 로그인 되었습니다.`);
      navigate(location.state?.from || `/`);
    },
    onError: (err) => {
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) => setError(error.path, { message: error.msg }));
      } else {
        alert(err.response?.data.message || "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
    onSettled: () => setLoading(false),
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="login w-screen max-w-[393px] h-screen bg-background-color font-laundry">
        <div className="login__content p-6 pt-[172px] flex flex-col items-center justify-center">
          <h1 className="login__title text-[36px] font-bold text-primary-500 leading-normal tracking-[-2.88px] text-center">
            오는길에
          </h1>
          <form className="login__form mt-6 w-full font-normal" onSubmit={handleSubmit(login.mutate)}>
            <div className="login__field mb-3">
              <input
                type="email"
                id="email"
                className="login__input mt-1 block w-full p-3 border text-gray-700 border-gray-300 rounded-[10px] bg-white shadow-card-shadow"
                placeholder="E-mail"
                {...register("email", { required: "이메일은 필수입니다." })}
              />
              <InputError target={errors.email} />
            </div>
            <div className="login__field mb-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="login__input mt-1 block w-full p-3 border text-gray-700 border-gray-300 rounded-[10px] bg-white shadow-card-shadow"
                placeholder="비밀번호"
                {...register("password", {
                  required: "비밀번호는 필수입니다.",
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-[14px] text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img src="/assets/eye-open.png" alt="" className="w-5" />
                ) : (
                  <img src="/assets/eye-close.png" alt="" className="w-5" />
                )}
              </button>
              <InputError target={errors.password} />
            </div>
            <button
              type="submit"
              className={`login__button w-full px-4 py-3 bg-primary-500 text-white rounded-lg transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인하기"}
            </button>
            <p className="pt-[100px] text-center text-gray-700 font-pretendard">간편 로그인</p>
            <button
              type="button"
              className="login__button w-full mt-3 px-4 py-3 bg-kakao text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-200 font-pretendard"
            >
              카카오로 계속하기
            </button>
            <button
              type="button"
              className="login__button w-full mt-3 px-4 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200 font-pretendard"
            >
              APPLE로 계속하기
            </button>
          </form>
          <p className="p-5 text-sm font-pretendard">
            <Link to="/users/signup" className="text-gray-500">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
