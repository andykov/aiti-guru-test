import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, User, X } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { useAuthStore } from "../store/auth.store";
import { api } from "@/shared/api/axios";
import type { LoginResponse } from "../types/auth.types";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, rememberMe, setRememberMe } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const usernameValue = watch("username");

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        username: data.username,
        password: data.password,
      });
      login(response.data);
      navigate("/");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        setApiError(
          axiosError.response?.data?.message || "Неверный логин или пароль"
        );
      } else {
        setApiError("Ошибка сети. Попробуйте позже.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="username" className="text-lg">Логин</Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="username"
              placeholder="Введите логин"
              className="pl-12 pr-10 h-13.75"
              {...register("username")}
            />
            {usernameValue && (
              <button
                type="button"
                onClick={() => setValue("username", "")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="text-lg">Пароль</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Введите пароль"
              className="pl-12 pr-10 h-13.75"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <Label htmlFor="remember" className="cursor-pointer">
            Запомнить данные
          </Label>
        </div>
        {apiError && (
          <p className="text-sm text-destructive text-center">{apiError}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-13.5 bg-[#4338CA] hover:bg-[#3730A3] text-white text-base"
        >
          {isSubmitting ? "Вход..." : "Войти"}
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">или</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <p className="text-center text-lg text-muted-foreground">
          Нет аккаунта?{" "}
          <Button variant="link" className="p-0 text-lg underline hover:no-underline">Создать</Button>
        </p>
      </div>
    </form>
  );
}
