import logoUrl from "@/assets/logo.svg"
import { Navigate } from "react-router";
import { LoginForm } from "./LoginForm";
import { useAuthStore } from "../store/auth.store";

export function LoginPage() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-131.75 rounded-[34px] p-1.5 bg-white shadow-[0px_24px_32px_rgba(0,0,0,0.04)]">

        <div className="rounded-[29px] p-px bg-linear-to-b from-[#EDEDED] to-white">

          <div className="w-full h-full bg-white rounded-[28px] px-14.5 pt-7.5 pb-12 bg-[linear-gradient(180deg,rgba(35,35,35,0.03)_0%,rgba(35,35,35,0)_50%)]">
            <div className="flex justify-center mb-3.5">
              <img 
                src={logoUrl} 
                className="w-auto" 
                alt="Логотип" 
              />
            </div>

            <div className="text-center mb-8">
              <svg className="absolute h-0 w-0 invisible" aria-hidden="true">
                <filter id="highlight-sharp" x="-20%" y="-20%" width="140%" height="140%">
                  <feOffset dx="0" dy="-2" />
                  <feGaussianBlur stdDeviation="0" result="offset-blur" />
                  <feComposite operator="out" in="SourceAlpha" in2="offset-blur" result="inverse" />
                  <feFlood floodColor="white" floodOpacity="0.12" result="color" />
                  <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                  <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                </filter>
              </svg>
              <h1
                className="text-[40px] font-semibold text-foreground mb-3"
                style={{ filter: "url(#highlight-sharp)" }}
              >
                Добро пожаловать!
              </h1>

              <svg className="absolute h-0 w-0 invisible" aria-hidden="true">
                <filter id="inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                  <feOffset dx="0" dy="4" result="offset" />
                  <feComposite in="SourceAlpha" in2="offset" operator="out" result="shadow" />
                  <feFlood floodColor="black" floodOpacity="0.17" result="color" />
                  <feComposite in="color" in2="shadow" operator="in" result="inner-shadow" />
                  <feComposite in="inner-shadow" in2="SourceGraphic" operator="over" />
                </filter>
              </svg>
              <p
                className="text-muted text-lg font-medium"
                style={{ filter: "url(#inner-shadow)" }}
              >
                Пожалуйста, авторизируйтесь
              </p>
            </div>

            <LoginForm />
          </div>

        </div>
      </div>
    </div>

  );
}
