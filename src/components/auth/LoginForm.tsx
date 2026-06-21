'use client';
import { Mail, Lock, Eye } from 'lucide-react';
import { Button, Checkbox, Input } from '../ui';
import Link from 'next/link';

export function LoginForm() {
  return (
    <form className="space-y-5">
      <div>
        <h1 className="font-bold text-foreground">Добро пожаловать!</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Войдите в свою учетную запись администратора.
        </p>
      </div>

      {/* Add error */}

      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Введите email"
          autoComplete="email"
          icon={Mail}
        />
        <Input
          type="password"
          placeholder="Введите пароль"
          autoComplete="password"
          icon={Lock}
          rightIcon={Eye}
        />
        <div className="flex items-center justify-between">
          <Checkbox label="Запомни меня" checked={true} />
          <Link
            href="/forgot-password"
            className="font-medium text-primary hover:underline"
          >
            Забыли пароль?
          </Link>
        </div>
      </div>
      <Button type="submit" className="w-full py-2.5">
        Войти
      </Button>
    </form>
  );
}
