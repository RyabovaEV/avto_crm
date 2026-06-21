import { ChevronRight, Mail } from "lucide-react";
import { Button, Input } from "../ui";
import Link from "next/link";

export function ForgotPasswordForm() {
  return (
    <>
      <Link
        href="/login"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronRight size={14} className="rotate-180" /> Вернуться к
        авторизации
      </Link>
      <div className="flex items-center gap-2">
      </div>
      <form className="space-y-5">
        <div>
          <h1 className="font-bold text-foreground">Забыли пароль?</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Введите email указанный при регистрации
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Введите email"
            autoComplete="email"
            icon={Mail}
          />
        </div>
        <Button type="submit" className="w-full py-2.5">
          Отправить код подтверждения
        </Button>
      </form>
    </>
  );
}
